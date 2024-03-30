import { json } from "@remix-run/node";
import { getSystemInfo } from "~/services/common/systeminfo.server";

export const loader = async () => {
  const t = Date.now();

  try {
    const data = await getSystemInfo();
    return json({
      code: 0,
      data,
      time: Date.now() - t,
      message: "success",
    });
  } catch (error) {
    console.log(error);
    return json({
      code: 0,
      data: {},
      time: Date.now() - t,
      message: "success",
    });
  }
};
