import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import useToggle from "../../hooks/useToggle";
import MyButton from "../myButton";
import MyModal from "../myModal";

interface Props {
	toggleUpdate: () => void;
}
export default function ButtonPopulateDB({ toggleUpdate }: Props) {
	const API_URL = import.meta.env.VITE_API_URL;
	const [isModalOpen, toggleModalOpen] = useToggle();

	const [
		_dataPopulateDB,
		errorPopulateDB,
		loadingPopulateDB,
		fetchPopulateDB,
	] = useFetch({ url: API_URL });

	useEffect(() => {
		if (!loadingPopulateDB) {
			toggleUpdate();
		}
	}, [loadingPopulateDB]);

	function handlePopulateDb() {
		toggleModalOpen();
		fetchPopulateDB({ path: "/populate" });
	}

	return (
		<>
			<MyButton onClick={() => handlePopulateDb()}>Populate DB</MyButton>
			<MyModal isOpen={isModalOpen} toggleOpen={toggleModalOpen}>
				{loadingPopulateDB
					? "loading..."
					: errorPopulateDB
					? "Something went wrong " + errorPopulateDB.message
					: "DB populated"}
			</MyModal>
		</>
	);
}
