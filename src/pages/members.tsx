import { useEffect, useState } from "react";
import TableRow from "../components/tableRow";
import "./members.css";

const API_URL = import.meta.env.VITE_API_URL;

interface Members {
	createdAt: string;
	gender: string;
	name: string;
	projects: Array<string>;
	role: string;
	updatedAt: string;
	urlImage: string;
	__v: number;
	_id: string;
}

function Members() {
	const [members, setMembers] = useState([]);

	useEffect(() => {
		fetch(API_URL + "/member")
			.then((response) => response.json())
			.then((data) => {
				setMembers(data.members);
			});
	}, []);

	useEffect(() => {}, [members]);

	return (
		<>
			<div className="container">
				<h2 className="title">Your members:</h2>
				<table className="table">
					<thead>
						<tr>
							<th>Member</th>
							<th>Role</th>
							<th>Projects Availability</th>
						</tr>
					</thead>

					<tbody>
						{members.map((e: Members) => (
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
