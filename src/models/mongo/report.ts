import { Schema, model } from "mongoose";
import { Report } from "../../types/report-types";

const reportSchema = new Schema<Report>({
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
});

export const ReportMongoose = model("Report", reportSchema);

