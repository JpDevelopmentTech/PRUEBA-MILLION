using MongoDB.Driver;
using MongoDB.Bson;
using RealEstateApi.Domain.Entities;
using RealEstateApi.Domain.Interfaces;
using RealEstateApi.Infraestructure.Persistence;
using MongoDB.Bson.Serialization;

namespace RealEstateApi.Infraestructure.Repositories;

public class PropertyRepository : IPropertyRepository
{
    private readonly IMongoCollection<Property> _properties;
    private readonly IMongoCollection<PropertyImage> _propertyImage;
    private readonly IMongoCollection<Owner> _owner;
    private readonly IMongoCollection<PropertyTrace> _propertyTrace; 

    public PropertyRepository(MongoDbContext context)
    {
        _properties = context.GetCollection<Property>("Properties");
        _propertyImage = context.GetCollection<PropertyImage>("PropertyImage");
        _owner = context.GetCollection<Owner>("Owner");
        _propertyTrace = context.GetCollection<PropertyTrace>("PropertyTrace");
    }

    public async Task<Property?> GetByIdAsync(string id)
    {
        return await _properties.Find(p => p.id == id).FirstOrDefaultAsync();
    }

    // Método para obtener propiedad con datos relacionados (populate)
    public async Task<BsonDocument?> GetByIdWithDetailsAsync(string id)
    {
        var pipeline = new BsonDocument[]
        {
            // Stage 1: Match - Filtrar la propiedad por id
            new BsonDocument("$match", new BsonDocument("_id", new ObjectId(id))),
            
            // Stage 2: Lookup - Join con la colección de Owners
            new BsonDocument("$lookup", new BsonDocument
            {
                { "from", "Owner" },
                { "localField", "idOwner" },
                { "foreignField", "_id" },
                { "as", "owner" }
            }),
            
            // Stage 3: Unwind - Convertir el array owner en un objeto
            new BsonDocument("$unwind", new BsonDocument
            {
                { "path", "$owner" },
                { "preserveNullAndEmptyArrays", true }
            }),
            
            // Stage 4: Lookup - Join con PropertyImages
            new BsonDocument("$lookup", new BsonDocument
            {
                { "from", "PropertyImage" },
                { "localField", "_id" },
                { "foreignField", "idProperty" },
                { "as", "images" }
            }),
            
            // Stage 5: Lookup - Join con PropertyTraces
            new BsonDocument("$lookup", new BsonDocument
            {
                { "from", "PropertyTrace" },
                { "localField", "_id" },
                { "foreignField", "idProperty" },
                { "as", "traces" }
            })
        };

        return await _properties.Aggregate<BsonDocument>(pipeline).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Property>> GetByFiltersAsync(
        string? name, 
        string? address, 
        decimal? priceMin, 
        decimal? priceMax)
    {
        var filterBuilder = Builders<Property>.Filter;
        var filters = new List<FilterDefinition<Property>>();

        if (!string.IsNullOrWhiteSpace(name))
        {
            filters.Add(filterBuilder.Regex(p => p.Name, new MongoDB.Bson.BsonRegularExpression(name, "i")));
        }

        if (!string.IsNullOrWhiteSpace(address))
        {
            filters.Add(filterBuilder.Regex(p => p.Address, new MongoDB.Bson.BsonRegularExpression(address, "i")));
        }

        if (priceMin.HasValue)
        {
            filters.Add(filterBuilder.Gte(p => p.Price, priceMin.Value));
        }

        if (priceMax.HasValue)
        {
            filters.Add(filterBuilder.Lte(p => p.Price, priceMax.Value));
        }

        var combinedFilter = filters.Count > 0 
            ? filterBuilder.And(filters) 
            : filterBuilder.Empty;

        return await _properties.Find(combinedFilter).ToListAsync();
    }

    public async Task<Property> CreateAsync(Property property)
    {
        await _properties.InsertOneAsync(property);
        return property;
    }

    // Método para obtener propiedades con imágenes usando populate
    public async Task<IEnumerable<BsonDocument>> GetPropertiesWithImagesAsync(
        string? name, 
        string? address, 
        decimal? priceMin, 
        decimal? priceMax)
    {
        var filters = new List<BsonDocument>();

        // Agregar filtros
        if (!string.IsNullOrWhiteSpace(name))
        {
            filters.Add(new BsonDocument("name", new BsonRegularExpression(name, "i")));
        }

        if (!string.IsNullOrWhiteSpace(address))
        {
            filters.Add(new BsonDocument("address", new BsonRegularExpression(address, "i")));
        }

        if (priceMin.HasValue)
        {
            filters.Add(new BsonDocument("price", new BsonDocument("$gte", priceMin.Value)));
        }

        if (priceMax.HasValue)
        {
            filters.Add(new BsonDocument("price", new BsonDocument("$lte", priceMax.Value)));
        }

        var matchFilter = filters.Count > 0 
            ? new BsonDocument("$match", new BsonDocument("$and", new BsonArray(filters)))
            : new BsonDocument("$match", new BsonDocument());

        var pipeline = new List<BsonDocument>
        {
            matchFilter,
            
            // Lookup - Join con PropertyImages para traer las imágenes
            new BsonDocument("$lookup", new BsonDocument
            {
                { "from", "PropertyImage" },
                { "localField", "_id" },
                { "foreignField", "idProperty" },
                { "as", "images" }
            }),
            
            // Proyectar solo lo necesario
            new BsonDocument("$project", new BsonDocument
            {
                { "_id", 1 },
                { "name", 1 },
                { "address", 1 },
                { "price", 1 },
                { "codeInternal", 1 },
                { "year", 1 },
                { "idOwner", 1 },
                { "images", new BsonDocument
                    {
                        { "$filter", new BsonDocument
                            {
                                { "input", "$images" },
                                { "as", "image" },
                                { "cond", new BsonDocument("$eq", new BsonArray { "$$image.enabled", true }) }
                            }
                        }
                    }
                }
            })
        };

        return await _properties.Aggregate<BsonDocument>(pipeline).ToListAsync();
    }

   
}

