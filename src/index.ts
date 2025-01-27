import express from "express";
import morgan from "morgan";
import "dotenv/config";
import "./config/mongo";

import memberRoute from "./routes/member";
import projectRouter from "./routes/project";
import teamRouter from "./routes/team";

const app = express();

const PORT = process.env.port || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use("/member", memberRoute);
app.use("/project", projectRouter);
app.use("/team", teamRouter);

app.get("/test", (_req, res) => {
	res.send("Hola mundo");
});

app.listen(PORT, () => {
	console.log("Api on");
});
