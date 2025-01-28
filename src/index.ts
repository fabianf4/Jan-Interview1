import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import "./config/mongo";
import populateDB from "./config/populateDB";
("./config/populateDB");

import memberRoute from "./routes/member";
import projectRouter from "./routes/project";
import teamRouter from "./routes/team";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/member", memberRoute);
app.use("/project", projectRouter);
app.use("/team", teamRouter);

app.get("/test", (_req, res) => {
	res.send("Hola mundo");
});

app.get("/populate", (_req, res) => {
	try {
		populateDB();
		res.status(200).json({
			message: "The database is populating, please wait a seconds....",
		});
	} catch (e) {
		res.status(400).json({
			message: "The database can't populate",
		});
	}
});

app.listen(PORT, () => {
	console.log("Api on");
});
