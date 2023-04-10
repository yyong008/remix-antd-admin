import {
  ProFormRadio,
  ProFormDependency,
  ProFormSelect,
} from "@ant-design/pro-components";

export default function FormIsOpen() {
  return (
    <>
      <ProFormRadio.Group
        name="isOpen"
        label="目标公开"
        extra="客户、邀评人默认被分享"
        options={[
          {
            label: "公开",
            value: "open",
          },
          {
            label: "部分公开",
            value: "part-open",
          },
          {
            label: "不公开",
            value: "close",
          },
        ]}
      />
      <ProFormDependency name={["isOpen"]}>
        {({ isOpen }) => {
          return (
            isOpen === "part-open" && (
              <ProFormSelect
                options={[
                  {
                    value: "a",
                    label: "同事甲",
                  },
                  {
                    value: "b",
                    label: "同事乙",
                  },
                  {
                    value: "c",
                    label: "同事丙",
                  },
                ]}
                width="md"
                name="person"
              />
            )
          );
        }}
      </ProFormDependency>
    </>
  );
}
