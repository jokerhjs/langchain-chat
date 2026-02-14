"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PortalAuthButton from "@/components/portal/PortalAuthButton";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/langchain-chat";

const NAV_ITEMS = [
  { href: "/", label: "首页" },
  { href: "/docs", label: "文档" },
  { href: "/blogs", label: "发布" },
];

export default function PortalHeader() {
  const pathname = usePathname() ?? "";
  const normalizedPath = basePath && pathname.startsWith(basePath)
    ? pathname.slice(basePath.length) || "/"
    : pathname;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-white/95 backdrop-blur opacity-100 shadow-sm"
          : "bg-white/80 opacity-90"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <div className="text-lg font-semibold">AI 工具门户</div>
        <nav className="flex gap-6 text-sm text-gray-600">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? normalizedPath === "/"
                : normalizedPath.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative pb-1 text-sm transition-colors ${
                  isActive ? "text-black" : "text-gray-600 hover:text-black"
                } after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 ${
                  isActive ? "after:scale-x-100" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <PortalAuthButton />
      </div>
    </header>
  );
}
