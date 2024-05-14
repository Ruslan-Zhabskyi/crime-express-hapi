import * as dotenv from "dotenv";
import Mongoose from "mongoose";
// @ts-ignore
import * as mongooseSeeder from "mais-mongoose-seeder";
import { userStore } from "./user-store.js";
import { seedData } from "./seed-data.js";
import { reportStore } from "./report-store.js";
import { categoryStore } from "./category-store.js";
import bcrypt from 'bcrypt';

const seedLib = mongooseSeeder.default;
async function seed() {
    const seeder = seedLib(Mongoose);
    for (let userKey in seedData.users) {
        if (seedData.users.hasOwnProperty(userKey)) {
            let user = seedData.users[userKey];
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
    const dbData = await seeder.seed(seedData, { dropDatabase: false, dropCollections: true });
    console.log(dbData);
}
export function connectMongo(db) {
    dotenv.config();
    Mongoose.set("strictQuery", true);
    Mongoose.connect(process.env.db);
    const mongoDb = Mongoose.connection;
    db.userStore = userStore;
    db.categoryStore = categoryStore;
    db.reportStore = reportStore;
    mongoDb.on("error", (err) => {
        console.log(`database connection error: ${err}`);
    });
    mongoDb.on("disconnected", () => {
        console.log("database disconnected");
    });
    mongoDb.once("open", function () {
        console.log(`database connected to ${mongoDb.name} on ${mongoDb.host}`);
        seed();
    });
}
