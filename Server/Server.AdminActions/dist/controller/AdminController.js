var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Property from "../models/Property.js";
export const addProperty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, address, city, description, price, imageUrl, bedrooms, type, floor, gallery, numParkings, } = req.body.property;
        const image = imageUrl || gallery.images[0] || "";
        const property = new Property({
            title,
            address,
            city,
            description,
            price,
            imageUrl: image,
            bedrooms,
            type,
            floor,
            gallery,
            numParkings,
        });
        console.log(property);
        yield property.save();
        res.status(201).json({ message: "Property added successfully" });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
export const deleteProperty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Property.findByIdAndDelete(id);
        res.status(200).json({ message: "Property deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
export const updateProperty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, address, city, description, price, imageUrl, bedrooms, type, floor, gallery, numParkings, } = req.body;
        const property = yield Property.findById(id);
        if (!property) {
            throw new Error("Property not found");
        }
        property.title = title;
        property.address = address;
        property.city = city;
        property.description = description;
        property.price = price;
        property.imageUrl = imageUrl;
        property.bedrooms = bedrooms;
        property.type = type;
        property.floor = floor;
        property.gallery = gallery;
        property.numParkings = numParkings;
        yield property.save();
        res.status(200).json({ message: "Property updated successfully" });
    }
    catch (error) {
        next(error);
    }
});
export const getProperties = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const properties = yield Property.find();
        res.status(200).json({ properties });
    }
    catch (error) {
        next(error);
    }
});
