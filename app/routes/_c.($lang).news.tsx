import { json } from "@remix-run/node";
import { NavLink, useLoaderData, useParams } from "@remix-run/react";
import { getNews } from "~/server/services/news/news";

export const loader = async () => {
  return json({
    code: 0,
    message: "success",
    news: await getNews(),
  });
};

export default function NewsPage() {
  const { news = [] } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col pt-[140px] w-[40vw] h-[80vh]">
      <div>
        {news?.map((n) => {
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
        className="text-gray-900  hover:text-yellow-500"
        to={`/${lang}/news/${props.data.id}`}
      >
        <h1 className="flex text-[16px] my-[10px]  before:block before:content-['·'] before:text-yellow-700 before:mr-[4px]">
          {data.title}
        </h1>
      </NavLink>
    </div>
  );
}
