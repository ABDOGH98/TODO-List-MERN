import { List } from "@material-ui/core";
import axios from "./axios";
import { Fragment, useEffect, useState } from "react";
import InputTODO from "./InputTODO";
import "./inputTODO.css";
import ListTODO from "./ListTODO";

function App() {
	const [todoListe, setTodoListe] = useState([]);

	const handleTODOList = (e) => {
		setTodoListe((todoListe) => [...todoListe, e]);

		console.log(todoListe);
	};
	useEffect(() => {
		axios
			.get("/todo")
			.then((res) => {
				console.log("Data : ", res.data);
				setTodoListe(res.data);
			})
			.catch((err) => {
				console.log("err : ", err);
			});
	}, []);
	const handelDelete = (id) => {
		axios.delete(`/todo/${id}`).then(() => {
			const data = todoListe.filter((todo) => id !== todo._id);
			setTodoListe(data);
			console.log("data : ", data);
		});
	};
	const handleChangeClick = (todo) => {
		let myTODO = todoListe.find((data) => data._id === todo.id);
		todoListe.find((data) => data._id === todo.id).task = todo.inputText;
		console.log("myTodo : ", myTODO);
	};
	return (
		<Fragment>
			<InputTODO onADDClick={handleTODOList} />

			<List dense={false} className="listTODO__list">
				{todoListe.map((todo) => {
					return (
						<ListTODO
							listTODO={todo}
							onDelete={handelDelete}
							onEdit={handleChangeClick}
							className="app__listTODO "
							key={todo._id}
						/>
					);
				})}
			</List>
		</Fragment>
	);
}

export default App;
