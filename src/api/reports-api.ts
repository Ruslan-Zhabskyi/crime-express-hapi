import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { Category, Report } from "../types/report-types";

export const reportsApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const reports = await db.reportStore.find();
        return h.response(reports).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findByCategory: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const reports = (await db.reportStore.findBy(request.params.id)) as Report;
      return h.response(reports).code(200);
    },
  },

  makeReport: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const category = (await db.categoryStore.findOne(request.params.id)) as Category;
      if (category === null) {
        return Boom.notFound("No Category with this id");
      }
      const reportPayload = request.payload as Report;
      const report = {
        reportName: reportPayload.reportName,
        description: reportPayload.description,
        reporter: request.auth.credentials._id,
        category: category,
        lat: reportPayload.lat,
        lng: reportPayload.lng,
      };
      const newReport = (await db.reportStore.add(report)) as Report;
      return h.response(newReport).code(200);
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      console.log("delete...");
      await db.reportStore.delete();
      return h.response().code(204);
    },
  },
};
