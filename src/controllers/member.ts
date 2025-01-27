import { Request, Response } from "express";
import memberModel from "../models/mongo/member";
import projectModel from "../models/mongo/project";

export async function getMembers(_req: Request, res: Response) {
	try {
		const members = await memberModel
			.find()
			.populate("projects")
			.populate("team");

		res.status(200).json({
			members,
		});
	} catch (e) {
		res.status(404).json();
	}
}

export async function getMember(req: Request, res: Response) {
	try {
		const { id } = req.params;

		const findMember = await memberModel
			.findById(id)
			.populate("projects")
			.populate("team");

		res.status(200).json({
			findMember,
		});
	} catch (e) {
		res.status(404).json();
	}
}

export async function addMember(req: Request, res: Response) {
	try {
		const { name, urlImage, gender, role, projects } = req.body;

		const projectError: Array<String> = [];

		if (projects) {
			for (const id of projects) {
				const projectFind = await projectModel.exists({
					_id: id,
				});

				if (!projectFind) {
					projectError.push(id);
				}
			}

			if (projectError.length != 0) {
				res.status(400).json({
					message: "Projects not found",
					projectError,
				});
				return;
			}
		}

		const newMember = await memberModel.create({
			name,
			urlImage,
			gender,
			role,
			projects,
		});

		res.status(201).json({
			member: newMember,
		});
	} catch (e) {
		res.status(400).json();
	}
}
