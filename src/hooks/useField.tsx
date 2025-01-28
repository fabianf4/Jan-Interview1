import { useState } from "react";

export default function useField(type: string): {
	type: string;
	value: string;
	onChange: (event: any) => void;
} {
	const [value, setValue] = useState("");

	const onChange = (event: any) => setValue(event.target.value);

	return { type, value, onChange };
}
