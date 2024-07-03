import { ProDescriptions } from "@ant-design/pro-components";

export default function RefundRequest() {
  return (
    <ProDescriptions column={3} title="退款申请">
      <ProDescriptions.Item label="取货单号">1000000000</ProDescriptions.Item>
      <ProDescriptions.Item label="状态">已取货</ProDescriptions.Item>
      <ProDescriptions.Item label="销售单号">1234123421</ProDescriptions.Item>
      <ProDescriptions.Item label="子订单">3214321432</ProDescriptions.Item>
    </ProDescriptions>
  );
}
