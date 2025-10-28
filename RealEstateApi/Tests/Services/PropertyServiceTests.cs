using NUnit.Framework;
using Moq;
using RealEstateApi.Application.Services;
using RealEstateApi.Application.DTOs.Request;
using RealEstateApi.Application.DTOs.Response;
using RealEstateApi.Domain.Entities;
using RealEstateApi.Domain.Interfaces;
using MongoDB.Bson;

namespace RealEstateApi.Tests.Services;

[TestFixture]
public class PropertyServiceTests
{
    private Mock<IPropertyRepository> _mockRepository;
    private PropertyService _propertyService;

    [SetUp]
    public void Setup()
    {
        _mockRepository = new Mock<IPropertyRepository>();
        _propertyService = new PropertyService(_mockRepository.Object);
    }

    #region GetByIdAsync Tests

    [Test]
    public async Task GetByIdAsync_WhenPropertyExists_ReturnsPropertyResponse()
    {
        // Arrange
        var propertyId = "507f1f77bcf86cd799439011";
        var property = new Property
        {
            id = propertyId,
            Name = "Casa Test",
            Address = "Calle 123",
            Price = 200000,
            CodeInternal = "COD001",
            Year = 2020,
            IdOwner = "507f1f77bcf86cd799439012"
        };

        _mockRepository.Setup(x => x.GetByIdAsync(propertyId))
            .ReturnsAsync(property);

        // Act
        var result = await _propertyService.GetByIdAsync(propertyId);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result!.id, Is.EqualTo(propertyId));
        Assert.That(result.Name, Is.EqualTo("Casa Test"));
        Assert.That(result.Price, Is.EqualTo(200000));
    }

    [Test]
    public async Task GetByIdAsync_WhenPropertyDoesNotExist_ReturnsNull()
    {
        // Arrange
        var propertyId = "507f1f77bcf86cd799439011";
        _mockRepository.Setup(x => x.GetByIdAsync(propertyId))
            .ReturnsAsync((Property?)null);

        // Act
        var result = await _propertyService.GetByIdAsync(propertyId);

        // Assert
        Assert.That(result, Is.Null);
    }

    #endregion

    #region CreateAsync Tests

    [Test]
    public async Task CreateAsync_WhenValidRequest_CreatesAndReturnsPropertyResponse()
    {
        // Arrange
        var createRequest = new CreatePropertyRequest
        {
            Name = "Nueva Casa",
            Address = "Avenida Principal 456",
            Price = 300000,
            idImage = "507f1f77bcf86cd799439013"
        };

        var createdProperty = new Property
        {
            id = "507f1f77bcf86cd799439014",
            Name = createRequest.Name,
            Address = createRequest.Address,
            Price = createRequest.Price,
            idImage = createRequest.idImage,
            CodeInternal = "AUTO-GEN",
            Year = DateTime.Now.Year,
            IdOwner = string.Empty
        };

        _mockRepository.Setup(x => x.CreateAsync(It.IsAny<Property>()))
            .ReturnsAsync(createdProperty);

        // Act
        var result = await _propertyService.CreateAsync(createRequest);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Name, Is.EqualTo(createRequest.Name));
        Assert.That(result.Address, Is.EqualTo(createRequest.Address));
        Assert.That(result.Price, Is.EqualTo(createRequest.Price));
        
        // Verify that the repository CreateAsync was called
        _mockRepository.Verify(x => x.CreateAsync(It.IsAny<Property>()), Times.Once);
    }

    #endregion

    #region GetByFiltersAsync Tests

    [Test]
    public async Task GetByFiltersAsync_WhenNoFilters_ReturnsAllProperties()
    {
        // Arrange
        var bsonDocs = new List<BsonDocument>
        {
            new BsonDocument
            {
                { "_id", ObjectId.GenerateNewId() },
                { "name", "Casa 1" },
                { "address", "Bogota" },
                { "price", 200000 },
                { "codeInternal", "COD001" },
                { "year", 2020 },
                { "idOwner", ObjectId.GenerateNewId() }
            },
            new BsonDocument
            {
                { "_id", ObjectId.GenerateNewId() },
                { "name", "Casa 2" },
                { "address", "Medellin" },
                { "price", 150000 },
                { "codeInternal", "COD002" },
                { "year", 2021 },
                { "idOwner", ObjectId.GenerateNewId() }
            }
        };

        _mockRepository.Setup(x => x.GetPropertiesWithImagesAsync(null, null, null, null))
            .ReturnsAsync(bsonDocs);

        // Act
        var result = await _propertyService.GetByFiltersAsync(null, null, null, null);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Count(), Is.EqualTo(2));
    }

    [Test]
    public async Task GetByFiltersAsync_WhenNameFilter_ReturnsFilteredProperties()
    {
        // Arrange
        var bsonDoc = new BsonDocument
        {
            { "_id", ObjectId.GenerateNewId() },
            { "name", "Casa Test" },
            { "address", "Bogota" },
            { "price", 200000 },
            { "codeInternal", "COD001" },
            { "year", 2020 },
            { "idOwner", ObjectId.GenerateNewId() }
        };

        _mockRepository.Setup(x => x.GetPropertiesWithImagesAsync("Casa Test", null, null, null))
            .ReturnsAsync(new List<BsonDocument> { bsonDoc });

        // Act
        var result = await _propertyService.GetByFiltersAsync("Casa Test", null, null, null);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Count(), Is.EqualTo(1));
        Assert.That(result.First().Name, Is.EqualTo("Casa Test"));
    }

    [Test]
    public async Task GetByFiltersAsync_WhenPriceRange_ReturnsFilteredProperties()
    {
        // Arrange
        var bsonDoc = new BsonDocument
        {
            { "_id", ObjectId.GenerateNewId() },
            { "name", "Casa Test" },
            { "address", "Bogota" },
            { "price", 250000 },
            { "codeInternal", "COD001" },
            { "year", 2020 },
            { "idOwner", ObjectId.GenerateNewId() }
        };

        _mockRepository.Setup(x => x.GetPropertiesWithImagesAsync(null, null, 200000, 300000))
            .ReturnsAsync(new List<BsonDocument> { bsonDoc });

        // Act
        var result = await _propertyService.GetByFiltersAsync(null, null, 200000, 300000);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Count(), Is.EqualTo(1));
        Assert.That(result.First().Price, Is.GreaterThanOrEqualTo(200000));
        Assert.That(result.First().Price, Is.LessThanOrEqualTo(300000));
    }

    #endregion
}

