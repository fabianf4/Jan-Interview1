import { Request, Response } from "express";
import teamModel from "../models/mongo/team";
import memberModel from "../models/mongo/member";
import mongoose from "mongoose";

export async function getTeams(_req: Request, res: Response) {
	try {
		const teams = await teamModel.find().populate("members");
		res.status(200).json({
			teams,
		});
	} catch (e) {
		res.status(404).json();
	}
}

export async function addTeam(req: Request, res: Response) {
	try {
		const { name, members } = req.body;

		if (members.length != 3) {
			res.status(400).json({
				message: "Too many members",
			});
			return;
		}
		// ------Check if all members exist--------------------------------------------------
		const membersData: any[] = [];
		const membersNotFound = [];

		for (let id of members) {
			const memberFind = await memberModel.findById(id);
			if (memberFind) {
				membersData.push(memberFind);
			} else {
				membersNotFound.push(id);
			}
		}

		if (membersNotFound.length != 0) {
			res.status(400).json({
				message: "Member not found",
				members: membersNotFound,
			});
			return;
		}

		//------Check if all members are in the same group---------------------------

		let sameProject = false;
		membersData[0].projects.forEach((id: mongoose.Types.ObjectId) => {
			if (
				membersData[1].projects.includes(id) &&
				membersData[2].projects.includes(id)
			) {
				sameProject = true;
				return;
			}
		});

		if (!sameProject) {
			res.status(400).json({
				message: "The members must be the same project",
			});
		}

		//------Check if all members role is different--------------
		if (
			!(
				membersData[0].role != membersData[1].role &&
				membersData[0].role != membersData[2].role &&
				membersData[1].role != membersData[2].role
			)
		) {
			res.status(400).json({
				message: "The members role must be different",
			});
		}

		const newTeam = await teamModel.create({
			name,
		});
		res.status(201).json({
			team: newTeam,
		});
	} catch (e) {
		res.status(400).json();
	}
}

export async function deleteTeam(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const delTeam = await teamModel.deleteOne({
			_id: id,
		});
		res.status(200).json({
			team: delTeam,
		});
	} catch (e) {
		res.status(404).json();
	}
}

export async function deleteTeams(req: Request, res: Response) {
	try {
		const { teams } = req.body;
		const delTeams = await teamModel.deleteMany({ _id: { $in: teams } });
		res.status(200).json({
			teams: delTeams,
		});
	} catch (e) {
		res.status(404).json();
	}
}
