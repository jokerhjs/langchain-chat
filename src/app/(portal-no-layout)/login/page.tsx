"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Card, Form, Input, message, Tabs } from "antd";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form] = Form.useForm();

  const redirectTo = useMemo(() => {
    const from = searchParams?.get("from");
    return from && from.startsWith("/") ? from : "/dashboard";
  }, [searchParams]);

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      if (!values?.username || !values?.password) {
        return message.error("请输入账号和密码");
      }

      // 简化版登录：演示用，直接写入 cookie
      // document.cookie = "admin_session=active; Path=/; Max-Age=86400";
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const {code, msg} = await res.json();
      if (code !== 200) {
        return message.error(msg || "登录失败");
      }
      message.success(msg || "登录成功");
      router.push(redirectTo);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      if (!values?.email || !values?.password || !values?.confirmPassword) {
        return message.error("请输入邮箱和密码");
      }
      if (values.password !== values.confirmPassword) {
        return message.error("两次密码不一致");
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const {code, msg} = await res.json();
      if (code !== 200) {
        return message.error(msg || "注册失败");
      }

      message.success("注册成功，请登录");
      setMode("login");
      form.setFieldsValue({
        username: values.email,
        password: undefined,
        confirmPassword: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <Card title="后台登录">
          <Tabs
            activeKey={mode}
            onChange={(key) => {
              setMode(key as "login" | "register");
              form.resetFields();
            }}
            items={[
              { key: "login", label: "登录" },
              { key: "register", label: "注册" },
            ]}
          />
          <Form form={form} layout="vertical">
            {mode === "login" ? (
              <>
                <Form.Item
                  label="账号"
                  name="username"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="请输入账号" />
                </Form.Item>
                <Form.Item
                  label="密码"
                  name="password"
                  rules={[{ required: true }]}
                >
                  <Input.Password placeholder="请输入密码" />
                </Form.Item>
                <Button
                  type="primary"
                  loading={loading}
                  onClick={handleLogin}
                  block
                >
                  登录
                </Button>
              </>
            ) : (
              <>
                <Form.Item
                  label="邮箱"
                  name="email"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="请输入邮箱" />
                </Form.Item>
                <Form.Item
                  label="密码"
                  name="password"
                  rules={[{ required: true }]}
                >
                  <Input.Password placeholder="请输入密码" />
                </Form.Item>
                <Form.Item
                  label="确认密码"
                  name="confirmPassword"
                  rules={[{ required: true }]}
                >
                  <Input.Password placeholder="请再次输入密码" />
                </Form.Item>
                <Button
                  type="primary"
                  loading={loading}
                  onClick={handleRegister}
                  block
                >
                  注册
                </Button>
              </>
            )}
          </Form>
        </Card>
      </div>
    </div>
  );
}
