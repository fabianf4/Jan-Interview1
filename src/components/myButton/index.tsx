import "./button.css";

interface Props {
	children: string;
	onClick?: () => void;
	type?: "button" | "submit";
}

export default function MyButton({
	children,
	onClick,
	type = "button",
}: Props) {
	return (
		<>
			<button type={type} onClick={onClick} className="button">
				{children}
			</button>
		</>
	);
}
