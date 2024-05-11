import { db } from "../models/db.js";
export const reportsController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const categories = await db.categoryStore.find();
            return h.view("report", {
                title: "Submit a Report",
                user: loggedInUser,
                categories: categories,
            });
        },
    },
    report: {
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const reportPayload = request.payload;
                const report = {
                    reportName: reportPayload.reportName,
                    description: reportPayload.description,
                    reporter: loggedInUser._id,
                    category: reportPayload.category,
                    lat: reportPayload.lat,
                    lng: reportPayload.lng,
                };
                await db.reportStore.add(report);
                return h.redirect("/report");
            }
            catch (err) {
                return h.view("main", { errors: [{ message: err.message }] });
            }
        },
    },
    reports: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const reports = await db.reportStore.find();
            return h.view("reports", {
                title: "Reports",
                user: loggedInUser,
                reports: reports,
            });
        },
    },
};
