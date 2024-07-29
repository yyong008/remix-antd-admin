import { CreateUserModal } from "../../create-user-modal";
import { ToolbarDeleteButton } from "./toolbar-delete-button/toolbar-delete-button";

type createToolBarRenderOptions = {
  reload: (...args: any) => any;
  depts: any[];
  roles: any[];
  selectedRow: any[];
  setSelectedRow: any;
};

export const createToolBarRender = ({
  reload,
  depts,
  roles,
  selectedRow,
  setSelectedRow,
}: createToolBarRenderOptions) => [
  <CreateUserModal key="create" depts={depts} roles={roles} reload={reload} />,
  <ToolbarDeleteButton
    key="delete"
    selectedRow={selectedRow}
    setSelectedRow={setSelectedRow}
    reload={reload}
  />,
];
