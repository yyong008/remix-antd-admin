import { PageContainer, ProCard, ProForm } from "@ant-design/pro-components";

import { FormItems } from "./components/FormItems";
import { readProfileAccount, updateProfileAccountById } from "~/admin/apis/admin/profile";
import { useEffect, useState, useTransition } from "react";
import { genFileListByName } from "~/utils/client/utils";
import { Button, message } from "antd";

export function Route() {
  const [isPending, startTransition] = useTransition();
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    const res: any = await readProfileAccount();
    setIsLoading(false);
    if (res && res.code === 0) {
      setData({
        ...res?.data,
        theme: res?.data?.theme || "light",
        department: res?.data?.department?.name,
      });
    }
  };

  const handleSave = async () => {
    startTransition(async () => {
      const res: any = await updateProfileAccountById(data);
      if (res && res.code !== 0) {
        message.error(res?.message);
      } else {
        message.success("保存成功");
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <PageContainer>
      <ProCard loading={isLoading}>
        <ProForm
          initialValues={{
            ...data,
            avatar: genFileListByName(data?.avatar),
          }}
          readonly={!isEdit}
          layout="horizontal"
          labelCol={{ span: 1 }}
          submitter={false}
          onFinish={handleSave}
        >
          <FormItems isEdit={isEdit} />
          <ProForm.Item>
            <div className="flex gap-2">
              <Button type="primary"  onClick={() => setIsEdit(!isEdit)}>
                {isEdit ? "取消" : "编辑"}
              </Button>
              {isEdit && (
                <Button htmlType="submit"  type="primary" loading={isPending}>
                  保存
                </Button>
              )}
            </div>
          </ProForm.Item>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
}
