import Project from "../../schemas/project";
import "./tableRow.css";

interface Props {
	img: string;
	name: string;
	role: string;
	projects: Array<Project>;
}
function TableRow({ img, name, role, projects: projectsName }: Props) {
	return (
		<>
			<tr>
				<td>
					<div className="memberContainer">
						<img src={img} alt={"Img of" + name} />
						{name}
					</div>
				</td>
				<td>{role}</td>
				<td>
					{projectsName.map((e, i) => (
						<li key={i}>{e.name}</li>
					))}
				</td>
			</tr>
		</>
	);
}

export default TableRow;
