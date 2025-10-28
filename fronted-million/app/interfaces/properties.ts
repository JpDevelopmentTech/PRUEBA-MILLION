export interface Property {
    id: string;
    name: string;
    address: string;
    price: number;
    codeInternal: string;
    year: number;
    idOwner: string;
    images: string[];
}

export interface PropertyDetail {
    id: string;
    name: string;
    address: string;
    price: number;
    codeInternal: string;
    year: number;
    owner: Owner | null;
    images: PropertyImage[];
    traces: PropertyTrace[];
}

export interface Owner {
    idOwner: string;
    name: string;
    address: string;
    photo: string;
    birthday: string;
}

export interface PropertyImage {
    idPropertyImage: string;
    idProperty: string;
    file: string;
    enabled: boolean;
}

export interface PropertyTrace {
    idPropertyTrace: string;
    dateSale: string;
    name: string;
    value: number;
    tax: number;
    idProperty: string;
}