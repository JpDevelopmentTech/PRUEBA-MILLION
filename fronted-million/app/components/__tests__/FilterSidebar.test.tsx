import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FilterSidebar from '../FilterSidebar';

// Mock dependencies
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

jest.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon" />,
  MapPin: () => <div data-testid="map-icon" />,
  DollarSign: () => <div data-testid="dollar-icon" />,
  Home: () => <div data-testid="home-icon" />,
  Filter: () => <div data-testid="filter-icon" />,
  Sparkles: () => <div data-testid="sparkles-icon" />,
  TrendingUp: () => <div data-testid="trending-icon" />,
}));

describe('FilterSidebar', () => {
  const defaultProps = {
    name: '',
    setName: jest.fn(),
    address: '',
    setAddress: jest.fn(),
    priceMin: 0,
    setPriceMin: jest.fn(),
    priceMax: 1000000,
    setPriceMax: jest.fn(),
    propertiesCount: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render filter sidebar with all filters', () => {
    render(<FilterSidebar {...defaultProps} />);

    expect(screen.getByText('Filtros')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar por nombre...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar por ubicación...')).toBeInTheDocument();
  });

  it('should update name filter when input changes', () => {
    const mockSetName = jest.fn();
    render(<FilterSidebar {...defaultProps} setName={mockSetName} />);

    const nameInput = screen.getByPlaceholderText('Buscar por nombre...');
    fireEvent.change(nameInput, { target: { value: 'Casa' } });

    expect(mockSetName).toHaveBeenCalledWith('Casa');
  });

  it('should update address filter when input changes', () => {
    const mockSetAddress = jest.fn();
    render(<FilterSidebar {...defaultProps} setAddress={mockSetAddress} />);

    const addressInput = screen.getByPlaceholderText('Buscar por ubicación...');
    fireEvent.change(addressInput, { target: { value: 'Calle' } });

    expect(mockSetAddress).toHaveBeenCalledWith('Calle');
  });

  it('should display properties count', () => {
    render(<FilterSidebar {...defaultProps} propertiesCount={5} />);

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('propiedades encontradas')).toBeInTheDocument();
  });

  it('should display min price slider with correct value', () => {
    render(<FilterSidebar {...defaultProps} priceMin={100000} />);

    const sliders = screen.getAllByRole('slider');
    const minPriceSlider = sliders[0];
    
    expect(minPriceSlider).toHaveValue('100000');
  });

  it('should display max price slider with correct value', () => {
    render(<FilterSidebar {...defaultProps} priceMax={500000} />);

    const sliders = screen.getAllByRole('slider');
    const maxPriceSlider = sliders[1];
    
    expect(maxPriceSlider).toHaveValue('500000');
  });

  it('should update min price when slider changes', () => {
    const mockSetPriceMin = jest.fn();
    render(<FilterSidebar {...defaultProps} setPriceMin={mockSetPriceMin} />);

    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[0], { target: { value: '200000' } });

    expect(mockSetPriceMin).toHaveBeenCalledWith(200000);
  });

  it('should update max price when slider changes', () => {
    const mockSetPriceMax = jest.fn();
    render(<FilterSidebar {...defaultProps} setPriceMax={mockSetPriceMax} />);

    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[1], { target: { value: '500000' } });

    expect(mockSetPriceMax).toHaveBeenCalledWith(500000);
  });

  it('should render mobile version when isMobile is true', () => {
    render(<FilterSidebar {...defaultProps} isMobile isOpen={false} />);

    // Mobile sidebar should not be visible when closed
    expect(screen.queryByText('Cerrar')).not.toBeInTheDocument();
  });

  it('should render close button on mobile when open', () => {
    render(<FilterSidebar {...defaultProps} isMobile isOpen={true} onClose={jest.fn()} />);

    expect(screen.getByText('Cerrar')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked on mobile', () => {
    const mockOnClose = jest.fn();
    render(<FilterSidebar {...defaultProps} isMobile isOpen={true} onClose={mockOnClose} />);

    const closeButton = screen.getByText('Cerrar');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});

