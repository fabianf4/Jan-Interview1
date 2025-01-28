import { useEffect, useState } from "react";
import TableRow from "../components/tableRow";
import "./members.css";
import Member from "../schemas/members";
import Project from "../schemas/project";

import MyButton from "../components/myButton";
import MyModal from "../components/myModal";
import useToggle from "../hooks/useToggle";
import useField from "../hooks/useField";

const API_URL = import.meta.env.VITE_API_URL;

interface Props {
	change: () => void;
}

function Members({ change }: Props) {
	const [update, setUpdate] = useState(false);
	const [members, setMembers] = useState([]);
	const [isModal1Open, toggleModal1Open] = useToggle();
	const [isModal2Open, toggleModal2Open] = useToggle();
	const [projects, setProjects] = useState([]);
	const Roles = [
		"Project Leader",
		"Engineering Architect",
		"Account Manager",
	];

	const memberName = useField("text");
	const memberUrlImage = useField("text");
	const [gender, setGender] = useState(true);
	const [memberProjects, setMemberProjects] = useState<string[]>([]);
	const [memberRole, setMemberRole] = useState(Roles[0]);

	const projectName = useField("text");

	useEffect(() => {
		fetch(API_URL + "/member")
			.then((response) => response.json())
			.then((data) => {
				setMembers(data.members);
			});
	}, [update]);

	useEffect(() => {
		if (isModal1Open) {
			fetch(API_URL + "/project")
				.then((response) => response.json())
				.then((data) => setProjects(data.projects));
		}
	}, [isModal1Open]);

	function handleSubmit(e: any) {
		e.preventDefault();

		if (memberName.value == "") {
			alert("Name is require");
		} else {
			let urlImage = "";
			if (memberUrlImage.value == "" && gender) {
				urlImage = `https://randomuser.me/api/portraits/med/men/${
					Math.floor(Math.random() * 99) + 1
				}.jpg`;
			}
			if (memberUrlImage.value == "" && !gender) {
				urlImage = `https://randomuser.me/api/portraits/med/women/${
					Math.floor(Math.random() * 99) + 1
				}.jpg`;
			}

			fetch(API_URL + "/member", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: memberName.value,
					urlImage: urlImage,
					gender: gender ? "Male" : "Female",
					projects: memberProjects,
					role: memberRole,
				}),
			})
				.then(async (response) => {
					if (response.status != 201) {
						const error = await response.json();
						console.log(error);

						alert(error.error);
					} else {
						alert("Member was added");
						setUpdate(!update);
					}
				})
				.catch((e) => console.log(e));
		}
	}

	function handleSubmitProject(e: any) {
		e.preventDefault();
		if (projectName.value == "") {
			alert("Name is require");
			return;
		}
		fetch(API_URL + "/project", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: projectName.value,
			}),
		})
			.then(async (response) => {
				if (response.status != 201) {
					const error = await response.json();
					console.log(error);

					alert(error.error);
				} else {
					alert("Project was added");
				}
			})
			.catch((e) => console.log(e));
	}

	function handlePopulateDb() {
		fetch(API_URL + "/populate")
			.then((res) => {
				if (res.status == 200) {
					alert("The database was populate");
					setUpdate(!update);
				}
			})
			.catch(() => {
				alert("The database wasn't populate");
			});
	}

	return (
		<>
			<div className="container">
				<h2 className="title">Your members:</h2>
				<div className="buttons-container">
					<MyButton onClick={change}>Go to teams</MyButton>
					<MyButton onClick={() => toggleModal1Open()}>
						Add member
					</MyButton>
					<MyButton onClick={() => toggleModal2Open()}>
						Add project
					</MyButton>
					<MyButton onClick={() => handlePopulateDb()}>
						Populate DB
					</MyButton>
				</div>
				<MyModal isOpen={isModal1Open} toggleOpen={toggleModal1Open}>
					<h3>Add Member: </h3>
					<form onSubmit={handleSubmit}>
						<div className="form-item">
							<label htmlFor="name">Name</label>
							<br />
							<input {...memberName} id="name" />
						</div>
						<br />
						<div className="form-item">
							<label htmlFor="urlImage">URL Image</label>
							<br />
							<input {...memberUrlImage} id="urlImage" />
						</div>

						<div className="form-item">
							<p>Choose the gender:</p>
							<input
								type="radio"
								id="Male"
								name="gender"
								value="Male"
								checked={gender}
								onClick={() => setGender(true)}
								readOnly
							/>
							<label htmlFor="Male">Male</label>
							<br />
							<input
								type="radio"
								id="Female"
								name="gender"
								value="Female"
								checked={!gender}
								onClick={() => setGender(false)}
								readOnly
							/>
							<label htmlFor="Female">Female</label>
							<br />
						</div>
						<div className="form-item">
							<p>Choose the role:</p>
							{Roles.map((value) => (
								<div key={value}>
									<input
										type="radio"
										id={value}
										name="role"
										value={value}
										checked={value == memberRole}
										onClick={() => setMemberRole(value)}
										readOnly
									/>
									<label htmlFor={value}>{value}</label>
									<br />
								</div>
							))}
							<br />
						</div>

						<div className="form-item">
							<label htmlFor="projects">
								Select the projects:
							</label>
							<br />
							<select
								name="project"
								id="projects"
								multiple
								onChange={(e) => {
									const values = Array.from(
										e.target.selectedOptions,
										(option) => option.value
									);
									setMemberProjects(values);
								}}
							>
								{projects.map((e: Project) => (
									<option key={e._id} value={e._id}>
										{e.name}
									</option>
								))}
							</select>
						</div>
						<MyButton type="submit">Add</MyButton>
					</form>
				</MyModal>

				<MyModal isOpen={isModal2Open} toggleOpen={toggleModal2Open}>
					<h3>Add project:</h3>
					<form onSubmit={handleSubmitProject}>
						<label htmlFor="projectName">Name:</label>
						<br />
						<input id="projectName" {...projectName} />
						<MyButton type="submit">Add</MyButton>
					</form>
				</MyModal>

				<table className="table">
					<thead>
						<tr>
							<th>Member</th>
							<th>Role</th>
							<th>Projects Availability</th>
						</tr>
					</thead>

					<tbody>
						{members.map((e: Member) => (
							<TableRow
								key={e._id}
								img={e.urlImage}
								role={e.role}
								name={e.name}
								projects={e.projects}
							/>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default Members;
