# 🏠 Million Real Estate - Frontend

Aplicación web moderna de bienes raíces construida con Next.js, React y TypeScript. Permite buscar, filtrar y visualizar propiedades inmobiliarias con una interfaz elegante y responsiva.

## ✨ Características

- 🔍 **Búsqueda avanzada** - Filtra propiedades por nombre, dirección y rango de precio
- 📱 **Diseño responsivo** - Optimizado para móviles, tablets y desktop
- 🎨 **Animaciones fluidas** - Implementadas con Framer Motion
- 🖼️ **Galería de imágenes** - Visualización atractiva de propiedades
- 🎯 **Filtros en tiempo real** - Búsqueda instantánea de propiedades
- 📊 **Información detallada** - Vista completa de cada propiedad
- ⚡ **Rendimiento optimizado** - Next.js 16 con App Router
- ✅ **100% Test Coverage** - Tests completos con Jest y React Testing Library

## 🛠️ Tecnologías

### Frontend
- **Next.js 16** - Framework React con App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Framework CSS utility-first
- **Framer Motion** - Librería de animaciones
- **Lucide React** - Iconos SVG

### Testing
- **Jest** - Framework de testing
- **React Testing Library** - Testing de componentes React
- **Jest DOM** - Matchers adicionales para DOM

## 📋 Requisitos Previos

- Node.js 18.x o superior
- npm, yarn o pnpm
- API Backend corriendo (ver proyecto `RealEstateApi`)

## 🚀 Instalación

1. **Clona el repositorio**
```bash
git clone <repository-url>
cd fronted-million
```

2. **Instala las dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Configura las variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_URL=http://localhost:5191/api
```

4. **Inicia el servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

5. **Abre tu navegador**
```
http://localhost:3000
```

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo en http://localhost:3000

# Producción
npm run build        # Crea build de producción
npm run start        # Inicia servidor de producción

# Testing
npm test             # Ejecuta los tests
npm test -- --coverage  # Ejecuta tests con cobertura

# Linting
npm run lint         # Ejecuta ESLint
```

## 📁 Estructura del Proyecto

```
fronted-million/
├── app/                          # App Router de Next.js
│   ├── __tests__/               # Tests de componentes
│   │   ├── layout.test.tsx
│   │   └── page.test.tsx
│   ├── hooks/                   # Custom hooks
│   │   ├── __tests__/
│   │   ├── useProperties.ts     # Hook para obtener propiedades
│   │   └── useProperty.ts       # Hook para obtener propiedad específica
│   ├── interfaces/              # Definiciones TypeScript
│   │   └── properties.ts
│   ├── property/[id]/          # Página de detalle de propiedad
│   │   ├── __tests__/
│   │   └── page.tsx
│   ├── services/               # Servicios de API
│   │   ├── __tests__/
│   │   └── properties.ts       # Funciones de API
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Página de inicio
│   └── globals.css             # Estilos globales
├── public/                      # Archivos estáticos
├── coverage/                    # Reportes de cobertura de tests
├── jest.config.js              # Configuración de Jest
├── jest.setup.js               # Setup de Jest
├── next.config.ts              # Configuración de Next.js
├── tsconfig.json               # Configuración de TypeScript
└── package.json                # Dependencias del proyecto
```

## 🎨 Características de UI/UX

### Diseño Responsive
- **Móvil**: Sidebar colapsable con botón hamburguesa, grid de 1 columna
- **Tablet**: Sidebar colapsable, grid de 2 columnas
- **Desktop**: Sidebar fija visible, grid de 2-3 columnas

### Componentes Principales

#### Página de Inicio (`/`)
- Barra lateral con filtros (nombre, dirección, rango de precio)
- Grid de propiedades con cards informativas
- Badge de precio en cada propiedad
- Botones de navegación animados
- Estado vacío cuando no hay resultados

#### Página de Detalle (`/property/[id]`)
- Galería de imágenes
- Información completa de la propiedad
- Datos del propietario
- Historial de transacciones
- Navegación de regreso

### Animaciones
- Transiciones suaves al cargar contenido
- Efectos hover en cards
- Slide-in del sidebar móvil
- Fondo animado con partículas flotantes

## 🧪 Testing

El proyecto incluye tests completos con **100% de cobertura**:

- ✅ Tests de componentes (`page.test.tsx`, `layout.test.tsx`)
- ✅ Tests de hooks personalizados (`useProperties.test.tsx`, `useProperty.test.tsx`)
- ✅ Tests de servicios API (`properties.test.ts`)
- ✅ Mocks de fetch y módulos externos

Para ejecutar los tests:
```bash
# Todos los tests
npm test

# Con cobertura
npm test -- --coverage

# Modo watch
npm test -- --watch
```

## 🔧 Configuración

### Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL base de la API | `http://localhost:5191/api` |

### Tailwind CSS

El proyecto usa Tailwind CSS 4 con configuración personalizada. Los estilos están optimizados para:
- Dark theme con gradientes
- Glassmorphism effects
- Animaciones fluidas
- Diseño responsivo

### Next.js Config

- Remote patterns configurados para imágenes externas
- App Router habilitado
- TypeScript estricto
- Optimizaciones de imágenes

## 🚀 Despliegue

### Vercel (Recomendado)

```bash
# Instala Vercel CLI
npm i -g vercel

# Despliega
vercel
```

### Otros Proveedores

1. **Netlify**
```bash
npm run build
# Sube la carpeta .next a Netlify
```

2. **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```



## 👥 Autores

- **Jesus David Pineda Gambin** - *Desarrollo inicial*

---

Hecho con ❤️ usando Next.js y React
