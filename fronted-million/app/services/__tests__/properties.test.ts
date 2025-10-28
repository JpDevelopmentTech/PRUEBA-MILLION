import { getProperties, getProperty } from '../properties';
import { Property, PropertyDetail } from '../../interfaces/properties';

// Mock global fetch
global.fetch = jest.fn();

describe('properties service', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    (fetch as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getProperties', () => {
    const mockProperties: Property[] = [
      {
        id: '1',
        name: 'Casa Test',
        address: 'Calle 123',
        price: 200000,
        codeInternal: 'COD001',
        year: 2020,
        idOwner: 'owner1',
        images: ['image1.jpg', 'image2.jpg']
      },
      {
        id: '2',
        name: 'Apartamento Test',
        address: 'Avenida 456',
        price: 150000,
        codeInternal: 'COD002',
        year: 2021,
        idOwner: 'owner2',
        images: ['image3.jpg']
      }
    ];

    it('should fetch properties successfully without filters', async () => {
      // Arrange
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProperties,
      });

      // Act
      const result = await getProperties('', '', 0, 0);

      // Assert
      expect(fetch).toHaveBeenCalledTimes(1);
      const callArgs = (fetch as jest.Mock).mock.calls[0];
      expect(callArgs[0]).toContain('/properties/search');
      expect(callArgs[1]).toEqual(expect.objectContaining({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      expect(result).toEqual(mockProperties);
    });

    it('should fetch properties with name filter', async () => {
      // Arrange
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [mockProperties[0]],
      });

      // Act
      const result = await getProperties('Casa', '', 0, 0);

      // Assert
      expect(fetch).toHaveBeenCalledTimes(1);
      const callArgs = (fetch as jest.Mock).mock.calls[0];
      expect(callArgs[0]).toContain('/properties/search');
      expect(callArgs[0]).toContain('name=Casa');
      expect(result).toEqual([mockProperties[0]]);
    });

    it('should fetch properties with address filter', async () => {
      // Arrange
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProperties,
      });

      // Act
      const result = await getProperties('', 'Calle', 0, 0);

      // Assert
      expect(fetch).toHaveBeenCalledTimes(1);
      const callArgs = (fetch as jest.Mock).mock.calls[0];
      expect(callArgs[0]).toContain('/properties/search');
      expect(callArgs[0]).toContain('address=Calle');
      expect(result).toEqual(mockProperties);
    });

    it('should fetch properties with price filters', async () => {
      // Arrange
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProperties,
      });

      // Act
      const result = await getProperties('', '', 100000, 300000);

      // Assert
      expect(fetch).toHaveBeenCalledTimes(1);
      const callArgs = (fetch as jest.Mock).mock.calls[0];
      expect(callArgs[0]).toContain('/properties/search');
      expect(callArgs[0]).toContain('priceMin=100000');
      expect(callArgs[0]).toContain('priceMax=300000');
      expect(result).toEqual(mockProperties);
    });

    it('should fetch properties with all filters', async () => {
      // Arrange
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [mockProperties[0]],
      });

      // Act
      const result = await getProperties('Casa', 'Calle', 100000, 300000);

      // Assert
      expect(fetch).toHaveBeenCalledTimes(1);
      const callArgs = (fetch as jest.Mock).mock.calls[0];
      expect(callArgs[0]).toContain('/properties/search');
      expect(callArgs[0]).toContain('name=Casa');
      expect(callArgs[0]).toContain('address=Calle');
      expect(callArgs[0]).toContain('priceMin=100000');
      expect(callArgs[0]).toContain('priceMax=300000');
      expect(result).toEqual([mockProperties[0]]);
    });

    it('should throw error when fetch fails', async () => {
      // Arrange
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      // Act & Assert
      await expect(getProperties('', '', 0, 0)).rejects.toThrow('Failed to fetch properties');
    });

    it('should throw error when network fails', async () => {
      // Arrange
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      // Act & Assert
      await expect(getProperties('', '', 0, 0)).rejects.toThrow('Network error');
    });

    it('should handle empty results', async () => {
      // Arrange
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      // Act
      const result = await getProperties('', '', 0, 0);

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('getProperty', () => {
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

    it('should fetch property details successfully', async () => {
      // Arrange
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPropertyDetail,
      });

      // Act
      const result = await getProperty('1');

      // Assert
      expect(fetch).toHaveBeenCalledTimes(1);
      const callArgs = (fetch as jest.Mock).mock.calls[0];
      expect(callArgs[0]).toContain('/properties/1/details');
      expect(callArgs[1]).toEqual(expect.objectContaining({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      expect(result).toEqual(mockPropertyDetail);
    });

    it('should throw error when property not found', async () => {
      // Arrange
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      // Act & Assert
      await expect(getProperty('999')).rejects.toThrow('Failed to fetch property');
    });

    it('should throw error when network fails', async () => {
      // Arrange
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      // Act & Assert
      await expect(getProperty('1')).rejects.toThrow('Network error');
    });

    it('should handle property without owner', async () => {
      // Arrange
      const propertyWithoutOwner = {
        ...mockPropertyDetail,
        owner: null
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => propertyWithoutOwner,
      });

      // Act
      const result = await getProperty('1');

      // Assert
      expect(result.owner).toBeNull();
    });

    it('should handle property without images and traces', async () => {
      // Arrange
      const propertyEmptyArrays = {
        ...mockPropertyDetail,
        images: [],
        traces: []
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => propertyEmptyArrays,
      });

      // Act
      const result = await getProperty('1');

      // Assert
      expect(result.images).toEqual([]);
      expect(result.traces).toEqual([]);
    });
  });
});

