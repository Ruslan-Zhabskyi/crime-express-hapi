import { ReportMongoose } from "./report.js";
export const reportStore = {
    async find() {
        const reports = await ReportMongoose.find().populate("reporter").populate("category").lean();
        return reports;
    },
    async findBy(id) {
        const report = await ReportMongoose.findOne({ category: id });
        if (!report) {
            return null;
        }
        return report;
    },
    async add(report) {
        console.log("adding");
        let newReport = new ReportMongoose({ ...report });
        console.log("added report:", newReport);
        await newReport.save();
        console.log("saved");
        return newReport;
    },
    async delete() {
        await ReportMongoose.deleteMany({});
    },

    async findOne(id) {
        const report = await ReportMongoose.findOne({ _id: id }).lean();
        if (!report) {
            return null;
        }
        return report;
    },
};
