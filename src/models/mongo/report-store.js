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

    async update(id, imageURL) {
        console.log('id:', id); // Debugging line
        console.log('imageURL:', imageURL); // Debugging line
        const updatedReport = await ReportMongoose.findOneAndUpdate({ _id: id }, { imageURL }, { new: true }).lean();
        console.log('updatedReport:', updatedReport); // Debugging line
        if (!updatedReport) {
            return null;
        }
        return updatedReport;
    },

    async deleteImage(id) {
        console.log('id:', id); // Debugging line
        const updatedReport = await ReportMongoose.findOneAndUpdate({ _id: id }, { imageURL: "" }, { new: true }).lean();
        console.log('updatedReport:', updatedReport); // Debugging line
        if (!updatedReport) {
            return null;
        }
        return updatedReport;
    },

};
