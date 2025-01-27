import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export default function (schema: AnyZodObject) {
	return function (req: Request, res: Response, next: NextFunction) {
		try {
			schema.parse({
				body: req.body,
				params: req.params,
			});
			next();
		} catch (e) {
			if (e instanceof ZodError) {
				res.status(400).json({
					error: e.issues.map((info) => info.message),
				});
			}
			res.status(500).json();
		}
	};
}
