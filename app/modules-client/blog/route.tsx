import { BlogItem } from "./components";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Route() {
  const _data = useLoaderData<typeof loader>();
  const blogs = _data.data;
  return (
    <div className="flex flex-col pt-[140px] w-[40vw] h-[80vh]">
      <div>
        {blogs?.map((n: any) => {
          return <BlogItem data={n} key={n.id} />;
        })}
      </div>
    </div>
  );
}
