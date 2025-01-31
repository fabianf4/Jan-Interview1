import { useCallback, useState } from "react";

type ErrorType = Error | null;
type Data<T> = T | null;

interface Params {
	url: string;
}

interface propsFetch {
	path: string;
	options?: RequestInit;
}

type ReturnValues<T> = [
	Data<T>,
	ErrorType,
	boolean,
	({ path, options }: propsFetch) => void
];

export default function useFetch<T>({ url }: Params): ReturnValues<T> {
	const [data, setData] = useState<Data<T>>(null);
	const [error, setError] = useState<ErrorType>(null);
	const [loading, setLoading] = useState(false);

	const fetchData = useCallback(
		async ({ path, options = {} }: propsFetch) => {
			setData(null);
			setError(null);
			setLoading(true);
			try {
				const response = await fetch(url + path, options);
				if (!response.ok) {
					throw new Error("Error " + response.status);
				}

				const data = await response.json();

				setData(data);
			} catch (error) {
				setError(error as ErrorType);
			}
			setLoading(false);
		},
		[]
	);

	return [data, error, loading, fetchData];
}
