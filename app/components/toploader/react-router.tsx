import { TopLoader } from "./top-loader";
import { useFetchers, useNavigation } from "react-router";

export const ReactRouterTopLoader = () => {
	return <TopLoader useFetchers={useFetchers} useNavigation={useNavigation} />;
};
