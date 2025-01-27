import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Members() {
	useEffect(() => {
		console.log(API_URL);

		fetch(API_URL + "/member")
			.then((response) => response.json())
			.then((data) => console.log(data));
	}, []);

	return (
		<>
			<table>
				<thead>
					<tr>
						<th>Member</th>
						<th>Role</th>
						<th>Projects Availability</th>
					</tr>
				</thead>
			</table>
		</>
	);
}

export default Members;
