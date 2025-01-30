import { useState, useEffect } from "react";
import MyButton from "../components/myButton";
import MyModal from "../components/myModal";
import { useField, useToggle } from "../hooks";
import Member from "../schemas/members";
import "./teams.css";
import { ShowTeams } from "../components/showTeams";

interface Props {
	change: () => void;
}
export default function Teams({ change }: Props) {
	const API_URL = import.meta.env.VITE_API_URL;

	const [openModal, toggleModal] = useToggle();
	const teamName = useField("text");
	const [teamMembers, setTeamMembers] = useState<string[]>([]);
	const [members, setMembers] = useState([]);
	const [update, setUpdate] = useState(true);

	useEffect(() => {
		if (openModal) {
			fetch(API_URL + "/member")
				.then((res) => res.json())
				.then((data) => setMembers(data.members));
		}
	}, [openModal]);

	function handleSubmit(e: any) {
		e.preventDefault();

		if (teamName.value == "") {
			alert("The team name is required");
			return;
		}
		fetch(API_URL + "/team", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: teamName.value,
				members: teamMembers,
			}),
		})
			.then(async (response) => {
				if (response.status != 201) {
					const error = await response.json();
					alert(error.message);
				} else {
					setUpdate(!update);
					alert("Team was added");
				}
			})
			.catch((e) => console.log(e));
	}
	/*
	function handleDeleteTeam(id: string) {
		fetch(API_URL + "/team/" + id, {
			method: "delete",
		}).then(async (res) => {
			if (res.status == 200) {
				alert("Teams was deleted");
				setUpdate(!update);
			} else {
				alert("An error has occurred, your team wasn't delete");
			}
		});
	}*/
	return (
		<>
			<div className="container">
				<h2 className="title">Your teams:</h2>
				<div className="buttons-container">
					<MyButton onClick={change}>Go to teams</MyButton>
					<MyButton onClick={toggleModal}>Add team</MyButton>
				</div>

				<MyModal isOpen={openModal} toggleOpen={toggleModal}>
					<form onSubmit={handleSubmit}>
						<h3>Add team:</h3>
						<div className="form-item">
							<label htmlFor="name">Name</label>
							<br />
							<input {...teamName} />
						</div>
						<br />

						<div className="form-item">
							<label htmlFor="projects">
								Select the members:
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
									setTeamMembers(values);
								}}
							>
								{members.map((e: Member) => (
									<option key={e._id} value={e._id}>
										{e.name}
									</option>
								))}
							</select>
						</div>
						<MyButton type="submit">Add</MyButton>
					</form>
				</MyModal>

				<div className="teams-container">
					<ShowTeams update={update} />
				</div>
			</div>
		</>
	);
}
