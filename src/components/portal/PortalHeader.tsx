"use client";

import { useEffect, useState } from "react";
import PortalAuthButton from "@/components/portal/PortalAuthButton";

export default function PortalHeader() {
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
          <a href="/" className="hover:text-black">
            首页
          </a>
          <a href="/docs" className="hover:text-black">
            文档
          </a>
          <a href="/blogs" className="hover:text-black">
            发布
          </a>
        </nav>
        <PortalAuthButton />
      </div>
    </header>
  );
}
