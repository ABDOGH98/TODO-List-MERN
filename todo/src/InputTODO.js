import React, { useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import axios from "./axios";

function InputTODO(props) {
	const [inputText, setInputText] = useState("");

	const handleInputText = (e) => {
		setInputText(e.target.value);
	};
	const handleADD = () => {
		axios.post("/todo/add", { inputText }).then((todo) => {
			props.onADDClick(todo.data);
			console.log("todo : ", todo);
		});
		setInputText("");
	};

	return (
		<form className="inputTODO__form">
			<Grid container>
				<Grid item xs={3}></Grid>
				<Grid item xs={10} md={5}>
					<TextField
						id="outlined-basic"
						label="Enter you TODO Her ..."
						variant="outlined"
						multiline
						onChange={handleInputText}
						value={inputText}
						fullWidth
					/>
				</Grid>
				<Grid item xs={1} sm={1}>
					<Button
						variant="contained"
						color="primary"
						className="inputTODO__btnADD"
						disabled={!inputText}
						onClick={handleADD}
					>
						ADD
					</Button>
				</Grid>
			</Grid>
		</form>
	);
}

export default InputTODO;
