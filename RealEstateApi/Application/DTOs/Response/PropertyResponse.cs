namespace RealEstateApi.Application.DTOs.Response;

public class PropertyResponse
{
    public string IdProperty { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string CodeInternal { get; set; } = string.Empty;
    public int Year { get; set; }
    public string IdOwner { get; set; } = string.Empty;
}

