import mongoose from "mongoose";

const todoShema = mongoose.Schema({
	task: String,
	date: Date,
});

export default mongoose.model("todo", todoShema);
