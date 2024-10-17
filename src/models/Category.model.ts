import { Schema, model } from "mongoose";
import { ICategory } from "../types/category.type";

const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    hasSubCategory: { type: Boolean, default: false },
    parentId: { type: Number, default: null }
})

export default model<ICategory>("Category", categorySchema);