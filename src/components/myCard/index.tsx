import Member from "../../schemas/members";
import "./myCard.css";

interface Props {
	children: React.ReactNode;
	img: string;
	title: string;
	members: Member[];
}

export default function MyCard({ img, title, members, children }: Props) {
	return (
		<>
			<div className="card">
				<img className="card-img" src={img}></img>
				<h2 className="card-title">{title}</h2>
				<hr />
				{members.map((element) => (
					<div key={"member" + element._id} className="card-member">
						<img
							className="card-member-img"
							src={element.urlImage}
							alt="Image of member"
						/>
						{element.name}
					</div>
				))}
				{children}
			</div>
		</>
	);
}
