import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import morgan from "morgan";
import { routes } from "./routers";
import path from "path";
import cors from "cors";
import { swaggerGenerator } from "./swagger";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
const app = express();

export async function main() {
    // middleware
    app.use(bodyParser.json());
    app.use(morgan("dev"));
    app.use(cors());

    // routes
    app.use("/", routes);
    // app.use((req: Request, res: Response) => {
    //     res.status(404).send("page not found");
    // });

    await swaggerGenerator();

    app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(
            JSON.parse(
                fs
                    .readFileSync(path.join(__dirname, "./swagger-output.json"))
                    .toString()
            )
        )
    );

    app.use(express.static(path.join(__dirname, "public/")));
    //TODO
    // should fix serving static files from express to get profile pics
    //

    app.listen(process.env.PORT, async () => {
        console.log(`server is running on port: ${process.env.PORT}`);
    });
}
