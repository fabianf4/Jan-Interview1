import { z } from "zod";

export const addTeam = z.object({
	body: z.object({
		name: z.string().nonempty(),
		members: z.array(
			z
				.string()
				.trim()
				.nonempty()
				.length(24, "Id must contain exactly 24 characters")
				.regex(/^[a-fA-F0-9]{24}$/, "The id is not valid")
		),
	}),
});

export const deleteTeam = z.object({
	params: z.object({
		id: z
			.string()
			.trim()
			.nonempty()
			.length(24, "Id must contain exactly 24 characters")
			.regex(/^[a-fA-F0-9]{24}$/, "The id is not valid"),
	}),
});

export const deleteTeams = z.object({
	body: z.object({
		teams: z.array(z.string().trim().nonempty().length(24)),
	}),
});
