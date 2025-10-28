using RealEstateApi.Domain.Entities;

namespace RealEstateApi.Application.DTOs.Response;

public class PropertyDetailResponse
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string CodeInternal { get; set; } = string.Empty;
    public int Year { get; set; }
    
    // Datos relacionados (populate)
    public OwnerResponse? Owner { get; set; }
    public List<PropertyImageResponse> Images { get; set; } = new();
    public List<PropertyTraceResponse> Traces { get; set; } = new();
}

public class OwnerResponse
{
    public string IdOwner { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Photo { get; set; } = string.Empty;
    public DateTime Birthday { get; set; }
}

public class PropertyImageResponse
{
    public string IdPropertyImage { get; set; } = string.Empty;
    public string IdProperty { get; set; } = string.Empty;
    public string File { get; set; } = string.Empty;
    public bool Enabled { get; set; }
}

public class PropertyTraceResponse
{
    public string IdPropertyTrace { get; set; } = string.Empty;
    public DateTime DateSale { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public decimal Tax { get; set; }
    public string IdProperty { get; set; } = string.Empty;
}

