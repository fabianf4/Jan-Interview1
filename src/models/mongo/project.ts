import { Schema, model } from "mongoose";

const projectSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

export default model("project", projectSchema);
