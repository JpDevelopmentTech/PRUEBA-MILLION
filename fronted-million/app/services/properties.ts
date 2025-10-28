import { Property, PropertyDetail } from "../interfaces/properties";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getProperties = async (name: string, address: string, priceMin: number, priceMax: number) => {
    try {
        const query = new URLSearchParams();
        if (name) query.set('name', name);
        if (address) query.set('address', address);
        if (priceMin) query.set('priceMin', priceMin.toString());
        if (priceMax) query.set('priceMax', priceMax.toString());
        const response = await fetch(`${API_URL}/properties/search?${query.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        return data as Property[];
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error;
    }
}

export const getProperty = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/properties/${id}/details`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch property');
        }
        const data = await response.json();
        return data as PropertyDetail;
    } catch (error) {
        console.error('Error fetching property:', error);
        throw error;
    }
}