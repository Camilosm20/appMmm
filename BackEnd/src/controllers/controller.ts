import { Request, Response } from "express";
import WPService from "../services/wpService";
import { ApiResponse } from "../commons/ApiResponse";

class Controller {

    private wpService: WPService;

    constructor(wpService: WPService) {
        this.wpService = wpService;
    }

    async getAll(req: Request, res: Response) {
        try {
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const list = await this.wpService.getAll(limit);
            let response: ApiResponse = {
                status: "success",
                isSuccess: true,
                data: list
            }
            return res.status(200).json(response);
        } catch (err) {
            let response: ApiResponse = {
                status: "error",
                isSuccess: false,
                error: "ERROR, no hay data"
            }
            return res.status(500).json(response);
        }
    }
}

export default Controller;