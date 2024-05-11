import { categoriesApi } from "./api/categories-api.js";
import { reportsApi } from "./api/reports-api.js";
import { userApi } from "./api/users-api.js";
export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
    { method: "GET", path: "/api/categories", config: categoriesApi.find },
    { method: "GET", path: "/api/categories/{id}", config: categoriesApi.findOne },
    { method: "POST", path: "/api/categories", config: categoriesApi.create },
    { method: "DELETE", path: "/api/categories/{id}", config: categoriesApi.deleteOne },
    { method: "DELETE", path: "/api/categories", config: categoriesApi.deleteAll },
    { method: "GET", path: "/api/reports", config: reportsApi.findAll },
    { method: "GET", path: "/api/categories/{id}/reports", config: reportsApi.findByCategory },
    { method: "POST", path: "/api/categories/{id}/reports", config: reportsApi.makeReport },
    { method: "DELETE", path: "/api/reports", config: reportsApi.deleteAll },
];
