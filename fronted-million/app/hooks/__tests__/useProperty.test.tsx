import { renderHook, waitFor } from '@testing-library/react';
import useProperty from '../useProperty';
import { getProperty } from '../../services/properties';
import { PropertyDetail } from '../../interfaces/properties';

// Mock del servicio
jest.mock('../../services/properties');

describe('useProperty hook', () => {
  const mockPropertyDetail: PropertyDetail = {
    id: '1',
    name: 'Casa Test',
    address: 'Calle 123',
    price: 200000,
    codeInternal: 'COD001',
    year: 2020,
    owner: {
      idOwner: 'owner1',
      name: 'John Doe',
      address: 'Owner Address',
      photo: 'photo.jpg',
      birthday: '1990-01-01'
    },
    images: [
      {
        idPropertyImage: 'img1',
        idProperty: '1',
        file: 'image1.jpg',
        enabled: true
      }
    ],
    traces: [
      {
        idPropertyTrace: 'trace1',
        dateSale: '2023-01-01',
        name: 'Sale 1',
        value: 190000,
        tax: 19000,
        idProperty: '1'
      }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return property details successfully', async () => {
    // Arrange
    (getProperty as jest.Mock).mockResolvedValue(mockPropertyDetail);

    // Act
    const { result } = renderHook(() => useProperty('1'));

    // Assert
    expect(result.current.property).toBeNull();
    
    await waitFor(() => {
      expect(result.current.property).toEqual(mockPropertyDetail);
    });
    
    expect(getProperty).toHaveBeenCalledWith('1');
    expect(getProperty).toHaveBeenCalledTimes(1);
  });

  it('should handle property without owner', async () => {
    // Arrange
    const propertyWithoutOwner = {
      ...mockPropertyDetail,
      owner: null
    };
    (getProperty as jest.Mock).mockResolvedValue(propertyWithoutOwner);

    // Act
    const { result } = renderHook(() => useProperty('1'));

    // Assert
    await waitFor(() => {
      expect(result.current.property).toEqual(propertyWithoutOwner);
      expect(result.current.property?.owner).toBeNull();
    });
  });

  it('should handle property without images and traces', async () => {
    // Arrange
    const propertyEmptyArrays = {
      ...mockPropertyDetail,
      images: [],
      traces: []
    };
    (getProperty as jest.Mock).mockResolvedValue(propertyEmptyArrays);

    // Act
    const { result } = renderHook(() => useProperty('1'));

    // Assert
    await waitFor(() => {
      expect(result.current.property).toEqual(propertyEmptyArrays);
      expect(result.current.property?.images).toEqual([]);
      expect(result.current.property?.traces).toEqual([]);
    });
  });

  it('should handle errors gracefully', async () => {
    // Arrange
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (getProperty as jest.Mock).mockRejectedValue(new Error('Network error'));

    // Act
    const { result } = renderHook(() => useProperty('1'));

    // Assert
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching property:', 
        expect.any(Error)
      );
    });
    
    // El estado debe quedarse en null
    expect(result.current.property).toBeNull();
    
    consoleErrorSpy.mockRestore();
  });

  it('should refetch when id changes', async () => {
    // Arrange
    const mockProperty2 = {
      ...mockPropertyDetail,
      id: '2',
      name: 'Casa 2'
    };
    
    (getProperty as jest.Mock)
      .mockResolvedValueOnce(mockPropertyDetail)
      .mockResolvedValueOnce(mockProperty2);

    // Act
    const { result, rerender } = renderHook(
      ({ id }) => useProperty(id),
      { initialProps: { id: '1' } }
    );

    // Primera carga
    await waitFor(() => {
      expect(result.current.property).toEqual(mockPropertyDetail);
    });

    // Cambiar id
    rerender({ id: '2' });

    // Assert - debería llamar a getProperty de nuevo
    await waitFor(() => {
      expect(getProperty).toHaveBeenCalledTimes(2);
      expect(getProperty).toHaveBeenLastCalledWith('2');
      expect(result.current.property).toEqual(mockProperty2);
    });
  });

  it('should not refetch when same id is used', async () => {
    // Arrange
    (getProperty as jest.Mock).mockResolvedValue(mockPropertyDetail);

    // Act
    const { result, rerender } = renderHook(
      ({ id }) => useProperty(id),
      { initialProps: { id: '1' } }
    );

    await waitFor(() => {
      expect(result.current.property).toEqual(mockPropertyDetail);
    });

    // Re-renderizar con el mismo id
    rerender({ id: '1' });

    // Assert
    await waitFor(() => {
      expect(getProperty).toHaveBeenCalledTimes(1);
    });
  });

  it('should handle 404 error (property not found)', async () => {
    // Arrange
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (getProperty as jest.Mock).mockRejectedValue(new Error('Property not found'));

    // Act
    const { result } = renderHook(() => useProperty('999'));

    // Assert
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching property:', 
        expect.any(Error)
      );
    });
    
    expect(result.current.property).toBeNull();
    
    consoleErrorSpy.mockRestore();
  });
});

