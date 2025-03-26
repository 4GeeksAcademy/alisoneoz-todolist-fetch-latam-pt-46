import React, { useState } from "react";

//create your first component
const Home = () => {
	const [newTask, setNewTask] = useState("");
	const [tasks, setTasks] = useState([]);



	return (
		<div className="container-fluid bg-danger-subtle" style={{ height: "100vh" }}>
			<div className="mx-auto pt-5" style={{ width: "50%" }}>
				<h1>To Do list</h1>
				<form onSubmit={(event) => {

					event.preventDefault();
					setTasks([newTask, ...tasks]);
					setNewTask("")

				}}>
					<div className="input-group mb-3">
						<input onChange={(e) => setNewTask(e.target.value)} value={newTask} type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
					</div>

				</form>

				<div>
					<h2>Task list:</h2>
					<ul className="list-group">
						{tasks.map((task, index) => {
							return (
								<li key={index} className="list-group-item d-flex justify-content-between">
									{task}
									<button type="button" className="btn btn-light"
										onClick={() => setTasks(tasks.filter((task, indexFilter) => indexFilter != index))}
									>❌</button>
								</li>)
						})}

					</ul>
				</div>
			</div>

		</div>
	);
};

export default Home;