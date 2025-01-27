import mongoose, { Schema, model } from "mongoose";

const teamSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
	members: [{ type: mongoose.Schema.ObjectId, ref: "member" }],
});

export default model("team", teamSchema);
