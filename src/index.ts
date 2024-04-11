import { error } from "console";
import mongoose from "mongoose";
import { main } from "./app";

mongoose
    .connect(process.env.DATABASE_URL!)
    .then(async () => {
        console.clear()
        console.log("database connected.");
        await main();
    })
    .catch((error) => {
        console.log(error);
    });
