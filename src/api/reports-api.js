import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import dotenv from "dotenv";
import axios from "axios";

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
            const apiKey = process.env.apiKey;
            const lat = reportPayload.lat;
            const lng = reportPayload.lng;
            const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;
            const result = await axios.get(requestUrl);
            let temperature;
            let code;
            let windSpeed;
            let pressure;
            let windDirection;
            let timestamp;
            let imageURL = "";
            if (result.status == 200) {
                const reading = result.data.current;
                temperature = reading.temp;
                code = reading.weather[0].id;
                windSpeed = reading.wind_speed;
                pressure = reading.pressure;
                windDirection = reading.wind_deg;
                timestamp = new Date().toLocaleString();}
            const report = {
                reportName: reportPayload.reportName,
                description: reportPayload.description,
                reporter: request.auth.credentials._id,
                category: category,
                lat: lat,
                lng: lng,
                temperature: temperature,
                code: code,
                windSpeed: windSpeed,
                pressure: pressure,
                windDirection: windDirection,
                timestamp: timestamp,
                imageURL: imageURL,
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

    findReportById: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const report = (await db.reportStore.findOne(request.params.id));
                if (!report) {
                    return Boom.notFound("No Report with this id");
                }
                return h.response(report).code(200);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

    updateImage: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            console.log('request.params.id:', request.params.id); // Debugging line
            console.log('request.payload:', request.payload); // Debugging line
            const report = await db.reportStore.findOne(request.params.id);
            console.log('report:', report); // Debugging line
            if (report === null) {
                return Boom.notFound("No report with this id");
            }
            const imageUrl = request.payload.imageUrl;
            console.log('imageUrl:', imageUrl); // Debugging line
            if (!imageUrl) {
                return Boom.badRequest("No imageUrl in request payload");
            }
            const updatedReport = await db.reportStore.update(report._id, imageUrl);
            console.log('updatedReport:', updatedReport); // Debugging line
            return h.response(updatedReport).code(200);
        },
    },
    deleteImage: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            console.log('request.params.id:', request.params.id); // Debugging line
            const report = await db.reportStore.findOne(request.params.id);
            console.log('report:', report); // Debugging line
            if (!report) {
                return Boom.notFound("No report with this id");
            }
            report.imageUrl = null;
            const updatedReport = await db.reportStore.deleteImage(report.id);
            console.log('updatedReport:', updatedReport); // Debugging line
            return h.response(updatedReport).code(200);
        },
    },
};
