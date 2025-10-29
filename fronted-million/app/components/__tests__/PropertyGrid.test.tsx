import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PropertyGrid from '../PropertyGrid';

// Mock dependencies
jest.mock('../PropertyCard', () => ({
  __esModule: true,
  default: ({ property, onViewDetails }: any) => (
    <div data-testid={`property-card-${property.id}`}>
      <h3>{property.name}</h3>
      <button onClick={() => onViewDetails(property.id)}>Ver Detalles</button>
    </div>
  ),
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>{children}</div>
    ),
  },
}));

jest.mock('lucide-react', () => ({
  Home: () => <div data-testid="home-icon" />,
}));

describe('PropertyGrid', () => {
  const mockProperties = [
    {
      id: '1',
      name: 'Casa Test 1',
      address: 'Calle 123',
      price: 200000,
      images: ['/image1.jpg']
    },
    {
      id: '2',
      name: 'Apartamento Test',
      address: 'Avenida 456',
      price: 150000,
      images: ['/image2.jpg']
    }
  ];

  const mockOnViewDetails = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render property grid with heading', () => {
    render(
      <PropertyGrid
        properties={mockProperties}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText('Propiedades Destacadas')).toBeInTheDocument();
  });

  it('should render all properties', () => {
    render(
      <PropertyGrid
        properties={mockProperties}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByTestId('property-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('property-card-2')).toBeInTheDocument();
    expect(screen.getByText('Casa Test 1')).toBeInTheDocument();
    expect(screen.getByText('Apartamento Test')).toBeInTheDocument();
  });

  it('should show empty state when no properties', () => {
    render(
      <PropertyGrid
        properties={[]}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText('No se encontraron propiedades')).toBeInTheDocument();
    expect(screen.getByText('Intenta ajustar los filtros')).toBeInTheDocument();
  });

  it('should not show empty state when there are properties', () => {
    render(
      <PropertyGrid
        properties={mockProperties}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.queryByText('No se encontraron propiedades')).not.toBeInTheDocument();
  });

  it('should call onViewDetails when property is clicked', () => {
    render(
      <PropertyGrid
        properties={mockProperties}
        onViewDetails={mockOnViewDetails}
      />
    );

    const buttons = screen.getAllByText('Ver Detalles');
    fireEvent.click(buttons[0]);

    expect(mockOnViewDetails).toHaveBeenCalledWith('1');
  });
});

