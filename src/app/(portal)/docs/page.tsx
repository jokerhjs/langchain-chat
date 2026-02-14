"use client";

import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type DocSection = {
  id: string;
  title: string;
  content: string;
};

type DocItem = {
  id: string;
  title: string;
  summary: string;
  sections: DocSection[];
};

const DOCS: DocItem[] = [
  {
    id: "quickstart",
    title: "快速开始",
    summary:
      "本文介绍如何在 5 分钟内完成接入，包含密钥申请、SDK 初始化与首次调用示例。",
    sections: [
      {
        id: "intro",
        title: "概览",
        content:
          "平台提供统一的 API 入口，支持多模型路由、计费与日志追踪。",
      },
      {
        id: "prerequisites",
        title: "准备工作",
        content: `- 创建应用并获取 API Key\n- 确认调用环境与网络策略\n- 规划回调与日志存储`,
      },
      {
        id: "install",
        title: "安装与初始化",
        content:
          "安装 SDK 并注入 API Key 与默认模型完成初始化。\n\n> 推荐在服务端配置密钥，避免泄露。",
      },
      {
        id: "request",
        title: "发起请求",
        content:
          "调用模型接口，建议启用超时、重试与流式响应。\n\n```ts\nconst client = createClient({ apiKey: \"YOUR_KEY\" })\nawait client.chat({ prompt: \"Hello\" })\n```",
      },
    ],
  },
  {
    id: "auth-security",
    title: "鉴权与安全",
    summary: "了解鉴权方式、权限模型与安全建议，确保调用安全可控。",
    sections: [
      {
        id: "auth-methods",
        title: "鉴权方式",
        content:
          "支持 **API Key** 与 **服务端签名** 两种方式，按场景选择。",
      },
      {
        id: "permissions",
        title: "权限模型",
        content: "应用级与团队级权限分离，支持最小权限配置。",
      },
      {
        id: "best-practice",
        title: "安全建议",
        content: "密钥定期轮换，结合 IP 白名单与用量告警。",
      },
    ],
  },
  {
    id: "billing",
    title: "计费与配额",
    summary: "掌握计费规则、配额机制与预算告警的设置方式。",
    sections: [
      {
        id: "pricing",
        title: "计费规则",
        content: "按调用量计费，按月结算，支持阶梯价格。",
      },
      {
        id: "quota",
        title: "配额管理",
        content: "支持项目级配额与限额策略，防止异常消耗。",
      },
      {
        id: "alerts",
        title: "预算告警",
        content: "设置阈值告警，超过预算时自动通知。",
      },
    ],
  },
];

export default function DocsPage() {
  const [activeDocId, setActiveDocId] = useState(DOCS[0]?.id ?? "");

  const activeDoc = useMemo(
    () => DOCS.find((doc) => doc.id === activeDocId) ?? DOCS[0],
    [activeDocId]
  );

  const anchors = useMemo(
    () =>
      activeDoc?.sections.map((section) => ({
        id: section.id,
        label: section.title,
      })) ?? [],
    [activeDoc]
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 items-start">
      <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_220px] gap-8">
        <aside className="hidden lg:block">
          <nav className="lg:sticky lg:top-24">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">
              文档导航
            </h2>
            <ul className="space-y-2 text-sm text-gray-600">
              {DOCS.map((item) => {
                const isActive = item.id === activeDocId;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveDocId(item.id)}
                      className={`w-full text-left hover:text-black ${
                        isActive ? "text-black font-medium" : ""
                      }`}
                    >
                      {item.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <main>
          <article className="prose prose-neutral max-w-none">
            <h1>{activeDoc?.title}</h1>
            <p>{activeDoc?.summary}</p>

            {activeDoc?.sections.map((section) => (
              <div key={section.id}>
                <h2 id={section.id} className="scroll-mt-24">
                  {section.title}
                </h2>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {section.content}
                </ReactMarkdown>
              </div>
            ))}
          </article>
        </main>

        <aside className="hidden lg:block">
          <div className="lg:sticky lg:top-24">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">
              目录
            </h2>
            <ul className="space-y-2 text-sm text-gray-600">
              {anchors.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:text-black">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}