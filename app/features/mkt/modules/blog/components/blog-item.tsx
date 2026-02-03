import { href, NavLink, useParams } from "react-router";

export function BlogItem(props: any) {
	const { data } = props;
	const { locale } = useParams();
	return (
		<div>
			<NavLink
				className="hover:text-yellow-500"
				to={href(`/:locale?/blog/:id`, { locale, id: props.data.id })}
			>
				<h1 className="flex text-[16px] my-[10px] before:block before:content-['·'] before:text-yellow-600 before:mr-[4px]">
					{data.title}
				</h1>
			</NavLink>
		</div>
	);
}
