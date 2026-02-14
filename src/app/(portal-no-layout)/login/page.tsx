"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Card, Form, Input, message } from "antd";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
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
      document.cookie = "admin_session=active; Path=/; Max-Age=86400";
      message.success("登录成功");
      router.push(redirectTo);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <Card title="后台登录">
          <Form form={form} layout="vertical">
            <Form.Item label="账号" name="username" rules={[{ required: true }]}>
              <Input placeholder="请输入账号" />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true }]}>
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
          </Form>
        </Card>
      </div>
    </div>
  );
}
