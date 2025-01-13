export function Tiper({
  title,
  content,
}: {
  title: string;
  content: JSX.Element | string;
}) {
  return (
    <a
      href="#"
      className=" bg-slate-100 mx-auto mb-3 inline-flex items-center gap-3 rounded-full border border-yellow-800 px-2 py-1 text-sm backdrop-blur-sm"
    >
      <div className="bg-yellow-800  rounded-full text-xs px-[8px] py-[4px] text-white font-bold">
        {title}
      </div>
      <div className="font-bold">{content}</div>
    </a>
  );
}
