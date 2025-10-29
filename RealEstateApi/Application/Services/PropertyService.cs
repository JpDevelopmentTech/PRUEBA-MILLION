using RealEstateApi.Application.DTOs.Request;
using RealEstateApi.Application.DTOs.Response;
using RealEstateApi.Application.Interfaces;
using RealEstateApi.Domain.Entities;
using RealEstateApi.Domain.Interfaces;
using MongoDB.Bson;

namespace RealEstateApi.Application.Services;

public class PropertyService : IPropertyService
{
    private readonly IPropertyRepository _propertyRepository;

    public PropertyService(IPropertyRepository propertyRepository)
    {
        _propertyRepository = propertyRepository;
    }

  

    public async Task<PropertyResponse?> GetByIdAsync(string id)
    {
        var property = await _propertyRepository.GetByIdAsync(id);
        return property != null ? MapToResponse(property) : null;
    }

    public async Task<PropertyDetailResponse?> GetByIdWithDetailsAsync(string id)
    {
        var bsonDocument = await _propertyRepository.GetByIdWithDetailsAsync(id);
        
        if (bsonDocument == null) return null;

        return new PropertyDetailResponse
        {
            Id = bsonDocument["_id"].AsObjectId.ToString(),
            Name = bsonDocument.GetValue("name", "").AsString,
            Address = bsonDocument.GetValue("address", "").AsString,
            Price = bsonDocument.GetValue("price", 0).ToDecimal(),
            CodeInternal = bsonDocument.GetValue("codeInternal", "").AsString,
            Year = bsonDocument.GetValue("year", 0).AsInt32,

            Owner = bsonDocument.Contains("owner") && bsonDocument["owner"].IsBsonDocument
                ? new OwnerResponse
                {
                    IdOwner = bsonDocument["owner"]["_id"].AsObjectId.ToString(),
                    Name = bsonDocument["owner"].AsBsonDocument.GetValue("name", "").AsString,
                    Address = bsonDocument["owner"].AsBsonDocument.GetValue("address", "").AsString,
                    Photo = bsonDocument["owner"].AsBsonDocument.GetValue("photo", "").AsString,
                    Birthday = GetDateTimeValue(bsonDocument["owner"].AsBsonDocument, "birthday")
                }
                : null,
            

            Images = bsonDocument.Contains("images") && bsonDocument["images"].IsBsonArray
                ? bsonDocument["images"].AsBsonArray
                    .Where(img => img.IsBsonDocument)
                    .Select(img => new PropertyImageResponse
                    {
                        IdPropertyImage = img["_id"].AsObjectId.ToString(),
                        IdProperty = img.AsBsonDocument.GetValue("idProperty", "").AsObjectId.ToString(),
                        File = img.AsBsonDocument.GetValue("file", "").AsString,
                        Enabled = img.AsBsonDocument.GetValue("enabled", true).AsBoolean
                    }).ToList()
                : new List<PropertyImageResponse>(),
            

            Traces = bsonDocument.Contains("traces") && bsonDocument["traces"].IsBsonArray
                ? bsonDocument["traces"].AsBsonArray
                    .Where(trace => trace.IsBsonDocument)
                    .Select(trace => new PropertyTraceResponse
                    {
                        IdPropertyTrace = trace["_id"].AsObjectId.ToString(),
                        DateSale = GetDateTimeValue(trace.AsBsonDocument, "datesale"),
                        Name = trace.AsBsonDocument.GetValue("name", "").AsString,
                        Value = trace.AsBsonDocument.GetValue("value", 0).ToDecimal(),
                        Tax = trace.AsBsonDocument.GetValue("tax", 0).ToDecimal(),
                        IdProperty = trace.AsBsonDocument.GetValue("idProperty", "").AsObjectId.ToString()
                    }).ToList()
                : new List<PropertyTraceResponse>()
        };
    }

    private static DateTime GetDateTimeValue(BsonDocument document, string fieldName)
    {
        if (!document.Contains(fieldName))
            return DateTime.MinValue;

        var value = document[fieldName];
        
        if (value.IsBsonDateTime)
            return value.ToUniversalTime();
        
        if (value.IsString)
        {
            if (DateTime.TryParse(value.AsString, out var parsedDate))
                return parsedDate.ToUniversalTime();
        }
        
        return DateTime.MinValue;
    }

    public async Task<IEnumerable<PropertyResponse>> GetByFiltersAsync(
        string? name, 
        string? address, 
        decimal? priceMin, 
        decimal? priceMax)
    {
        var propertiesBson = await _propertyRepository.GetPropertiesWithImagesAsync(name, address, priceMin, priceMax);
        
        return propertiesBson.Select(bsonDoc => new PropertyResponse
        {
            id = bsonDoc["_id"].AsObjectId.ToString(),
            Name = bsonDoc.GetValue("name", "").AsString,
            Address = bsonDoc.GetValue("address", "").AsString,
            Price = bsonDoc.GetValue("price", 0).ToDecimal(),
            CodeInternal = bsonDoc.GetValue("codeInternal", "").AsString,
            Year = bsonDoc.GetValue("year", 0).AsInt32,
            IdOwner = bsonDoc.GetValue("idOwner", "").AsObjectId.ToString(),
            // Mapear imágenes: solo URLs de las imágenes habilitadas
            Images = bsonDoc.Contains("images") && bsonDoc["images"].IsBsonArray
                ? bsonDoc["images"].AsBsonArray
                    .Where(img => img.IsBsonDocument)
                    .Select(img => img.AsBsonDocument.GetValue("file", "").AsString)
                    .Where(url => !string.IsNullOrEmpty(url))
                    .ToList()
                : new List<string>()
        });
    }

    public async Task<PropertyResponse> CreateAsync(CreatePropertyRequest request)
    {
        var property = new Property
        {
            Name = request.Name,
            Address = request.Address,
            Price = request.Price,
            idImage = request.idImage
        };

        var createdProperty = await _propertyRepository.CreateAsync(property);
        return MapToResponse(createdProperty);
    }

    private static PropertyResponse MapToResponse(Property property)
    {
        return new PropertyResponse
        {
            id = property.id,
            Name = property.Name,
            Address = property.Address,
            Price = property.Price,
            CodeInternal = property.CodeInternal,
            Year = property.Year,
            IdOwner = property.IdOwner
        };
    }
}

