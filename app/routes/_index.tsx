// cores
import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

export const loader = () => redirect('/zh/user/login')