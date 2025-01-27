import mongoose, { Schema, model } from "mongoose";

export enum role {
	ProjectLeader = "Project Leader",
	EngineeringArchitect = "Engineering Architect",
	AccountManager = "Account Manager",
}
export enum gender {
	Male = "Male",
	Female = "Female",
}

const memberSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		urlImage: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			enum: [gender.Male, gender.Female],
			require: true,
		},
		role: {
			type: String,
			enum: [
				role.ProjectLeader,
				role.EngineeringArchitect,
				role.AccountManager,
			],
			require: true,
		},
		projects: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "project",
			},
		],
		team: {
			type: mongoose.Schema.ObjectId,
			ref: "team",
		},
	},
	{
		timestamps: true,
	}
);

export default model("member", memberSchema);
