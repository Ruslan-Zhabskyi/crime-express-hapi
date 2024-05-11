import { Category } from "../../types/report-types.js";
import { CategoryMongoose } from "./category.js";

export const categoryStore = {
  async find(): Promise<Category[]> {
    const categories = await CategoryMongoose.find().lean();
    return categories;
  },

  async findOne(id: string): Promise<Category | null> {
    const category = await CategoryMongoose.findOne({ _id: id }).lean();
    return category;
  },

  async findBy(categoryName: string): Promise<Category | null> {
    const category = await CategoryMongoose.findOne({
      categoryName,
    }).lean();
    return category;
  },
};


