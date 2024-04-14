import { Property, PropertyTypeEnum } from "./types/Property";

const assetsFolder = new URL("./assets/", import.meta.url).pathname;

const home1: Property = {
  imageUrl: `${assetsFolder}/home1.jpg`,
  title: "דירת 4 חדרים עם נוף לים",
  address: "הרצל 1",
  city: "תל אביב",
  bedrooms: 4,
  numParkings: 1,
  price: 2500000,
  type: PropertyTypeEnum.Apartment,
  floor: 3,
};

const home2: Property = {
  imageUrl: `${assetsFolder}/home2.jpg`,
  title: "דירת גן מטופחת",
  address: "שבזי 13",
  city: "תל אביב",
  bedrooms: 2,
  price: 2500000,
  type: PropertyTypeEnum.Apartment,
  floor: 3,
};

const home3: Property = {
  imageUrl: `${assetsFolder}/home3.jpg`,
  title: "דירה לזוג בגני שרונה",
  address: "לסקוב 6",
  city: "תל אביב",
  bedrooms: 2,
  numParkings: 0,
  type: PropertyTypeEnum.Apartment,
  floor: 1,
  price: 2500000,
};

const home4: Property = {
  imageUrl: `${assetsFolder}/home4.jpg`,
  title: "דירת גן מטופחת",
  address: "הרצל 2",
  city: "תל אביב",
  bedrooms: 5,
  numParkings: 3,
  type: PropertyTypeEnum.Apartment,
  floor: 5,
  price: 5500000,
};

const home5: Property = {
  imageUrl: `${assetsFolder}/home5.jpg`,
  title: "דירת 3 חדרים עם מרפסת",
  address: "הרצליה 5",
  city: "תל אביב",
  bedrooms: 3,
  numParkings: 1,
  price: 1800000,
  type: PropertyTypeEnum.Apartment,
  floor: 2,
};

const home6: Property = {
  imageUrl: `${assetsFolder}/home6.jpg`,
  title: "דירת פנטהאוז עם נוף לים",
  address: "הים התיכון 10",
  city: "תל אביב",
  bedrooms: 4,
  numParkings: 2,
  price: 4000000,
  type: PropertyTypeEnum.Apartment,
  floor: 10,
};

const home7: Property = {
  imageUrl: `${assetsFolder}/home7.jpg`,
  title: "דירת גן עם בריכה",
  address: "הרצליה 20",
  city: "תל אביב",
  bedrooms: 5,
  numParkings: 3,
  price: 6000000,
  type: PropertyTypeEnum.Apartment,
  floor: 1,
};

const home8: Property = {
  imageUrl: `${assetsFolder}/home8.jpg`,
  title: "דירת סטודיו מעוצבת",
  address: "דיזינגוף 15",
  city: "תל אביב",
  bedrooms: 1,
  price: 1200000,
  type: PropertyTypeEnum.Apartment,
  floor: 4,
};

const home9: Property = {
  imageUrl: `${assetsFolder}/home9.jpg`,
  title: "דירת גן עם חצר גדולה",
  address: "הרצליה 30",
  city: "תל אביב",
  bedrooms: 3,
  numParkings: 2,
  price: 3500000,
  type: PropertyTypeEnum.Apartment,
  floor: 1,
};

const home10: Property = {
  imageUrl: `${assetsFolder}/home10.jpg`,
  title: "דירת 5 חדרים עם נוף לים",
  address: "הים התיכון 5",
  city: "תל אביב",
  bedrooms: 5,
  numParkings: 2,
  price: 5000000,
  type: PropertyTypeEnum.Apartment,
  floor: 8,
};

const home11: Property = {
  imageUrl: `${assetsFolder}/home11.jpg`,
  title: "דירת גן מרווחת",
  address: "הרצליה 40",
  city: "תל אביב",
  bedrooms: 4,
  numParkings: 1,
  price: 2800000,
  type: PropertyTypeEnum.Apartment,
  floor: 2,
};

const home12: Property = {
  imageUrl: `${assetsFolder}/home12.jpg`,
  title: "דירת פנטהאוז עם מרפסת גדולה",
  address: "הים התיכון 15",
  city: "תל אביב",
  bedrooms: 3,
  numParkings: 1,
  price: 3800000,
  type: PropertyTypeEnum.Apartment,
  floor: 12,
};

const home13: Property = {
  imageUrl: `${assetsFolder}/home13.jpg`,
  title: "דירת סטודיו עם נוף לפארק",
  address: "דיזינגוף 20",
  city: "תל אביב",
  bedrooms: 1,
  price: 1500000,
  type: PropertyTypeEnum.Apartment,
  floor: 3,
};

const home14: Property = {
  imageUrl: `${assetsFolder}/home14.jpg`,
  title: "דירת גן עם חצר פרטית",
  address: "הרצליה 50",
  city: "תל אביב",
  bedrooms: 4,
  numParkings: 2,
  price: 4200000,
  type: PropertyTypeEnum.Apartment,
  floor: 1,
};

const home15: Property = {
  imageUrl: `${assetsFolder}/home15.jpg`,
  title: "דירת 2 חדרים עם מרפסת",
  address: "הים התיכון 20",
  city: "תל אביב",
  bedrooms: 2,
  numParkings: 1,
  price: 2200000,
  type: PropertyTypeEnum.Apartment,
  floor: 5,
};

export const homes = [
  home1,
  home2,
  home3,
  home4,
  home5,
  home6,
  home7,
  home8,
  home9,
  home10,
  home11,
  home12,
  home13,
  home14,
  home15,
];
