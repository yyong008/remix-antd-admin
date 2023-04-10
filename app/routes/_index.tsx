// cores
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

const IndexPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/zh/user/login");
  }, [navigate]);

  return null;
};

export default IndexPage;
