import { useEffect, useRef, useState } from "react";

export function useKeyPress(resetTime = 100) {
	const [key, setKey] = useState("");
	const tRef = useRef<any>();

	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			if (event.key) {
				setKey(event.key);
			}

			if (resetTime) {
				if (tRef.current) {
					clearInterval(tRef.current);
				}

				tRef.current = setTimeout(() => {
					setKey("");
				}, resetTime);
			}
		};

		document.addEventListener("keydown", handler);
		return () => {
			document.removeEventListener("keydown", handler);
			tRef.current = null;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return [key];
}

export default useKeyPress;
