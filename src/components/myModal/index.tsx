import "./myModal.css";

interface Props {
	children: React.ReactNode;
	isOpen: boolean;
	toggleOpen: () => void;
}

export default function MyModal({ children, isOpen, toggleOpen }: Props) {
	return (
		<>
			<div
				className={"modal-back " + (isOpen ? "" : "modal-back--close")}
			>
				<div className="modal-box">
					<div className="modal-close" onClick={() => toggleOpen()}>
						X
					</div>

					{children}
				</div>
			</div>
		</>
	);
}
