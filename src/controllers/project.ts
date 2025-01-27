import { Request, Response } from "express";
import projectModel from "../models/mongo/project";

export async function getProjects(_req: Request, res: Response) {
	try {
		const projects = await projectModel.find();
		res.status(200).json({
			projects,
		});
	} catch (e) {
		res.status(404).json();
	}
}

export async function addProject(req: Request, res: Response) {
	try {
		const { name } = req.body;
		const newProject = await projectModel.create({
			name,
		});

		res.status(201).json({
			project: newProject,
		});
	} catch (e) {
		res.status(400).json();
	}
}

export async function deleteProject(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const projectDel = await projectModel.deleteOne({ _id: id });
		res.status(200).json({
			project: projectDel,
		});
	} catch (e) {
		res.status(404).json();
	}
}
