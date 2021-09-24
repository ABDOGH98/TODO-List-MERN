import {
	Button,
	Grid,
	ListItem,
	ListItemText,
	TextField,
} from "@material-ui/core";
import axios from "./axios";

import React, { useState } from "react";
import "./inputTODO.css";

function ListTODO(props) {
	const [inputText, setinputText] = useState(props.listTODO.task);
	const [inputState, setInputState] = useState(false);

	const handleInputText = (e) => {
		setinputText(e.target.value);
	};
	const handelCancel = () => {
		setInputState(false);
	};
	const handleItem = (e) => {
		setinputText(e.task);
		console.log(e);
		setInputState(true);
	};
	const handelDelete = (id) => {
		props.onDelete(id);
	};
	const handelChange = (id) => {
		axios.post("/todo/update", { id, inputText }).then((todo) => {
			props.onEdit({ id, inputText });
			handelCancel();
			console.log("todo C : ", todo);
		});
	};

	return (
		<Grid container key={props.listTODO._id}>
			<Grid item md={3}></Grid>
			<Grid item sm={12} md={6} xs={12} className="listTODO__item">
				<ListItem className="listTODO__itemText">
					{!inputState ? (
						<>
							<Grid item md={10} sm={10} xs={10}>
								<ListItemText
									onClick={() => handleItem(props.listTODO)}
									primary={props.listTODO.task}
								/>
							</Grid>
							<Grid item md={2} sm={2} xs={2}>
								<Button
									onClick={() => handelDelete(props.listTODO._id)}
									variant="contained"
									color="secondary"
								>
									Delete
								</Button>
							</Grid>
						</>
					) : (
						<>
							<TextField
								id="outlined-basic"
								label="Edit your TODO"
								variant="outlined"
								multiline
								onChange={handleInputText}
								value={inputText}
								name="inputText"
								fullWidth
								autoFocus
							/>
							<Button
								onClick={() => handelChange(props.listTODO._id)}
								variant="contained"
								color="primary"
							>
								Change
							</Button>
							<Button
								onClick={handelCancel}
								variant="contained"
								color="secondary"
							>
								Cancel
							</Button>
						</>
					)}
				</ListItem>
			</Grid>
		</Grid>
	);
}

export default ListTODO;
