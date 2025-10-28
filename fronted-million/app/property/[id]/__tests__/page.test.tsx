import { render, screen, waitFor } from '@testing-library/react';
import Page from '../page';
import useProperty from '@/app/hooks/useProperty';
import { use } from 'react';

// Mock del hook useProperty
jest.mock('@/app/hooks/useProperty');
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Mock use hook
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: jest.fn((promise) => {
    if (promise && typeof promise.then === 'function') {
      return { id: '1' };
    }
    return promise;
  }),
}));

describe('Property Detail Page', () => {
  const mockProperty = {
    id: '1',
    name: 'Casa Test',
    address: 'Calle 123, Bogotá',
    price: 200000,
    codeInternal: 'COD001',
    year: 2020,
    owner: {
      idOwner: 'owner1',
      name: 'John Doe',
      address: 'Owner Address',
      photo: '/photo.jpg',
      birthday: '1990-01-01'
    },
    images: [
      {
        idPropertyImage: 'img1',
        idProperty: '1',
        file: '/image1.jpg',
        enabled: true
      }
    ],
    traces: [
      {
        idPropertyTrace: 'trace1',
        dateSale: '2023-01-15',
        name: 'Sale 1',
        value: 190000,
        tax: 19000,
        idProperty: '1'
      }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.history.back
    window.history.back = jest.fn();
  });

  it('should show loading spinner when property is loading', async () => {
    // Arrange
    (useProperty as jest.Mock).mockReturnValue({
      property: null
    });

    // Act
    render(<Page params={Promise.resolve({ id: '1' })} />);

    // Assert
    await waitFor(() => {
      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  it('should render property details when loaded', async () => {
    // Arrange
    (useProperty as jest.Mock).mockReturnValue({
      property: mockProperty
    });

    // Act
    render(<Page params={Promise.resolve({ id: '1' })} />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Casa Test')).toBeInTheDocument();
    });
    expect(screen.getByText('Calle 123, Bogotá')).toBeInTheDocument();
    expect(screen.getByText('COD001')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
  });

  it('should render owner information when available', async () => {
    // Arrange
    (useProperty as jest.Mock).mockReturnValue({
      property: mockProperty
    });

    // Act
    render(<Page params={Promise.resolve({ id: '1' })} />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Propietario')).toBeInTheDocument();
    });
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should not render owner section when owner is null', async () => {
    // Arrange
    const propertyWithoutOwner = {
      ...mockProperty,
      owner: null
    };
    (useProperty as jest.Mock).mockReturnValue({
      property: propertyWithoutOwner
    });

    // Act
    render(<Page params={Promise.resolve({ id: '1' })} />);

    // Assert
    await waitFor(() => {
      expect(screen.queryByText('Propietario')).not.toBeInTheDocument();
    });
  });

  it('should render images gallery when images are available', async () => {
    // Arrange
    (useProperty as jest.Mock).mockReturnValue({
      property: mockProperty
    });

    // Act
    render(<Page params={Promise.resolve({ id: '1' })} />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Galería de Imágenes')).toBeInTheDocument();
    });
  });

  it('should not render images section when no images', async () => {
    // Arrange
    const propertyWithoutImages = {
      ...mockProperty,
      images: []
    };
    (useProperty as jest.Mock).mockReturnValue({
      property: propertyWithoutImages
    });

    // Act
    render(<Page params={Promise.resolve({ id: '1' })} />);

    // Assert
    await waitFor(() => {
      expect(screen.queryByText('Galería de Imágenes')).not.toBeInTheDocument();
    });
  });

  it('should render property traces when available', async () => {
    // Arrange
    (useProperty as jest.Mock).mockReturnValue({
      property: mockProperty
    });

    // Act
    render(<Page params={Promise.resolve({ id: '1' })} />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Historial de Transacciones')).toBeInTheDocument();
    });
  });

  it('should have back button', async () => {
    // Arrange
    (useProperty as jest.Mock).mockReturnValue({
      property: mockProperty
    });

    // Act
    render(<Page params={Promise.resolve({ id: '1' })} />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Volver')).toBeInTheDocument();
    });
  });

  it('should call window.history.back when back button is clicked', async () => {
    // Arrange
    const backMock = jest.fn();
    window.history.back = backMock;
    
    (useProperty as jest.Mock).mockReturnValue({
      property: mockProperty
    });

    // Act
    render(<Page params={Promise.resolve({ id: '1' })} />);
    
    await waitFor(() => {
      expect(screen.getByText('Volver')).toBeInTheDocument();
    });
    
    const backButton = screen.getByText('Volver');
    backButton.click();

    // Assert
    expect(backMock).toHaveBeenCalledTimes(1);
  });
});
