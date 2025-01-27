import { z } from "zod";

export const addProject = z.object({
	body: z.object({
		name: z.string().nonempty(),
	}),
});

export const deleteProject = z.object({
	params: z.object({
		id: z
			.string()
			.trim()
			.nonempty()
			.length(24, "Id must contain exactly 24 characters")
			.regex(/^[a-fA-F0-9]{24}$/, "The id is not valid"),
	}),
});
