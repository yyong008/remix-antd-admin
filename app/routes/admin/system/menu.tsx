// types
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { PageContainer } from "@ant-design/pro-components";
import SystemMenu from "~/components/system/Menu";

// service
import {
  createMenu,
  deleteMenu,
  getMenu,
  updateMenu,
} from "~/services/system/menu";
import { getMenuRaw, getTypeNotPermMenu } from "~/services/system/menu-role";
import i18n from "~/i18n/i18next.server";
import {
  AddMenuDirSchema,
  AddMenuSchema,
  AddMenuPermSchema,
  deleteMenuSchema,
  UpdateMenuDirSchema,
  UpdateMenuPermSchema,
  UpdateMenuSchema,
} from "~/schema/menu.schema";
import { useFetcherChange } from "~/hooks/useFetcherChange";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    { title: "System-Menu" },
    { name: "System-Menu", content: "System-Menu" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const method = request.method;
  if (method === "POST") {
    const menuDto = await request.json();
    let validatedMenu: any = {};
    // 校验
    try {
      if (menuDto.type === 1) {
        validatedMenu = await AddMenuDirSchema.parse(menuDto);
      } else if (menuDto.type === 2) {
        validatedMenu = await AddMenuSchema.parse(menuDto);
      } else if (menuDto.type === 3) {
        validatedMenu = await AddMenuPermSchema.parse(menuDto);
      }
    } catch (error) {
      console.log("error", error);
      return json({ code: 1, data: {}, message: error });
    }

    // 创建
    const menu = await createMenu(validatedMenu);

    if (menu) {
      return json({ code: 0, data: {}, message: "success" });
    } else {
      return json({ code: 1, data: {}, message: "fail" });
    }
  } else if (method === "PUT") {
    const menuDto = await request.json();
    let validatedMenu = null;

    try {
      if (menuDto.type === 1) {
        validatedMenu = await UpdateMenuDirSchema.parse(menuDto);
      } else if (menuDto.type === 2) {
        validatedMenu = await UpdateMenuSchema.parse(menuDto);
      } else if (menuDto.type === 3) {
        validatedMenu = await UpdateMenuPermSchema.parse(menuDto);
      }
    } catch (error) {
      console.log("error", error);
      return json({ code: 1, data: {}, message: error?.toString() });
    }

    const menu = await updateMenu(validatedMenu);
    if (menu) {
      return json({ code: 0, data: {}, message: "success" });
    } else {
      return json({ code: 1, data: {}, message: "fail" });
    }
  } else if (method === "DELETE") {
    const { ids } = await request.json();

    let validateIds: { ids: number[] } = { ids };
    try {
      validateIds = await deleteMenuSchema.parse({ ids });
    } catch (error) {
      console.log("error", error);
      return json({ code: 1, data: {}, message: error });
    }

    const menu = await deleteMenu(validateIds.ids);

    if (menu) {
      return json({ code: 0, data: {}, message: "success" });
    } else {
      return json({ code: 1, data: {}, message: "fail" });
    }
  }
};

// remix:loader
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { lang } = params;
  let t = await i18n.getFixedT(lang!);
  return json({
    menu: await getMenu(t, lang!),
    // roles: await getRoleList(),
    menuRaw: await getMenuRaw(t, lang!),
    menuNotPerm: await getTypeNotPermMenu(t),
  });
};

export default function MenuRoute() {
  const { menuRaw, menuNotPerm } = useLoaderData<typeof loader>();
  const fetcher = useFetcherChange();
  return (
    <PageContainer>
      <SystemMenu
        // roles={roles}
        menuRaw={menuRaw}
        fetcher={fetcher as any}
        menuNotPerm={menuNotPerm!}
      />
    </PageContainer>
  );
}