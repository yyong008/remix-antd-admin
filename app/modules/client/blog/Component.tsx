import { NavLink, useLoaderData, useParams } from "@remix-run/react";
import type { loader } from "./loader";

export function Component() {
  const { news = [] } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col pt-[140px] w-[40vw] h-[80vh]">
      <div>
        {news?.map((n: any) => {
          return <NewItem data={n} key={n.id} />;
        })}
      </div>
    </div>
  );
}

function NewItem(props: any) {
  const { data } = props;
  const { lang } = useParams();
  return (
    <div>
      <NavLink
        className="hover:text-yellow-500"
        to={`/${lang}/blog/${props.data.id}`}
      >
        <h1 className="flex text-[16px] my-[10px] before:block before:content-['·'] before:text-yellow-600 before:mr-[4px]">
          {data.title}
        </h1>
      </NavLink>
    </div>
  );
}
