namespace RealEstateApi.Application.DTOs.Request;

public class CreatePropertyRequest
{
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string idImage { get; set; } = string.Empty;
}

