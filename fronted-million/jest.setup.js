// Ajustes personalizados para Jest
// Importar jest-dom para matchers adicionales
import '@testing-library/jest-dom';

// Opcional: Configurar fetch global para tests
global.fetch = jest.fn();

// Configurar variables de entorno para tests
process.env.NEXT_PUBLIC_API_URL = '';

