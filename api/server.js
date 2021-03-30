import express from "express";
import mongoose from "mongoose";
import dbTODO from "./dbTODO.js";
import cors from "cors";

//app Config

const app = express();
const port = process.env.PORT || 9000;
const urlDB =
	"mongodb+srv://admin:Ns94YT30izOlkV74@cluster0.jqmeb.mongodb.net/todo?retryWrites=true&w=majority";

//Middlewares
app.use(express.json());
app.use(cors());
//DB Config

mongoose
	.connect(urlDB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("Connection to db GG");
	});

//api nedpont

app.get("/", (req, res) => {
	res.status(200).send("Hello World");
});

app.get("/todo", (req, res) => {
	dbTODO.find().then((todo) => {
		res.json(todo);
	});
});
app.delete("/todo/:id", (req, res) => {
	dbTODO.findByIdAndDelete(req.params.id).then(() => {
		res.json({ remove: true });
	});
});
app.post("/todo/update", (req, res) => {
	const task = req.body.inputText;
	console.log("req : ", req.body);
	const id = req.body.id;
	console.log("********\n", req);
	dbTODO
		.findOneAndUpdate({ _id: id }, { task })
		.then((doc) => {
			res.json(doc);
		})
		.catch((err) => {
			console.error(err);
		});
});
app.post("/todo/add", (req, res) => {
	const task = req.body.inputText;
	const data = new dbTODO({
		task,
		date: new Date(),
	});
	console.log(data);
	data
		.save()
		.then((todo) => {
			res.json(todo);
		})
		.catch((err) => {
			console.log("err : ", err);
		});
});
//Listener
app.listen(port, () => console.log("Port listening...", port));
