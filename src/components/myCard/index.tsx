import "./myCard.css";

interface Props {
	children: React.ReactNode;
	img: string;
	title: string;
}

export default function MyCard({ img, title, children }: Props) {
	return (
		<>
			<div className="card">
				<img className="card-img" src={img}></img>
				<h2 className="card-title">{title}</h2>
				<hr />
				{children}
			</div>
		</>
	);
}
