import mongoose from "mongoose";
import Property from "../models/Property.js";
import { Request, Response, NextFunction } from "express";

export const addProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      address,
      city,
      description,
      price,
      imageUrl,
      bedrooms,
      type,
      floor,
      gallery,
      numParkings,
    } = req.body.property;

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

    await property.save();
    res.status(201).json({ message: "Property added successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await Property.findByIdAndDelete(id);
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      title,
      address,
      city,
      description,
      price,
      imageUrl,
      bedrooms,
      type,
      floor,
      gallery,
      numParkings,
    } = req.body;
    const property = await Property.findById(id);
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
    await property.save();
    res.status(200).json({ message: "Property updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const getProperties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const properties = await Property.find();
    res.status(200).json({ properties });
  } catch (error) {
    next(error);
  }
};
