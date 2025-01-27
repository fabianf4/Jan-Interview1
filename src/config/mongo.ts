import mongoose from "mongoose";
import "dotenv/config";

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DATABASE = process.env.MONGO_DATABASE;
const MONGO_HOST = process.env.MONGO_HOST;

mongoose
	.connect(
		`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?authSource=admin`
	)
	.then(() => console.log("Connect to mongo"))
	.catch((e) => console.log(e));
