interface Props {
	img: string;
	name: string;
	role: string;
	projects: Array<string>;
}
function TableRow({ img, name, role, projects: projectsName }: Props) {
	return (
		<>
			<tr>
				<td>
					{img}
					{name}
				</td>
				<td>{role}</td>
				<td>
					{projectsName.map((e, i) => (
						<li key={i}>{e}</li>
					))}
				</td>
			</tr>
		</>
	);
}

export default TableRow;
