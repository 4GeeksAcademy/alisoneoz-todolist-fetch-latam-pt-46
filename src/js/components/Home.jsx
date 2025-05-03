import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	
	const [newTask, setNewTask] = useState("");
	const [tasks, setTasks] = useState([]);

	const BASE_URL = "https://playground.4geeks.com/todo"

	const createUser = async () => {
		try {
			const response = await fetch(BASE_URL + "/users/alisoneoz", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
			})
		} catch (error) {
			console.log("error:", error)
		}
	}

	const getTasks = async () => {

		try {
			const response = await fetch(BASE_URL + "/users/alisoneoz", {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			const body = await response.json();
			setTasks(body.todos)
		} catch (error) {
			console.log("error: ", error)
		}
	}

	// const sendTask = async () => {
	// 	try {
	// 		const response = await fetch(BASE_URL + "/todos/alisoneoz", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json"
	// 			},
	// 			body: {
	// 				label: newTask,
	// 				is_done: false
	// 			}
	// 		},
	// 			console.log("este  es la responsee -->", response)
	// 		)
	// 	} catch (error) {
	// 		console.log("error: ", error)
	// 	}

	// }

	const enviarTarea = async ()=>{
		try{
			const response = await fetch( "https://playground.4geeks.com/todo/todos/alisoneoz", {
				method: "POST",
				body: JSON.stringify(
					{
						label:newTask,
						is_done:false
					}
				),
				headers:{
					"Content-Type":"application/json",
				}
			});
			if (!response.ok){
				throw Error(response.statusText)
			}
			const transform = await response.json()
			console.log(transform.msg);
			return transform
		}catch(error){
			console.log("error", error)
		}
	}

	const deleteTask = async (id) => {
		try {
			const response = await fetch(BASE_URL + "/todos" + `/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(
					{
						label: newTask,
						is_done: false
					}
				)
			})
		} catch (error) {
			console.log("error: ", error)
		}
	}

	useEffect(() => {
		createUser();
		getTasks();
	}, [])

	return (
		<div className="container-fluid bg-danger-subtle" style={{ height: "100vh" }}>
			<div className="mx-auto pt-5" style={{ width: "50%" }}>
				<h1>To Do list</h1>
				<form onSubmit={(event) => {
					event.preventDefault();
					if(newTask.trim().length > 0){event.preventDefault();
					setTasks([newTask, ...tasks]);
					enviarTarea();
					setNewTask("")}
					else{
						alert("no estes enviando taread vacías,😠 escribe algo antes de enviar por favor")
					}

				}}>
					<div className="input-group mb-3">

						<input onChange={(e) => setNewTask(e.target.value)} value={newTask} type="text" className="form-control" placeholder="la tarea" aria-label="Username" aria-describedby="basic-addon1" />
					</div>

				</form>

				{console.log(tasks)


				}

				<div>
					<h2>Task list:</h2>
					

						<div>
							<ul className="list-group">
								{tasks.map((task, index) => {
									const { label, id } = task;
									return (
										<li key={index} className="el-elemento list-group-item d-flex justify-content-between">
											{label}
											<button type="button" className="btn btn-light"
												onClick={() => {
													setTasks(tasks.filter((task, indexFilter) => indexFilter != index))
													deleteTask(id)
												}}
											>❌</button>
										</li>)
								})}

							</ul>
						</div>

					

				</div>



			</div>

		</div>
	);
};

export default Home;