using MongoDB.Driver;
using RealEstateApi.Domain.Entities;
using RealEstateApi.Domain.Interfaces;
using RealEstateApi.Infraestructure.Persistence;

namespace RealEstateApi.Infraestructure.Repositories;

public class PropertyRepository : IPropertyRepository
{
    private readonly IMongoCollection<Property> _properties;

    public PropertyRepository(MongoDbContext context)
    {
        _properties = context.GetCollection<Property>("Properties");
    }

    public async Task<IEnumerable<Property>> GetAllAsync()
    {
        return await _properties.Find(_ => true).ToListAsync();
    }

    public async Task<Property?> GetByIdAsync(string id)
    {
        return await _properties.Find(p => p.IdProperty == id).FirstOrDefaultAsync();
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

    public async Task<bool> UpdateAsync(string id, Property property)
    {
        var result = await _properties.ReplaceOneAsync(
            p => p.IdProperty == id, 
            property);
        
        return result.ModifiedCount > 0;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var result = await _properties.DeleteOneAsync(p => p.IdProperty == id);
        return result.DeletedCount > 0;
    }
}

