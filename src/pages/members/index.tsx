import "./members.css";
import ButtonAddProject from "../../components/buttonAddProject";
import MyButton from "../../components/myButton";
import ButtonAddMember from "../../components/buttonAddMember";
import useToggle from "../../hooks/useToggle";
import ShowMembers from "../../components/showMembers";
import ButtonPopulateDB from "../../components/buttonPopulateDB";

interface Props {
	change: () => void;
}

export default function Members({ change }: Props) {
	const [update, toggleUpdate] = useToggle();
	return (
		<>
			<div className="container">
				<h2 className="title">Your members:</h2>
				<div className="buttons-container">
					<MyButton onClick={change}>Go to teams</MyButton>
					<ButtonAddMember toggleUpdate={toggleUpdate} />
					<ButtonAddProject />
					<ButtonPopulateDB toggleUpdate={toggleUpdate} />
				</div>
				<ShowMembers update={update} />
			</div>
		</>
	);
}
