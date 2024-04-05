import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getNews } from "~/services/news/news";

export const loader = async ({}) => {
  return json({
    code: 0,
    message: "success",
    news: await getNews(),
  });
};

export default function NewsPage() {
  const { news = [] } = useLoaderData<typeof loader>();
  return (
    <div className="flex justify-center items-center h-[80vh]">
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
  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
}
