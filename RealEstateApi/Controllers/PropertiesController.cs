using Microsoft.AspNetCore.Mvc;
using RealEstateApi.Application.DTOs.Request;
using RealEstateApi.Application.Interfaces;

namespace RealEstateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    private readonly IPropertyService _propertyService;

    public PropertiesController(IPropertyService propertyService)
    {
        _propertyService = propertyService;
    }

    // GET: /api/properties
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var properties = await _propertyService.GetAllAsync();
        return Ok(properties);
    }

    // GET: /api/properties/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var property = await _propertyService.GetByIdAsync(id);
        
        if (property == null)
            return NotFound(new { message = $"Property with id {id} not found" });
        
        return Ok(property);
    }

    // GET: /api/properties/search?name=casa&address=bogota&priceMin=100000&priceMax=500000
    [HttpGet("search")]
    public async Task<IActionResult> Search(
        [FromQuery] string? name,
        [FromQuery] string? address,
        [FromQuery] decimal? priceMin,
        [FromQuery] decimal? priceMax)
    {
        var properties = await _propertyService.GetByFiltersAsync(name, address, priceMin, priceMax);
        return Ok(properties);
    }

    // POST: /api/properties
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePropertyRequest request)
    {
        try
        {
            var property = await _propertyService.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = property.IdProperty }, property);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = "Error creating property", error = ex.Message });
        }
    }

    // PUT: /api/properties/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] CreatePropertyRequest request)
    {
        var updated = await _propertyService.UpdateAsync(id, request);
        
        if (!updated)
            return NotFound(new { message = $"Property with id {id} not found" });
        
        return NoContent();
    }

    // DELETE: /api/properties/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var deleted = await _propertyService.DeleteAsync(id);
        
        if (!deleted)
            return NotFound(new { message = $"Property with id {id} not found" });
        
        return NoContent();
    }
}