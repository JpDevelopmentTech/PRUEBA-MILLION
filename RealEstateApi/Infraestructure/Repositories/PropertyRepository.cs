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

    public async Task<BsonDocument?> GetByIdWithDetailsAsync(string id)
    {
        var pipeline = new BsonDocument[]
        {
       
            new BsonDocument("$match", new BsonDocument("_id", new ObjectId(id))),
            
   
            new BsonDocument("$lookup", new BsonDocument
            {
                { "from", "Owner" },
                { "localField", "idOwner" },
                { "foreignField", "_id" },
                { "as", "owner" }
            }),
            

            new BsonDocument("$unwind", new BsonDocument
            {
                { "path", "$owner" },
                { "preserveNullAndEmptyArrays", true }
            }),
            

            new BsonDocument("$lookup", new BsonDocument
            {
                { "from", "PropertyImage" },
                { "localField", "_id" },
                { "foreignField", "idProperty" },
                { "as", "images" }
            }),
            

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

    public async Task<IEnumerable<BsonDocument>> GetPropertiesWithImagesAsync(
        string? name, 
        string? address, 
        decimal? priceMin, 
        decimal? priceMax)
    {
        var filters = new List<BsonDocument>();

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
            
            new BsonDocument("$lookup", new BsonDocument
            {
                { "from", "PropertyImage" },
                { "localField", "_id" },
                { "foreignField", "idProperty" },
                { "as", "images" }
            }),
            
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

