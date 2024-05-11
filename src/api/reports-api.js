import Boom from "@hapi/boom";
import { db } from "../models/db.js";
export const reportsApi = {
    findAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const reports = await db.reportStore.find();
                return h.response(reports).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
    findByCategory: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const reports = (await db.reportStore.findBy(request.params.id));
            return h.response(reports).code(200);
        },
    },
    makeReport: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const category = (await db.categoryStore.findOne(request.params.id));
            if (category === null) {
                return Boom.notFound("No Category with this id");
            }
            const reportPayload = request.payload;
            const report = {
                reportName: reportPayload.reportName,
                description: reportPayload.description,
                reporter: request.auth.credentials._id,
                category: category,
                lat: reportPayload.lat,
                lng: reportPayload.lng,
            };
            const newReport = (await db.reportStore.add(report));
            return h.response(newReport).code(200);
        },
    },
    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            console.log("delete...");
            await db.reportStore.delete();
            return h.response().code(204);
        },
    },
};
