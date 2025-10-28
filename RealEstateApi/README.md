# 🏢 Real Estate API - Backend

API REST de bienes raíces construida con ASP.NET Core 9 y MongoDB. Proporciona endpoints para gestionar propiedades inmobiliarias, incluyendo búsquedas avanzadas, filtros y operaciones CRUD.

## ✨ Características

- 🔍 **Búsqueda avanzada** - Filtra propiedades por nombre, dirección y rango de precio
- 📝 **CRUD completo** - Crear, leer, actualizar y eliminar propiedades
- 🏗️ **Arquitectura limpia** - Clean Architecture con capas separadas
- 🎯 **Populate MongoDB** - Obtén datos relacionados automáticamente
- 📊 **Endpoints REST** - API RESTful con convenciones HTTP
- 🔒 **CORS configurado** - Integración con frontend React/Next.js
- 📚 **OpenAPI/Swagger** - Documentación interactiva de API
- ✅ **Tests unitarios** - Tests con NUnit y Moq
- 🐳 **Docker ready** - Listo para contenedorización

## 🛠️ Tecnologías

### Backend
- **.NET 9** - Framework moderno de Microsoft
- **ASP.NET Core** - Framework web
- **MongoDB Driver 3.5.0** - Cliente oficial de MongoDB
- **OpenAPI/Swagger** - Documentación de API
- **CORS** - Cross-Origin Resource Sharing

### Testing
- **NUnit** - Framework de testing
- **Moq** - Mocking library
- **Microsoft.NET.Test.Sdk** - SDK de testing
- **Coverlet** - Code coverage

## 📋 Requisitos Previos

- .NET 9 SDK
- MongoDB instalado y corriendo
- Visual Studio 2022 / VS Code / JetBrains Rider
- Git

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd RealEstateApi
```

### 2. Configurar MongoDB

#### Opción A: MongoDB Local
```bash
# Windows (con Chocolatey)
choco install mongodb

# Mac
brew install mongodb-community

# Linux
sudo apt-get install mongodb
```

#### Opción B: Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### Opción C: MongoDB Atlas (Cloud)
Usa una instancia gratuita en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### 3. Configurar la aplicación

Edita `appsettings.json` o `appsettings.Development.json`:

```json
{
  "MongoDbSettings": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "RealEstateDB"
  }
}
```

### 4. Restaurar dependencias y ejecutar

```bash
# Restaurar packages NuGet
dotnet restore

# Compilar el proyecto
dotnet build

# Ejecutar la aplicación
dotnet run

# O con hot reload
dotnet watch run
```

La API estará disponible en:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`
- Swagger: `http://localhost:5000/swagger`

## 📜 Scripts Disponibles

```bash
# Desarrollo
dotnet run                 # Ejecuta la aplicación
dotnet watch run           # Ejecuta con hot reload

# Build
dotnet build               # Compila el proyecto
dotnet build --configuration Release  # Build de producción

# Testing
dotnet test                # Ejecuta todos los tests
dotnet test --collect:"XPlat Code Coverage"  # Con cobertura

# Publicar
dotnet publish             # Crea un build para publicación
```

## 📁 Estructura del Proyecto

```
RealEstateApi/
├── Application/                          # Capa de Aplicación
│   ├── DTOs/
│   │   ├── Request/
│   │   │   └── CreatePropertyRequest.cs
│   │   └── Response/
│   │       ├── PropertyDetailResponse.cs
│   │       └── PropertyResponse.cs
│   ├── Interfaces/
│   │   └── IPropertyService.cs
│   └── Services/
│       └── PropertyService.cs
├── Controllers/                          # Controladores API
│   └── PropertiesController.cs
├── Domain/                              # Capa de Dominio
│   ├── Entities/
│   │   ├── Owner.cs
│   │   ├── Property.cs
│   │   ├── PropertyImage.cs
│   │   └── PropertyTrace.cs
│   ├── Interfaces/
│   │   └── IPropertyRepository.cs
│   └── Settings/
│       └── MongoDbSettings.cs
├── Infraestructure/                     # Capa de Infraestructura
│   ├── Persistence/
│   │   └── MongoDbContext.cs
│   └── Repositories/
│       └── PropertyRepository.cs
├── Tests/                               # Tests unitarios
│   ├── Controllers/
│   │   └── PropertiesControllerTests.cs
│   ├── Services/
│   │   └── PropertyServiceTests.cs
│   └── RealEstateApi.Tests.csproj
├── Properties/
│   └── launchSettings.json
├── Program.cs                           # Punto de entrada
├── appsettings.json                     # Configuración base
├── appsettings.Development.json         # Configuración desarrollo
└── RealEstateApi.csproj                 # Proyecto principal
```

## 🏗️ Arquitectura

El proyecto sigue **Clean Architecture** con separación de capas:

### Capas
1. **Domain** - Entidades del dominio, interfaces y configuración
2. **Application** - Lógica de negocio, DTOs y servicios
3. **Infrastructure** - Acceso a datos, repositorios y MongoDB
4. **Controllers** - Endpoints REST y manejo de HTTP

### Ventajas
- ✅ Separación de responsabilidades
- ✅ Testabilidad mejorada
- ✅ Independencia de frameworks
- ✅ Fácil mantenimiento y escalabilidad

## 📡 Endpoints de la API

### Base URL
```
http://localhost:5000/api
```

### Propiedades

#### 1. Obtener todas las propiedades (con filtros)
```http
GET /api/properties/search
```

