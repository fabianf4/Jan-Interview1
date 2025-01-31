import { useEffect, useState } from "react";
import useToggle from "../../hooks/useToggle";
import useField from "../../hooks/useField";
import MyButton from "../myButton";
import MyModal from "../myModal";
import Project, { bodyProject } from "../../schemas/project";
import useFetch from "../../hooks/useFetch";
import { bodyMember, Roles } from "../../schemas/members";

interface Props {
	toggleUpdate: () => void;
}

export default function ButtonAddMember({ toggleUpdate }: Props) {
	const API_URL = import.meta.env.VITE_API_URL;

	const [_dataAddMember, errorAddMember, loadingAddMember, fetchAddMember] =
		useFetch<bodyMember>({ url: API_URL });
	const [
		dataGetProjects,
		_errorGetProjects,
		_loadingGetProjects,
		fetchGetProjects,
	] = useFetch<bodyProject>({ url: API_URL });

	const [isModalInfoOpen, toggleModalInfoOpen] = useToggle();
	const [isModalAddOpen, toggleModalAddOpen] = useToggle();
	const memberName = useField("text");
	const memberUrlImage = useField("text");
	const [gender, setGender] = useState(true);
	const [memberProjects, setMemberProjects] = useState<string[]>([]);
	const [memberRole, setMemberRole] = useState(Roles.ProjectLeader);

	useEffect(() => {
		if (!loadingAddMember) {
			toggleUpdate();
		}
	}, [loadingAddMember]);

	useEffect(() => {
		if (isModalAddOpen) {
			fetchGetProjects({ path: "/project" });
		}
	}, [isModalAddOpen]);

	function getImage(gender: boolean): string {
		const random = Math.floor(Math.random() * 99) + 1;
		if (gender) {
			return `https://randomuser.me/api/portraits/med/men/${random}.jpg`;
		} else {
			return `https://randomuser.me/api/portraits/med/women/${random}.jpg`;
		}
	}

	function handleSubmit(e: any) {
		e.preventDefault();

		if (memberName.value == "") {
			alert("Name is require");
			return;
		}

		toggleModalAddOpen();
		toggleModalInfoOpen();

		fetchAddMember({
			path: "/member",
			options: {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: memberName.value,
					urlImage:
						memberUrlImage.value != ""
							? memberUrlImage.value
							: getImage(gender),
					gender: gender ? "Male" : "Female",
					projects: memberProjects,
					role: memberRole,
				}),
			},
		});
	}

	return (
		<>
			<MyButton onClick={() => toggleModalAddOpen()}>Add member</MyButton>

			<MyModal isOpen={isModalAddOpen} toggleOpen={toggleModalAddOpen}>
				<h3>Add Member: </h3>
				<form onSubmit={handleSubmit}>
					<div className="form-item">
						<label htmlFor="name">Name</label>
						<br />
						<input {...memberName} id="name" />
					</div>
					<div className="form-item">
						<label htmlFor="urlImage">URL Image</label>
						<br />
						<input {...memberUrlImage} id="urlImage" />
					</div>
					<div className="form-item">
						<label>Choose the gender:</label>
						<br />
						<input
							type="radio"
							id="Male"
							name="gender"
							value="Male"
							checked={gender}
							onClick={() => setGender(true)}
							readOnly
						/>
						<label htmlFor="Male">Male</label>
						<br />
						<input
							type="radio"
							id="Female"
							name="gender"
							value="Female"
							checked={!gender}
							onClick={() => setGender(false)}
							readOnly
						/>
						<label htmlFor="Female">Female</label>
					</div>
					<div className="form-item">
						<label>Choose the role:</label>
						{Object.values(Roles).map((value) => (
							<div key={value}>
								<input
									type="radio"
									id={value}
									name="role"
									value={value}
									checked={value == memberRole}
									onClick={() => setMemberRole(value)}
									readOnly
								/>
								<label htmlFor={value}>{value}</label>
								<br />
							</div>
						))}
					</div>
					<div className="form-item">
						<label htmlFor="projects">Select projects:</label>
						<br />
						<select
							name="project"
							id="projects"
							multiple
							onChange={(e) => {
								const values = Array.from(
									e.target.selectedOptions,
									(option) => option.value
								);
								setMemberProjects(values);
							}}
						>
							{dataGetProjects?.projects.map((e: Project) => (
								<option key={e._id} value={e._id}>
									{e.name}
								</option>
							))}
						</select>
					</div>
					<MyButton type="submit">Add</MyButton>
				</form>
			</MyModal>

			<MyModal isOpen={isModalInfoOpen} toggleOpen={toggleModalInfoOpen}>
				{loadingAddMember
					? "loading..."
					: errorAddMember
					? "Something went wrong " + errorAddMember.message
					: "Member was added"}
			</MyModal>
		</>
	);
}
