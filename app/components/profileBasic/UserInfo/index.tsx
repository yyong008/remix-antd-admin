import { ProDescriptions } from "@ant-design/pro-components";

export default function UserInfo() {
  return (
    <ProDescriptions column={3} title="用户信息">
      <ProDescriptions.Item label="用户姓名">付小小</ProDescriptions.Item>
      <ProDescriptions.Item label="联系电话">18100000000</ProDescriptions.Item>
      <ProDescriptions.Item label="常用快递">菜鸟仓储</ProDescriptions.Item>
      <ProDescriptions.Item label="取货地址">
        浙江省杭州市西湖区万塘路18号
      </ProDescriptions.Item>
      <ProDescriptions.Item label="备注">无</ProDescriptions.Item>
    </ProDescriptions>
  );
}
