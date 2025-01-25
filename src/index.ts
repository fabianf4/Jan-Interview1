import express from "express";
import morgan from "morgan";
import "dotenv/config";

import userRoute from "./routes/user";

const app = express();

const PORT = process.env.port || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use("/user", userRoute);

app.get("/test", (_req, res) => {
	res.send("Hola mundo");
});

app.listen(PORT, () => {
	console.log("Api on");
});
