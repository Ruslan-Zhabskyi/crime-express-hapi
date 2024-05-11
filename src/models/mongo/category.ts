import { Schema, model } from "mongoose";
import { Category } from "../../types/report-types";

const categorySchema = new Schema<Category>({
  categoryName: String,
});

export const CategoryMongoose = model("Category", categorySchema);

