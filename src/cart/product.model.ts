import mongoose, { Schema, Document } from "mongoose";

export interface ProductDocument extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
});

const ProductModel = mongoose.model<ProductDocument>("Product", ProductSchema);
export default ProductModel;