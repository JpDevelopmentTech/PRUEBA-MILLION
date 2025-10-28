using NUnit.Framework;
using Moq;
using Microsoft.AspNetCore.Mvc;
using RealEstateApi.Controllers;
using RealEstateApi.Application.Interfaces;
using RealEstateApi.Application.DTOs.Request;
using RealEstateApi.Application.DTOs.Response;

namespace RealEstateApi.Tests.Controllers;

[TestFixture]
public class PropertiesControllerTests
{
    private Mock<IPropertyService> _mockService;
    private PropertiesController _controller;

    [SetUp]
    public void Setup()
    {
        _mockService = new Mock<IPropertyService>();
        _controller = new PropertiesController(_mockService.Object);
    }

    #region GetById Tests

    [Test]
    public async Task GetById_WhenPropertyExists_ReturnsOkResult()
    {
        // Arrange
        var propertyId = "507f1f77bcf86cd799439011";
        var propertyResponse = new PropertyResponse
        {
            id = propertyId,
            Name = "Casa Test",
            Address = "Calle 123",
            Price = 200000,
            CodeInternal = "COD001",
            Year = 2020,
            IdOwner = "507f1f77bcf86cd799439012"
        };

        _mockService.Setup(x => x.GetByIdAsync(propertyId))
            .ReturnsAsync(propertyResponse);

        // Act
        var result = await _controller.GetById(propertyId);

        // Assert
        Assert.That(result, Is.InstanceOf<OkObjectResult>());
        var okResult = result as OkObjectResult;
        Assert.That(okResult?.Value, Is.InstanceOf<PropertyResponse>());
        
        var returnedProperty = okResult?.Value as PropertyResponse;
        Assert.That(returnedProperty?.id, Is.EqualTo(propertyId));
    }

    [Test]
    public async Task GetById_WhenPropertyDoesNotExist_ReturnsNotFound()
    {
        // Arrange
        var propertyId = "507f1f77bcf86cd799439011";
        _mockService.Setup(x => x.GetByIdAsync(propertyId))
            .ReturnsAsync((PropertyResponse?)null);

        // Act
        var result = await _controller.GetById(propertyId);

        // Assert
        Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
    }

    #endregion

    #region GetByIdWithDetails Tests

    [Test]
    public async Task GetByIdWithDetails_WhenPropertyExists_ReturnsOkResult()
    {
        // Arrange
        var propertyId = "507f1f77bcf86cd799439011";
        var propertyDetailResponse = new PropertyDetailResponse
        {
            Id = propertyId,
            Name = "Casa Test",
            Address = "Calle 123",
            Price = 200000,
            CodeInternal = "COD001",
            Year = 2020
        };

        _mockService.Setup(x => x.GetByIdWithDetailsAsync(propertyId))
            .ReturnsAsync(propertyDetailResponse);

        // Act
        var result = await _controller.GetByIdWithDetails(propertyId);

        // Assert
        Assert.That(result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task GetByIdWithDetails_WhenPropertyDoesNotExist_ReturnsNotFound()
    {
        // Arrange
        var propertyId = "507f1f77bcf86cd799439011";
        _mockService.Setup(x => x.GetByIdWithDetailsAsync(propertyId))
            .ReturnsAsync((PropertyDetailResponse?)null);

        // Act
        var result = await _controller.GetByIdWithDetails(propertyId);

        // Assert
        Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
    }

    #endregion

    #region Search Tests

    [Test]
    public async Task Search_WhenNoFilters_ReturnsOkWithAllProperties()
    {
        // Arrange
        var properties = new List<PropertyResponse>
        {
            new PropertyResponse { id = "1", Name = "Casa 1", Address = "Bogota", Price = 200000 },
            new PropertyResponse { id = "2", Name = "Casa 2", Address = "Medellin", Price = 150000 }
        };

        _mockService.Setup(x => x.GetByFiltersAsync(null, null, null, null))
            .ReturnsAsync(properties);

        // Act
        var result = await _controller.Search(null, null, null, null);

        // Assert
        Assert.That(result, Is.InstanceOf<OkObjectResult>());
        var okResult = result as OkObjectResult;
        Assert.That(okResult?.Value, Is.InstanceOf<IEnumerable<PropertyResponse>>());
    }

    [Test]
    public async Task Search_WithNameFilter_ReturnsFilteredProperties()
    {
        // Arrange
        var properties = new List<PropertyResponse>
        {
            new PropertyResponse { id = "1", Name = "Casa Test", Address = "Bogota", Price = 200000 }
        };

        _mockService.Setup(x => x.GetByFiltersAsync("Casa Test", null, null, null))
            .ReturnsAsync(properties);

        // Act
        var result = await _controller.Search("Casa Test", null, null, null);

        // Assert
        Assert.That(result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task Search_WithPriceRange_ReturnsFilteredProperties()
    {
        // Arrange
        var properties = new List<PropertyResponse>
        {
            new PropertyResponse { id = "1", Name = "Casa Test", Address = "Bogota", Price = 250000 }
        };

        _mockService.Setup(x => x.GetByFiltersAsync(null, null, 200000, 300000))
            .ReturnsAsync(properties);

        // Act
        var result = await _controller.Search(null, null, 200000, 300000);

        // Assert
        Assert.That(result, Is.InstanceOf<OkObjectResult>());
    }

    #endregion

    #region Create Tests

    [Test]
    public async Task Create_WhenValidRequest_ReturnsCreatedAtAction()
    {
        // Arrange
        var request = new CreatePropertyRequest
        {
            Name = "Nueva Casa",
            Address = "Avenida Principal 456",
            Price = 300000,
            idImage = "507f1f77bcf86cd799439013"
        };

        var createdProperty = new PropertyResponse
        {
            id = "507f1f77bcf86cd799439014",
            Name = request.Name,
            Address = request.Address,
            Price = request.Price
        };

        _mockService.Setup(x => x.CreateAsync(request))
            .ReturnsAsync(createdProperty);

        // Act
        var result = await _controller.Create(request);

        // Assert
        Assert.That(result, Is.InstanceOf<CreatedAtActionResult>());
        var createdAtResult = result as CreatedAtActionResult;
        Assert.That(createdAtResult?.Value, Is.InstanceOf<PropertyResponse>());
    }

    [Test]
    public async Task Create_WhenServiceThrowsException_ReturnsBadRequest()
    {
        // Arrange
        var request = new CreatePropertyRequest
        {
            Name = "Nueva Casa",
            Address = "Avenida Principal 456",
            Price = 300000,
            idImage = "507f1f77bcf86cd799439013"
        };

        _mockService.Setup(x => x.CreateAsync(request))
            .ThrowsAsync(new Exception("Database error"));

        // Act
        var result = await _controller.Create(request);

        // Assert
        Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
    }

    #endregion
}

