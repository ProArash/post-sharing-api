import swaggerAutogen from "swagger-autogen";
import fs from "fs";

export const swaggerGenerator = async () => {
    const doc = {
        info: {
            title: "Post sharing",
            description: "API document",
        },
        host: "localhost:3000",
    };
    const outFile = "./swagger-output.json";
    const routes = ["./routers/index.ts"];
    if (fs.existsSync(outFile)) fs.unlinkSync(outFile);
    await swaggerAutogen({ openapi: "3.0.0" })(outFile, routes, doc);
};
