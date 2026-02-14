"use client";

import { useEffect, useState } from "react";
import { Button } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function hasAdminSession() {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split("; ")
    .some((item) => item.startsWith("admin_session="));
}

export default function PortalAuthButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    setIsAuthed(hasAdminSession());
  }, [pathname]);

  if (isAuthed) {
    const handleLogout = () => {
      document.cookie = "admin_session=; Path=/; Max-Age=0";
      setIsAuthed(false);
      router.refresh();
    };
    return (
      <div className="flex items-center gap-3">
        <Button
          type="primary"
          onClick={() => router.push("/dashboard")}
        >
          进入后台
        </Button>
        <Button
          onClick={handleLogout}
          className="inline-flex items-center justify-center rounded-md border border-black text-black px-4 py-2 text-sm"
        >
          登出
        </Button>
      </div>
    );
  }

  return (
    <Link
      href="/login?from=/dashboard"
      className="inline-flex items-center justify-center rounded-md border border-black text-black px-4 py-2 text-sm"
    >
      登录
    </Link>
  );
}
