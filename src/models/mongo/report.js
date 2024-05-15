import { Schema, model } from "mongoose";
const reportSchema = new Schema({
    reportName: String,
    description: String,
    reporter: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    lat: String,
    lng: String,
    temperature: String,
    code: String,
    windSpeed: String,
    pressure: String,
    windDirection: String,
    timestamp: String,
});
export const ReportMongoose = model("Report", reportSchema);
