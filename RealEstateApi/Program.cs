using RealEstateApi.Domain.Settings;
using RealEstateApi.Infraestructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Add Controllers
builder.Services.AddControllers();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Puerto de Next.js
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Configure MongoDB
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDbSettings"));

builder.Services.AddSingleton<MongoDbContext>();

// Register Repositories (Infrastructure Layer)
builder.Services.AddScoped<RealEstateApi.Domain.Interfaces.IPropertyRepository, 
    RealEstateApi.Infraestructure.Repositories.PropertyRepository>();

// Register Services (Application Layer)
builder.Services.AddScoped<RealEstateApi.Application.Interfaces.IPropertyService, 
    RealEstateApi.Application.Services.PropertyService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Use CORS - debe ir después de UseHttpsRedirection y antes de UseAuthorization
app.UseCors("AllowFrontend");

// Map Controllers
app.MapControllers();

app.Run();

