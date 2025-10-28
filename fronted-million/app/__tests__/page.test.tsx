import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import HomePage from '../page';
import useProperties from '../hooks/useProperties';
import { useRouter } from 'next/navigation';

// Mock dependencies
jest.mock('../hooks/useProperties');
jest.mock('next/navigation');
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, initial, animate, transition, whileHover, ...props }: any) => (
      <div className={className} {...props}>{children}</div>
    ),
    button: ({ children, className, whileHover, whileTap, ...props }: any) => (
      <button className={className} {...props}>{children}</button>
    ),
  },
}));

describe('HomePage', () => {
  const mockProperties = [
    {
      id: '1',
      name: 'Casa Test 1',
      address: 'Calle 123',
      price: 200000,
      codeInternal: 'COD001',
      year: 2020,
      idOwner: 'owner1',
      images: ['/image1.jpg']
    },
    {
      id: '2',
      name: 'Apartamento Test',
      address: 'Avenida 456',
      price: 150000,
      codeInternal: 'COD002',
      year: 2021,
      idOwner: 'owner2',
      images: ['/image2.jpg']
    }
  ];

  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('should render homepage with filters', async () => {
    // Arrange
    (useProperties as jest.Mock).mockReturnValue({
      properties: []
    });

    // Act
    render(<HomePage />);

    // Assert
    expect(screen.getByText('Filtros')).toBeInTheDocument();
    expect(screen.getByText('Propiedades Destacadas')).toBeInTheDocument();
  });

  it('should render properties list', async () => {
    // Arrange
    (useProperties as jest.Mock).mockReturnValue({
      properties: mockProperties
    });

    // Act
    render(<HomePage />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Casa Test 1')).toBeInTheDocument();
      expect(screen.getByText('Apartamento Test')).toBeInTheDocument();
    });
  });

  it('should display property information correctly', async () => {
    // Arrange
    (useProperties as jest.Mock).mockReturnValue({
      properties: [mockProperties[0]]
    });

    // Act
    render(<HomePage />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Casa Test 1')).toBeInTheDocument();
      expect(screen.getByText('Calle 123')).toBeInTheDocument();
    });
  });

  it('should show empty state when no properties', async () => {
    // Arrange
    (useProperties as jest.Mock).mockReturnValue({
      properties: []
    });

    // Act
    render(<HomePage />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('No se encontraron propiedades')).toBeInTheDocument();
    });
  });

  it('should call router.push when clicking view details button', async () => {
    // Arrange
    (useProperties as jest.Mock).mockReturnValue({
      properties: mockProperties
    });

    // Act
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText('Casa Test 1')).toBeInTheDocument();
    });

    const buttons = screen.getAllByText('Ver Detalles');
    fireEvent.click(buttons[0]);

    // Assert
    expect(mockRouter.push).toHaveBeenCalledWith('/property/1');
  });

  it('should filter properties by name', async () => {
    // Arrange
    (useProperties as jest.Mock).mockReturnValue({
      properties: [mockProperties[0]]
    });

    // Act
    render(<HomePage />);

    const nameInput = screen.getByPlaceholderText('Buscar por nombre...');
    fireEvent.change(nameInput, { target: { value: 'Casa' } });

    // Assert
    expect(nameInput).toHaveValue('Casa');
  });

  it('should filter properties by address', async () => {
    // Arrange
    (useProperties as jest.Mock).mockReturnValue({
      properties: mockProperties
    });

    // Act
    render(<HomePage />);

    const addressInput = screen.getByPlaceholderText('Buscar por ubicación...');
    fireEvent.change(addressInput, { target: { value: 'Calle' } });

    // Assert
    expect(addressInput).toHaveValue('Calle');
  });

  it('should update price range filters', async () => {
    // Arrange
    (useProperties as jest.Mock).mockReturnValue({
      properties: mockProperties
    });

    // Act
    render(<HomePage />);

    const minPriceSlider = screen.getByDisplayValue('0');
    fireEvent.change(minPriceSlider, { target: { value: '100000' } });

    // Assert
    expect(minPriceSlider).toHaveValue('100000');
  });

  it('should display properties count', async () => {
    // Arrange
    (useProperties as jest.Mock).mockReturnValue({
      properties: mockProperties
    });

    // Act
    render(<HomePage />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('propiedades encontradas')).toBeInTheDocument();
    });
  });

  it('should display count as 0 when no properties', async () => {
    // Arrange
    (useProperties as jest.Mock).mockReturnValue({
      properties: []
    });

    // Act
    render(<HomePage />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  it('should render all filter inputs', async () => {
    // Arrange
    (useProperties as jest.Mock).mockReturnValue({
      properties: []
    });

    // Act
    render(<HomePage />);

    // Assert
    expect(screen.getByPlaceholderText('Buscar por nombre...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar por ubicación...')).toBeInTheDocument();
    expect(screen.getByDisplayValue('0')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1000000')).toBeInTheDocument();
  });

  it('should show price N/A when property has no price', async () => {
    // Arrange
    const propertyWithoutPrice = {
      ...mockProperties[0],
      price: undefined
    };
    (useProperties as jest.Mock).mockReturnValue({
      properties: [propertyWithoutPrice]
    });

    // Act
    render(<HomePage />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('N/A')).toBeInTheDocument();
    });
  });

  it('should handle max price filter change', async () => {
    // Arrange
    (useProperties as jest.Mock).mockReturnValue({
      properties: mockProperties
    });

    // Act
    render(<HomePage />);

    const maxPriceSlider = screen.getByDisplayValue('1000000');
    fireEvent.change(maxPriceSlider, { target: { value: '500000' } });

    // Assert
    expect(maxPriceSlider).toHaveValue('500000');
  });
});

