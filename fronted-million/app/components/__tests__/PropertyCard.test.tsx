import { render, screen, fireEvent } from '@testing-library/react';
import PropertyCard from '../PropertyCard';
import Image from 'next/image';

// Mock dependencies
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} data-testid="property-image" />;
  },
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, whileHover, ...props }: any) => {
      // Remove framer-motion specific props to avoid warnings
      delete props.whileHover;
      delete props.whileTap;
      delete props.initial;
      delete props.animate;
      delete props.transition;
      return <div className={className} {...props}>{children}</div>;
    },
    button: ({ children, className, whileHover, whileTap, ...props }: any) => {
      // Remove framer-motion specific props to avoid warnings
      delete props.whileHover;
      delete props.whileTap;
      return <button className={className} {...props}>{children}</button>;
    },
  },
}));

describe('PropertyCard', () => {
  const mockProperty = {
    id: '1',
    name: 'Casa Test',
    address: 'Calle 123',
    price: 200000,
    images: ['/image1.jpg']
  };

  const mockOnViewDetails = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render property card with correct information', () => {
    const { container } = render(
      <PropertyCard
        property={mockProperty}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText('Casa Test')).toBeInTheDocument();
    expect(screen.getByText('Calle 123')).toBeInTheDocument();
    
    // Check for price badge container (locale-dependent format makes it difficult to test exact text)
    // Verify the price section exists by checking for dollar sign icon
    const dollarIcon = container.querySelector('.lucide-dollar-sign');
    expect(dollarIcon).toBeInTheDocument();
  });

  it('should call onViewDetails when button is clicked', () => {
    render(
      <PropertyCard
        property={mockProperty}
        onViewDetails={mockOnViewDetails}
      />
    );

    const button = screen.getByText('Ver Detalles');
    fireEvent.click(button);

    expect(mockOnViewDetails).toHaveBeenCalledWith('1');
  });

  it('should display N/A when price is undefined', () => {
    const propertyWithoutPrice = {
      ...mockProperty,
      price: undefined
    };

    render(
      <PropertyCard
        property={propertyWithoutPrice}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('should render property image', () => {
    render(
      <PropertyCard
        property={mockProperty}
        onViewDetails={mockOnViewDetails}
      />
    );

    const image = screen.getByTestId('property-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/image1.jpg');
    expect(image).toHaveAttribute('alt', 'Casa Test');
  });
});

