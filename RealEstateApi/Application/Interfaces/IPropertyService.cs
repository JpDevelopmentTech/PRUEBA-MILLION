using RealEstateApi.Application.DTOs.Request;
using RealEstateApi.Application.DTOs.Response;

namespace RealEstateApi.Application.Interfaces;

public interface IPropertyService
{
    Task<PropertyResponse?> GetByIdAsync(string id);
    Task<PropertyDetailResponse?> GetByIdWithDetailsAsync(string id);
    Task<IEnumerable<PropertyResponse>> GetByFiltersAsync(string? name, string? address, decimal? priceMin, decimal? priceMax);
    Task<PropertyResponse> CreateAsync(CreatePropertyRequest request);
 
}

