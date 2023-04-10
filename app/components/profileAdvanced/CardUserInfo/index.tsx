import { ProDescriptions } from "@ant-design/pro-components";
import { Card } from "antd";

export default function CardUserInfo() {
  return (
    <Card title="用户信息">
      <ProDescriptions column={3}>
        <ProDescriptions.Item label="取货单号">1000000000</ProDescriptions.Item>
        <ProDescriptions.Item label="状态">已取货</ProDescriptions.Item>
        <ProDescriptions.Item label="销售单号">1234123421</ProDescriptions.Item>
        <ProDescriptions.Item label="子订单">3214321432</ProDescriptions.Item>
      </ProDescriptions>

      <ProDescriptions column={3} title="退款申请">
        <ProDescriptions.Item label="取货单号">1000000000</ProDescriptions.Item>
        <ProDescriptions.Item label="状态">已取货</ProDescriptions.Item>
        <ProDescriptions.Item label="销售单号">1234123421</ProDescriptions.Item>
        <ProDescriptions.Item label="子订单">3214321432</ProDescriptions.Item>
      </ProDescriptions>
      <Card title="多层信息组">
        <ProDescriptions column={3} title="组1">
          <ProDescriptions.Item label="取货单号">
            1000000000
          </ProDescriptions.Item>
          <ProDescriptions.Item label="状态">已取货</ProDescriptions.Item>
          <ProDescriptions.Item label="销售单号">
            1234123421
          </ProDescriptions.Item>
          <ProDescriptions.Item label="子订单">3214321432</ProDescriptions.Item>
        </ProDescriptions>
        <ProDescriptions column={3} title="组2">
          <ProDescriptions.Item label="取货单号">
            1000000000
          </ProDescriptions.Item>
          <ProDescriptions.Item label="状态">已取货</ProDescriptions.Item>
          <ProDescriptions.Item label="销售单号">
            1234123421
          </ProDescriptions.Item>
          <ProDescriptions.Item label="子订单">3214321432</ProDescriptions.Item>
        </ProDescriptions>
        <ProDescriptions column={3} title="组3">
          <ProDescriptions.Item label="取货单号">
            1000000000
          </ProDescriptions.Item>
          <ProDescriptions.Item label="状态">已取货</ProDescriptions.Item>
          <ProDescriptions.Item label="销售单号">
            1234123421
          </ProDescriptions.Item>
          <ProDescriptions.Item label="子订单">3214321432</ProDescriptions.Item>
        </ProDescriptions>
      </Card>
    </Card>
  );
}
