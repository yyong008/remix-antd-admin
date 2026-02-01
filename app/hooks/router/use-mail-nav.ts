import { useNavigate, useParams } from "react-router";

type IOptions = {
	page?: number;
	pageSize?: number;
	name?: string;
};

export function goMailNav(lang: string, options: IOptions) {
	const name = options.name ? `&name=${options.name}` : "";
	return `/${lang}/admin/mail/list?page=${options?.page ?? 1}&pageSize=${options?.pageSize ?? 10}${name}`;
}

export function useMailNav() {
	const nav = useNavigate();
	const { lang } = useParams();

	const navMail = (options: IOptions) => {
		return nav(goMailNav(lang!, options));
	};
	return [navMail];
}
