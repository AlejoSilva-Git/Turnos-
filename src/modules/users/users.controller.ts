import { Request, Response } from "express";
import { UsersService } from "./users.service";

export class UsersController {

    private _UsersService = new UsersService();

    register = async (req: Request, res: Response) => {

        const result = await this._UsersService.register(req.body);

        res.status(201).json(result)
    }

    findAllUsers = async (req: Request, res: Response) => {

        const result = await this._UsersService.findAllUsers();

        res.status(200).json(result)
    }

}