import { Schema, model } from "mongoose";
const categorySchema = new Schema({
    categoryName: String,
});
export const CategoryMongoose = model("Category", categorySchema);
