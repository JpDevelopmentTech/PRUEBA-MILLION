using RealEstateApi.Domain.Entities;

namespace RealEstateApi.Domain.Interfaces;

public interface IPropertyRepository
{
    Task<IEnumerable<Property>> GetAllAsync();
    Task<Property?> GetByIdAsync(string id);
    Task<IEnumerable<Property>> GetByFiltersAsync(string? name, string? address, decimal? priceMin, decimal? priceMax);
    Task<Property> CreateAsync(Property property);
    Task<bool> UpdateAsync(string id, Property property);
    Task<bool> DeleteAsync(string id);
}

