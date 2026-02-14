"use client";
import { useEffect, useState } from "react";
import {
  Form,
  Card,
  Select,
  message,
  Row,
  Col,
  Statistic,
  Spin,
  DatePicker,
} from "antd";
import ReactECharts from "echarts-for-react";

// deekSeekData 数据结构
interface DeekSeekData {
  currency: string;
  total_balance: number;
  granted_balance: number;
  topped_up_balance: number;
}

const { RangePicker } = DatePicker;
export default function DashboardPage() {
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDeekSeek();

    form.setFieldsValue({
      service: "deepseek",
    });
  }, []);

  const [deekSeekData, setDeekSeekData] = useState<DeekSeekData>({
    currency: "",
    total_balance: 0,
    granted_balance: 0,
    topped_up_balance: 0,
  });
  const [loading, setLoading] = useState(false);

  // 用户访问记录
  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  const fetchDeekSeek = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/deekseek");
      const data = await res.json();
      setDeekSeekData({
        currency: data?.balance_infos[0]?.currency,
        total_balance: data?.balance_infos[0]?.total_balance,
        granted_balance: data?.balance_infos[0]?.granted_balance,
        topped_up_balance: data?.balance_infos[0]?.topped_up_balance,
      });
    } catch (error: any) {
      message.error(error.message || "查询失败");
    } finally {
      setLoading(false);
    }
  };

  const queryStatistic = async (key: string) => {
    console.log(key);
    setDeekSeekData({
      currency: "",
      total_balance: 0,
      granted_balance: 0,
      topped_up_balance: 0,
    });
    switch (key) {
      case "deepseek":
        fetchDeekSeek();
        break;
      default:
        return null;
    }
  };
  return (
    <div>
      <Card title="服务信息" style={{ marginBottom: 16 }}>
        <Form form={form} layout="inline">
          <Form.Item label="服务商" name="service">
            <Select
              onChange={(value) => queryStatistic(value)}
              style={{ width: 200 }}
              options={[
                { label: "DeepSeek", value: "deepseek" },
                { label: "服务2", value: "2" },
              ]}
            />
          </Form.Item>
        </Form>
        <Spin spinning={loading} tip="加载中...">
          <Row gutter={16} className="mt-4">
            <Col span={8}>
              <Statistic
                title={`总的可用余额(${deekSeekData.currency})`}
                value={deekSeekData.total_balance ?? 0}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title={`未过期的赠金余额(${deekSeekData.currency})`}
                value={deekSeekData.granted_balance ?? 0}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title={`充值余额(${deekSeekData.currency})`}
                value={deekSeekData.topped_up_balance ?? 0}
              />
            </Col>
          </Row>
        </Spin>
      </Card>

      <Card title="用户访问记录">
        <Form form={form} layout="inline">
          <Form.Item label="日期" name="name">
            <RangePicker />
          </Form.Item>
        </Form>
        <Spin spinning={loading} tip="加载中...">
          <ReactECharts option={options} style={{ height: 400 }} />
        </Spin>
      </Card>
    </div>
  );
}
