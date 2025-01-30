import { useEffect } from "react";
import { useFetch, useToggle } from "../../hooks";
import Team, { bodyTeam } from "../../schemas/team";
import MyButton from "../myButton";
import MyCard from "../myCard";
import MyModal from "../myModal";
import "./showTeams.css";

const API_URL = import.meta.env.VITE_API_URL;

interface Props {
	update: boolean;
}

export function ShowTeams({ update }: Props) {
	const [isModalDeleteOpen, toggleModalDeleteOpen] = useToggle();
	const [dataGetTeams, errorGetTeams, loadingTeams, fetchDataTeams] =
		useFetch<bodyTeam>({
			url: API_URL,
		});

	const [
		dataDeleteTeam,
		errorDeleteTeam,
		loadingDeleteTeam,
		fetchDeleteTeam,
	] = useFetch({
		url: API_URL,
	});

	useEffect(() => {
		fetchDataTeams({ path: "/team" });
	}, [dataDeleteTeam, update]);

	function handleDeleteTeam(id: string) {
		toggleModalDeleteOpen();

		fetchDeleteTeam({
			path: "/team/" + id,
			options: {
				method: "DELETE",
			},
		});
	}

	if (loadingTeams) {
		return <>Loading...</>;
	}

	if (errorGetTeams) {
		return <>Something went wrong: {errorGetTeams.message}</>;
	}

	if (dataGetTeams) {
		return (
			<>
				{dataGetTeams.teams.map((e: Team) => (
					<MyCard
						key={e._id}
						img="https://thumbs.dreamstime.com/b/black-white-icon-depicting-three-people-connected-triangular-network-vector-illustration-328348414.jpg"
						title={e.name}
					>
						<div className="member-container">
							{e.members.map((member) => (
								<div key={member._id} className="member-item">
									<img
										src={member.urlImage}
										alt={"Profile image of " + member.name}
									/>
									<p>{member.name}</p>
								</div>
							))}
						</div>

						<MyButton onClick={() => handleDeleteTeam(e._id)}>
							Delete
						</MyButton>
					</MyCard>
				))}

				<MyModal
					isOpen={isModalDeleteOpen}
					toggleOpen={toggleModalDeleteOpen}
				>
					{loadingDeleteTeam ? (
						<h3>Deleting....</h3>
					) : errorDeleteTeam ? (
						<h3>
							{"Something went wrong: " + errorDeleteTeam.message}
						</h3>
					) : (
						<h3>Team deleted</h3>
					)}
				</MyModal>
			</>
		);
	}
}
