import Members from "./pages/members";
import Teams from "./pages/teams";
import { useToggle } from "./hooks";

function App() {
	const [view, toggleView] = useToggle(true);
	return (
		<>
			{view ? (
				<Members change={toggleView} />
			) : (
				<Teams change={toggleView} />
			)}
		</>
	);
}

export default App;
