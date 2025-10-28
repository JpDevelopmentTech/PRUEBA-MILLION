const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Proporciona la ruta a tu aplicación Next.js para cargar archivos next.config.js y .env
  dir: './',
})

// Agregar cualquier configuración personalizada de Jest a continuación
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
}

// createJestConfig se exporta de esta forma para asegurar que next/jest puede cargar la configuración
module.exports = createJestConfig(customJestConfig)

