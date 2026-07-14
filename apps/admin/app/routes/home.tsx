import { redirect, href } from "react-router";

export function loader() {
  return redirect(href("/:locale?/login", { locale: undefined }));
}

export default function HomePage() {
  return null;
}
