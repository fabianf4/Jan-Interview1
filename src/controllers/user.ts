import { Request, Response } from "express";
import userModel from "../models/mysql/user";

export async function getUser(_req: Request, res: Response) {
	res.send("User");
}

export async function addUser(_req: Request, res: Response) {
	const user = await userModel.create({
		id: "1",
		name: "User1",
	});

	res.send(user);
}
