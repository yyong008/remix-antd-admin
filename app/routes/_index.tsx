// cores
import { redirect } from "@remix-run/node";

export const loader = () => redirect("/en-US/dashboard/analysis");
