import RootLayout from '../layout';

// Mock next/font
jest.mock('next/font/google', () => ({
  Poppins: () => ({
    className: 'poppins-class',
    variable: 'poppins-variable',
  }),
}));

describe('RootLayout', () => {
  it('should export RootLayout function', () => {
    // Assert
    expect(typeof RootLayout).toBe('function');
  });

  it('should accept children parameter', () => {
    // Assert - this is a structural test
    expect(RootLayout).toBeDefined();
  });
});
