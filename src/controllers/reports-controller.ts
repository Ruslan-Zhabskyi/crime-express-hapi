import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";

export const reportsController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const categories = await db.categoryStore.find();
      return h.view("report", {
        title: "Submit a Report",
        user: loggedInUser,
        category: categories,
      });
    },
  },
  report: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const loggedInUser = request.auth.credentials;
        const reportPayload = request.payload as any;
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
      } catch (err: any) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
  reports: {
    handler: async function (request: Request, h: ResponseToolkit) {
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
