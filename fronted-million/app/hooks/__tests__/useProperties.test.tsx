import { renderHook, waitFor } from '@testing-library/react';
import useProperties from '../useProperties';
import { getProperties } from '../../services/properties';
import { Property } from '../../interfaces/properties';

// Mock del servicio
jest.mock('../../services/properties');

describe('useProperties hook', () => {
  const mockProperties: Property[] = [
    {
      id: '1',
      name: 'Casa Test',
      address: 'Calle 123',
      price: 200000,
      codeInternal: 'COD001',
      year: 2020,
      idOwner: 'owner1',
      images: ['image1.jpg']
    },
    {
      id: '2',
      name: 'Apartamento Test',
      address: 'Avenida 456',
      price: 150000,
      codeInternal: 'COD002',
      year: 2021,
      idOwner: 'owner2',
      images: ['image2.jpg']
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return properties successfully', async () => {
    // Arrange
    (getProperties as jest.Mock).mockResolvedValue(mockProperties);

    // Act
    const { result } = renderHook(() => 
      useProperties('', '', 0, 0)
    );

    // Assert
    expect(result.current.properties).toEqual([]);
    
    await waitFor(() => {
      expect(result.current.properties).toEqual(mockProperties);
    });
    
    expect(getProperties).toHaveBeenCalledWith('', '', 0, 0);
    expect(getProperties).toHaveBeenCalledTimes(1);
  });

  it('should fetch properties with filters', async () => {
    // Arrange
    (getProperties as jest.Mock).mockResolvedValue([mockProperties[0]]);

    // Act
    const { result } = renderHook(() => 
      useProperties('Casa', 'Calle', 100000, 300000)
    );

    // Assert
    await waitFor(() => {
      expect(result.current.properties).toEqual([mockProperties[0]]);
    });
    
    expect(getProperties).toHaveBeenCalledWith('Casa', 'Calle', 100000, 300000);
  });

  it('should handle empty results', async () => {
    // Arrange
    (getProperties as jest.Mock).mockResolvedValue([]);

    // Act
    const { result } = renderHook(() => 
      useProperties('', '', 0, 0)
    );

    // Assert
    await waitFor(() => {
      expect(result.current.properties).toEqual([]);
    });
  });

  it('should handle errors gracefully', async () => {
    // Arrange
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (getProperties as jest.Mock).mockRejectedValue(new Error('Network error'));

    // Act
    const { result } = renderHook(() => 
      useProperties('', '', 0, 0)
    );

    // Assert
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching properties:', 
        expect.any(Error)
      );
    });
    
    // El estado debe quedarse en el valor inicial
    expect(result.current.properties).toEqual([]);
    
    consoleErrorSpy.mockRestore();
  });

  it('should refetch when filters change', async () => {
    // Arrange
    (getProperties as jest.Mock).mockResolvedValue(mockProperties);

    // Act
    const { result, rerender } = renderHook(
      ({ name, address, priceMin, priceMax }) => 
        useProperties(name, address, priceMin, priceMax),
      {
        initialProps: { name: '', address: '', priceMin: 0, priceMax: 0 }
      }
    );

    // Primera carga
    await waitFor(() => {
      expect(result.current.properties).toEqual(mockProperties);
    });

    // Cambiar filtros
    rerender({ name: 'Casa', address: '', priceMin: 0, priceMax: 0 });

    // Assert - debería llamar a getProperties de nuevo
    await waitFor(() => {
      expect(getProperties).toHaveBeenCalledTimes(2);
      expect(getProperties).toHaveBeenLastCalledWith('Casa', '', 0, 0);
    });
  });

  it('should not refetch when same filters are used', async () => {
    // Arrange
    (getProperties as jest.Mock).mockResolvedValue(mockProperties);

    // Act
    const { result, rerender } = renderHook(
      ({ name }) => useProperties(name, '', 0, 0),
      { initialProps: { name: '' } }
    );

    await waitFor(() => {
      expect(result.current.properties).toEqual(mockProperties);
    });

    // Re-renderizar con los mismos props
    rerender({ name: '' });

    // Assert
    await waitFor(() => {
      expect(getProperties).toHaveBeenCalledTimes(1);
    });
  });

  it('should fetch properties with only name filter', async () => {
    // Arrange
    (getProperties as jest.Mock).mockResolvedValue([mockProperties[0]]);

    // Act
    renderHook(() => useProperties('Casa', '', 0, 0));

    // Assert
    await waitFor(() => {
      expect(getProperties).toHaveBeenCalledWith('Casa', '', 0, 0);
    });
  });

  it('should fetch properties with only price range', async () => {
    // Arrange
    (getProperties as jest.Mock).mockResolvedValue(mockProperties);

    // Act
    renderHook(() => useProperties('', '', 100000, 300000));

    // Assert
    await waitFor(() => {
      expect(getProperties).toHaveBeenCalledWith('', '', 100000, 300000);
    });
  });
});

