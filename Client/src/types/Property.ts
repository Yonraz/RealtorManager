export enum PropertyTypeEnum {
  Apartment = "Apartment",
  House = "House",
}

export enum RentOrSaleEnum {
  Rent = "Rent",
  Sale = "Sale",
}

export type GalleryImage = {
  imageUrl: string;
  title: string;
};

export type Gallery = {
  images: string[];
};

interface PropertyProps {
  _id?: string;
  imageUrl: string;
  title: string;
  address: string;
  city: string;
  bedrooms: number;
  type: PropertyTypeEnum;
  price: number;
  numParkings?: number | string;
  rentOrSale?: RentOrSaleEnum;
  description?: string;
  floor?: number | string;
  gallery?: Gallery;
}

export class Property {
  _id?: string = "";
  imageUrl: string = "";
  title: string = "";
  address: string = "";
  city: string = "";
  bedrooms: number = 0;
  type: PropertyTypeEnum = PropertyTypeEnum.Apartment;
  price: number = 0;
  numParkings?: number = 0;
  rentOrSale?: RentOrSaleEnum = RentOrSaleEnum.Rent;
  description?: string = "";
  floor?: number = 0;
  gallery?: Gallery = { images: [] };
  constructor(data?: PropertyProps) {
    if (!data) {
      return;
    }
    this.imageUrl = data.imageUrl;
    this.title = data.title;
    this.address = data.address;
    this.city = data.city;
    this.bedrooms = data.bedrooms;
    this.type = data.type;
    this.price = data.price;
    this.rentOrSale = data.rentOrSale || RentOrSaleEnum.Sale;
    this.description = data.description;
    if (typeof data.numParkings === "number") {
      this.numParkings = data.numParkings;
    }
    if (typeof data.floor === "number") {
      this.floor = data.floor;
    }
    this.gallery = data.gallery || { images: [] };
  }
}
