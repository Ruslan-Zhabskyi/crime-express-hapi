import { CategoryMongoose } from "./category.js";
export const categoryStore = {
    async find() {
        const categories = await CategoryMongoose.find().lean();
        return categories;
    },
    async findOne(id) {
        const category = await CategoryMongoose.findOne({ _id: id }).lean();
        return category;
    },
    async findBy(categoryName) {
        const category = await CategoryMongoose.findOne({
            categoryName,
        }).lean();
        return category;
    },
};