**Query Parameters:**
- `name` (string, opcional) - Nombre de la propiedad
- `address` (string, opcional) - Dirección
- `priceMin` (decimal, opcional) - Precio mínimo
- `priceMax` (decimal, opcional) - Precio máximo

**Ejemplo:**
```bash
GET /api/properties/search?name=casa&address=bogota&priceMin=100000&priceMax=500000
```

**Respuesta:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "name": "Casa en Bogotá",
    "address": "Calle 100 #50-30",
    "price": 250000
  }
]
```

#### 2. Obtener propiedad por ID
```http
GET /api/properties/{id}
```

**Respuesta:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Casa en Bogotá",
  "address": "Calle 100 #50-30",
  "price": 250000,
  "codeInternal": "PROP001",
  "year": 2020
}
```

#### 3. Obtener propiedad con detalles completos
```http
GET /api/properties/{id}/details
```

**Respuesta:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Casa en Bogotá",
  "address": "Calle 100 #50-30",
  "price": 250000,
  "owner": {
    "name": "Juan Pérez",
    "address": "..."
  },
  "images": [
    {
      "file": "image1.jpg",
      "enabled": true
    }
  ],
  "traces": [...]
}
```

#### 4. Crear nueva propiedad
```http
POST /api/properties
```

**Body:**
```json
{
  "name": "Casa Nueva",
  "address": "Calle 80 #40-20",
  "price": 180000,
  "codeInternal": "PROP002",
  "year": 2023,
  "idOwner": "507f191e810c19729de860ea"
}
```

**Respuesta:**
```json
{
  "id": "507f1f77bcf86cd799439012",
  "name": "Casa Nueva",
  ...
}
```

## 🔧 Configuración

### Variables de Entorno

En .NET, puedes usar variables de entorno para sobrescribir `appsettings.json`:

```bash
# Windows
set MongoDbSettings__ConnectionString=mongodb://localhost:27017
set MongoDbSettings__DatabaseName=RealEstateDB_Prod

# Linux/Mac
export MongoDbSettings__ConnectionString=mongodb://localhost:27017
export MongoDbSettings__DatabaseName=RealEstateDB_Prod
```

**Nota:** Usa doble guion bajo (`__`) para anidar propiedades.

### CORS

Configurado para permitir peticiones desde el frontend en `Program.cs`:

```csharp
policy.WithOrigins("http://localhost:3000")  // Next.js frontend
```

Para producción, actualiza el origen permitido:

```csharp
policy.WithOrigins("https://tu-dominio.com")
```

### MongoDB Connection String

#### Local
```
mongodb://localhost:27017
```

#### MongoDB Atlas
```
mongodb+srv://username:password@cluster.mongodb.net/
```

## 🧪 Testing

### Ejecutar Tests

```bash
# Todos los tests
dotnet test

# Tests con cobertura
dotnet test --collect:"XPlat Code Coverage"

# Tests con output detallado
dotnet test --logger "console;verbosity=detailed"
```

### Coverage Report

El reporte de cobertura se genera en:
```
Tests/TestResults/coverage.cobertura.xml
```

### Tests Disponibles

- ✅ `PropertyServiceTests` - Tests del servicio de propiedades
- ✅ `PropertiesControllerTests` - Tests del controlador

## 🐳 Docker

### Crear imagen

```bash
docker build -t realestate-api .
```

### Ejecutar contenedor

```bash
docker run -d \
  -p 5000:8080 \
  -e MongoDbSettings__ConnectionString=mongodb://host.docker.internal:27017 \
  -e MongoDbSettings__DatabaseName=RealEstateDB \
  realestate-api
```

### Docker Compose

Crea un archivo `docker-compose.yml`:

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "5000:8080"
    environment:
      - MongoDbSettings__ConnectionString=mongodb://mongo:27017
    depends_on:
      - mongo
  
  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

Ejecutar:
```bash
docker-compose up
```

## 🚀 Despliegue

### Azure App Service

```bash
# Login en Azure
az login

# Crear App Service
az webapp up --name realestate-api --runtime "DOTNET|9.0" --sku F1

# Configurar MongoDB
az webapp config appsettings set \
  --name realestate-api \
  --settings MongoDbSettings__ConnectionString="mongodb+srv://..."
```

### AWS (ECS/EKS)

```bash
# Publicar
dotnet publish -c Release

# Construir imagen Docker
docker build -t realestate-api .

# Push a ECR
aws ecr get-login-password | docker login --username AWS --password-stdin
docker tag realestate-api:latest <registry>/realestate-api:latest
docker push <registry>/realestate-api:latest
```

### Heroku

```bash
# Login
heroku login

# Crear app
heroku create realestate-api

# Configurar MongoDB
heroku config:set MongoDbSettings__ConnectionString="mongodb+srv://..."

# Desplegar
git push heroku main
```

## 📊 Modelo de Datos

### Property
```csharp
{
  "id": "ObjectId",
  "name": "string",
  "address": "string",
  "price": "decimal",
  "codeInternal": "string",
  "year": "int",
  "idOwner": "ObjectId",
  "idImage": "string"
}
```

### Owner
```csharp
{
  "id": "ObjectId",
  "name": "string",
  "address": "string",
  "photo": "string",
  "birthday": "DateTime"
}
```



## 👥 Autores

- **Jesus David Pineda Gambin** - *Desarrollo inicial*


Hecho con ❤️ usando .NET 9 y MongoDB

