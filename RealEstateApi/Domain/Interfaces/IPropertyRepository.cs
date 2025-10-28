using MongoDB.Bson;
using RealEstateApi.Domain.Entities;

namespace RealEstateApi.Domain.Interfaces;

public interface IPropertyRepository
{
    Task<Property?> GetByIdAsync(string id);
    Task<BsonDocument?> GetByIdWithDetailsAsync(string id);
    Task<IEnumerable<Property>> GetByFiltersAsync(string? name, string? address, decimal? priceMin, decimal? priceMax);
    Task<IEnumerable<BsonDocument>> GetPropertiesWithImagesAsync(string? name, string? address, decimal? priceMin, decimal? priceMax);
    Task<Property> CreateAsync(Property property);
}

