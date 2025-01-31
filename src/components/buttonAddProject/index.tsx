import useFetch from "../../hooks/useFetch";
import useField from "../../hooks/useField";
import useToggle from "../../hooks/useToggle";
import MyButton from "../myButton";
import MyModal from "../myModal";

export default function ButtonAddProject() {
	const API_URL = import.meta.env.VITE_API_URL;

	const [isModalAddOpen, toggleModalAddOpen] = useToggle();
	const [isModalInfoOpen, toggleModalInfoOpen] = useToggle();
	const projectName = useField("text");

	const [
		_dataAddProject,
		errorAddProject,
		loadingAddProject,
		fetchAddProject,
	] = useFetch({ url: API_URL });

	function handleSubmitProject(e: any) {
		e.preventDefault();
		if (projectName.value == "") {
			alert("Name is require");
			return;
		}
		toggleModalAddOpen();
		toggleModalInfoOpen();
		fetchAddProject({
			path: "/project",
			options: {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: projectName.value,
				}),
			},
		});
	}

	return (
		<>
			<MyButton onClick={() => toggleModalAddOpen()}>
				Add project
			</MyButton>
			<MyModal isOpen={isModalAddOpen} toggleOpen={toggleModalAddOpen}>
				<h3>Add project:</h3>
				<form onSubmit={handleSubmitProject}>
					<div>
						<label htmlFor="projectName">Name:</label>
						<br />
						<input id="projectName" {...projectName} />
					</div>
					<MyButton type="submit">Add</MyButton>
				</form>
			</MyModal>
			<MyModal isOpen={isModalInfoOpen} toggleOpen={toggleModalInfoOpen}>
				{loadingAddProject
					? "Loanding..."
					: errorAddProject
					? "Something went wrong: " + errorAddProject.message
					: "Project was added"}
			</MyModal>
		</>
	);
}
