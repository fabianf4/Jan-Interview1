import MyButton from "../../components/myButton";
import "./teams.css";
import { ShowTeams } from "../../components/showTeams";
import useToggle from "../../hooks/useToggle";
import ButtonAddTeam from "../../components/buttonAddTeam";

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
					<ButtonAddTeam toggleUpdate={toggleUpdate} />
				</div>

				<div className="teams-container">
					<ShowTeams update={update} />
				</div>
			</div>
		</>
	);
}
