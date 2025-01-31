import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Member, { bodyMember } from "../../schemas/members";
import TableRow from "../tableRow";
import "./showMembers.css";

interface Props {
	update: boolean;
}
export default function ShowMembers({ update }: Props) {
	const API_URL = import.meta.env.VITE_API_URL;

	const [
		dataGetMembers,
		errorGetMembers,
		loadingGetMembers,
		fetchGetMembers,
	] = useFetch<bodyMember>({ url: API_URL });

	useEffect(() => {
		fetchGetMembers({ path: "/member" });
	}, [update]);

	if (loadingGetMembers) return <>loading...</>;

	if (errorGetMembers)
		return <>Something went wrong: {errorGetMembers.message}</>;

	if (dataGetMembers) {
		return (
			<>
				<table className="table">
					<thead>
						<tr>
							<th>Member</th>
							<th>Role</th>
							<th>Projects Availability</th>
						</tr>
					</thead>

					<tbody>
						{dataGetMembers?.members.map((e: Member) => (
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
			</>
		);
	}
}
