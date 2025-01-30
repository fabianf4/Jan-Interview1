import { useEffect, useState } from "react";
import { useFetch, useField, useToggle } from "../../hooks";
import MyButton from "../myButton";
import MyModal from "../myModal";
import Member, { bodyMember } from "../../schemas/members";

interface Props {
	toggleUpdate: () => void;
}

export default function AddTeam({ toggleUpdate }: Props) {
	const API_URL = import.meta.env.VITE_API_URL;

	const [_dataAddTeam, errorAddTeam, loadingAddTeam, fetchAddTeam] = useFetch(
		{
			url: API_URL,
		}
	);
	const [dataMembers, errorMembers, loadingMembers, fetchGetMembers] =
		useFetch<bodyMember>({ url: API_URL });

	const [openModalAdd, toggleModalAdd] = useToggle();
	const [openModalInfo, toggleModalInfo] = useToggle();

	const teamName = useField("text");
	const [teamMembers, setTeamMembers] = useState<string[]>([]);

	useEffect(() => {
		fetchGetMembers({ path: "/member" });
	}, [openModalAdd]);

	useEffect(() => {
		if (!loadingAddTeam) {
			toggleUpdate();
		}
	}, [loadingAddTeam]);

	function handleSubmit(e: any) {
		e.preventDefault();

		if (teamName.value == "") {
			alert("The team name is required");
			return;
		}

		toggleModalAdd();
		toggleModalInfo();

		fetchAddTeam({
			path: "/team",
			options: {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: teamName.value,
					members: teamMembers,
				}),
			},
		});
	}

	return (
		<>
			<MyButton onClick={toggleModalAdd}>Add team</MyButton>
			<MyModal isOpen={openModalAdd} toggleOpen={toggleModalAdd}>
				<h3>Add team:</h3>
				<form onSubmit={handleSubmit}>
					<div className="form-item">
						<label htmlFor="name">Name</label>
						<br />
						<input {...teamName} />
					</div>
					<br />

					<div className="form-item">
						<label htmlFor="projects">Select 3 members:</label>
						<br />
						<select
							name="members"
							id="members"
							multiple
							onChange={(e) => {
								const values = Array.from(
									e.target.selectedOptions,
									(option) => option.value
								);
								setTeamMembers(values);
							}}
						>
							{loadingMembers
								? "loading..."
								: errorMembers
								? "Something went wrong " + errorMembers.message
								: dataMembers?.members.map((e: Member) => (
										<option key={e._id} value={e._id}>
											{e.name}
										</option>
								  ))}
						</select>
					</div>
					<MyButton type="submit">Add</MyButton>
				</form>
			</MyModal>
			<MyModal isOpen={openModalInfo} toggleOpen={toggleModalInfo}>
				{loadingAddTeam
					? "Loading..."
					: errorAddTeam
					? "Something went wrong " + errorAddTeam.message
					: "Team was added"}
			</MyModal>
		</>
	);
}
