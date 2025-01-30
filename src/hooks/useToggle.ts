import { useCallback, useState } from "react";

export function useToggle(initState: boolean = false): [boolean, () => void] {
	const [state, setState] = useState(initState);

	const toggle = useCallback((): void => setState((state) => !state), []);

	return [state, toggle];
}
