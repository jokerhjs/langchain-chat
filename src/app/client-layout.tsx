"use client";

import { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RobotOutlined,
  PieChartOutlined,
  CodepenOutlined,
  DatabaseOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  // 菜单切换
  function handleSelect(payload: any) {
    console.log(payload)
    const { key } = payload as { key: string };
    router.push(key);
  }

  useEffect(() => {
    router.replace("/dashboard");
  }, [])

  return (
    <Layout className="h-full">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          onClick={(key) => handleSelect(key)}
          mode="inline"
          defaultSelectedKeys={["/dashboard"]}
          items={[
            {
              key: "/dashboard",
              icon: <PieChartOutlined />,
              label: "看板",
            },
            {
              key: "/platform",
              icon: <CodepenOutlined />,
              label: "接入平台",
            },
            {
              key: "/records",
              icon: <DatabaseOutlined />,
              label: "访问记录",
            },
            {
              key: "/chat",
              icon: <RobotOutlined />,
              label: "智能对话",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "12px",
            padding: 12,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
