import Boom from "@hapi/boom";
import { db } from "../models/db.js";
export const categoriesApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const categories = await db.categoryStore.find();
            return h.response(categories).code(200);
        },
    },
    findOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const category = await db.categoryStore.findOne(request.params.id);
                if (category === null) {
                    return Boom.notFound("No Category with this id");
                }
                return h.response(category).code(200);
            }
            catch (err) {
                return Boom.notFound("No Category with this id");
            }
        },
    },
    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const category = await db.categoryStore.add(request.payload);
            if (category !== null) {
                return h.response(category).code(201);
            }
            return Boom.badImplementation("error creating category");
        },
    },
    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            await db.categoryStore.delete();
            return h.response().code(204);
        },
    },
    deleteOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            await db.categoryStore.deleteOne(request.params.id);
            return h.response().code(204);
        },
    },
};
