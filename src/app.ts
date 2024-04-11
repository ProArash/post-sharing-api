import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import { routes } from "./routers";
import path from "path";
import cors from 'cors'
const app = express();


export async function main() {
    // middleware
    app.use(bodyParser.json());
    app.use(morgan("dev"));
    app.use(cors());

    // routes
    app.use("/", routes);

    app.use(express.static(path.join(__dirname, "public ")));
    //TODO
    // should fix serving static files from express to get profile pics
    //

    app.listen(process.env.PORT, async () => {
        console.log(`server is running on port: ${process.env.PORT}`);
    });
}
