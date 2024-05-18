import { ReportMongoose } from "./report.js";
import { Report } from "../../types/report-types";

export const reportStore = {
    async find() {
        const reports = await ReportMongoose.find().populate("reporter").populate("category").lean();
        return reports;
    },
    async findBy(id: string) {
        const report = await ReportMongoose.findOne({ category: id });
        if (!report) {
            return null;
        }
        return report;
    },
    async add(report: Report) {
        console.log("adding");
        let newReport = new ReportMongoose({ ...report });
        console.log("added donation:", newReport);
        await newReport.save();
        console.log("saved");
        return newReport;
    },
    async delete() {
        await ReportMongoose.deleteMany({});
    },
    async findOne(id: string) {
        const report = await ReportMongoose.findOne({ _id: id });
        if (!report) {
            return null;
        }
        return report;
    },

    async update(id: string, imageURL: string): Promise<Report | null> {
        console.log('id:', id); // Debugging line
        console.log('imageURL:', imageURL); // Debugging line
        const updatedReport = await ReportMongoose.findOneAndUpdate({ _id: id }, { imageURL }, { new: true });
        console.log('updatedReport:', updatedReport); // Debugging line
        if (!updatedReport) {
            return null;
        }
        return updatedReport;
    },
};
