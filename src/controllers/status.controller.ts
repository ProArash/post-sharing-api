import { Request, Response } from "express";

export const statusController = {
    checkStatus: async (req: Request, res: Response) => {
        try {
            res.status(200).json({
                data: "server is online.",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                data: "Internal error.",
            });
        }
    },
};
