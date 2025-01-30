import MyButton from "../components/myButton";
import "./teams.css";
import { ShowTeams } from "../components/showTeams";
import { useToggle } from "../hooks";
import AddTeam from "../components/addTeam";

interface Props {
	change: () => void;
}
export default function Teams({ change }: Props) {
	const [update, toggleUpdate] = useToggle();

	return (
		<>
			<div className="container">
				<h2 className="title">Your teams:</h2>
				<div className="buttons-container">
					<MyButton onClick={change}>Go to members</MyButton>
					<AddTeam toggleUpdate={toggleUpdate} />
				</div>

				<div className="teams-container">
					<ShowTeams update={update} />
				</div>
			</div>
		</>
	);
}
