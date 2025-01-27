import { z } from "zod";
import { role, gender } from "../models/mongo/member";

export const findMember = z.object({
	params: z.object({
		id: z
			.string()
			.trim()
			.length(24, "Id must contain exactly 24 characters")
			.regex(/^[a-fA-F0-9]{24}$/, "The id is not valid")
			.nonempty(),
	}),
});

export const addMember = z.object({
	body: z.object({
		name: z
			.string()
			.min(3, "Name is too short")
			.nonempty("Name is required"),
		urlImage: z.string().nonempty("Image is required"),
		gender: z.enum([gender.Male, gender.Female]),
		role: z.enum([
			role.ProjectLeader,
			role.EngineeringArchitect,
			role.AccountManager,
		]),
		projects: z.array(
			z
				.string()
				.nonempty()
				.length(24, "Id must contain exactly 24 characters")
				.regex(/^[a-fA-F0-9]{24}$/, "The id is not valid")
		),
	}),
});
