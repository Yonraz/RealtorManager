import mongoose from "mongoose";
const PropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
        default: "Apartment",
    },
    gallery: {
        type: Array,
        required: true,
        default: [],
    },
    numParkings: {
        type: Number,
        required: true,
        default: 0,
    },
    rentOrSale: {
        type: String,
        required: true,
        default: "sale",
    },
    floor: {
        type: Number || null,
        required: true,
        default: null,
    },
    description: {
        type: String,
        required: true,
        default: "",
    },
});
export default mongoose.model("Property", PropertySchema);
