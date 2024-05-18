import { categoriesApi } from "./api/categories-api.js";
import { reportsApi } from "./api/reports-api.js";
import { userApi } from "./api/users-api.js";

export const apiRoutes = [
  { method: "GET" as const, path: "/api/users", config: userApi.find },
  { method: "POST" as const, path: "/api/users", config: userApi.create },
  { method: "DELETE" as const, path: "/api/users", config: userApi.deleteAll },
  { method: "GET" as const, path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST" as const, path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET" as const, path: "/api/categories", config: categoriesApi.find },
  { method: "GET" as const, path: "/api/categories/{id}", config: categoriesApi.findOne },
  { method: "POST" as const, path: "/api/categories", config: categoriesApi.create },
  { method: "DELETE" as const, path: "/api/categories/{id}", config: categoriesApi.deleteOne },
  { method: "DELETE" as const, path: "/api/categories", config: categoriesApi.deleteAll },

  { method: "GET" as const, path: "/api/reports", config: reportsApi.findAll },
  { method: "GET" as const, path: "/api/categories/{id}/reports", config: reportsApi.findByCategory },
  { method: "POST" as const, path: "/api/categories/{id}/reports", config: reportsApi.makeReport },
  { method: "DELETE" as const, path: "/api/reports", config: reportsApi.deleteAll },
  { method: "GET" as const, path: "/api/reports/{id}", config: reportsApi.findReportById },
  { method: "PUT" as const, path: "/api/reports/image/{id}", config: reportsApi.updateImage },
  { method: "DELETE" as const, path: "/api/reports/image/{id}", config: reportsApi.deleteImage },
];
