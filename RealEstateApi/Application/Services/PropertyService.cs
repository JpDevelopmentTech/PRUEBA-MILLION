using RealEstateApi.Application.DTOs.Request;
using RealEstateApi.Application.DTOs.Response;
using RealEstateApi.Application.Interfaces;
using RealEstateApi.Domain.Entities;
using RealEstateApi.Domain.Interfaces;

namespace RealEstateApi.Application.Services;

public class PropertyService : IPropertyService
{
    private readonly IPropertyRepository _propertyRepository;

    public PropertyService(IPropertyRepository propertyRepository)
    {
        _propertyRepository = propertyRepository;
    }

    public async Task<IEnumerable<PropertyResponse>> GetAllAsync()
    {
        var properties = await _propertyRepository.GetAllAsync();
        return properties.Select(MapToResponse);
    }

    public async Task<PropertyResponse?> GetByIdAsync(string id)
    {
        var property = await _propertyRepository.GetByIdAsync(id);
        return property != null ? MapToResponse(property) : null;
    }

    public async Task<IEnumerable<PropertyResponse>> GetByFiltersAsync(
        string? name, 
        string? address, 
        decimal? priceMin, 
        decimal? priceMax)
    {
        var properties = await _propertyRepository.GetByFiltersAsync(name, address, priceMin, priceMax);
        return properties.Select(MapToResponse);
    }

    public async Task<PropertyResponse> CreateAsync(CreatePropertyRequest request)
    {
        var property = new Property
        {
            Name = request.Name,
            Address = request.Address,
            Price = request.Price,
            CodeInternal = request.CodeInternal,
            Year = request.Year,
            IdOwner = request.IdOwner
        };

        var createdProperty = await _propertyRepository.CreateAsync(property);
        return MapToResponse(createdProperty);
    }

    public async Task<bool> UpdateAsync(string id, CreatePropertyRequest request)
    {
        var property = new Property
        {
            IdProperty = id,
            Name = request.Name,
            Address = request.Address,
            Price = request.Price,
            CodeInternal = request.CodeInternal,
            Year = request.Year,
            IdOwner = request.IdOwner
        };

        return await _propertyRepository.UpdateAsync(id, property);
    }

    public async Task<bool> DeleteAsync(string id)
    {
        return await _propertyRepository.DeleteAsync(id);
    }

    // Mapper: Entity -> Response DTO
    private static PropertyResponse MapToResponse(Property property)
    {
        return new PropertyResponse
        {
            IdProperty = property.IdProperty,
            Name = property.Name,
            Address = property.Address,
            Price = property.Price,
            CodeInternal = property.CodeInternal,
            Year = property.Year,
            IdOwner = property.IdOwner
        };
    }
}

