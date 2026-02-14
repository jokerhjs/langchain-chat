import Link from "next/link";
import { use} from 'react'

const BLOG_DETAIL: Record<
  string,
  {
    title: string;
    date: string;
    tag: string;
    summary: string;
    sections: Array<{ heading: string; body: string[] }>;
  }
> = {
  "getting-started": {
    title: "快速上手：从 0 到 1 接入平台",
    date: "2026-02-01",
    tag: "指南",
    summary: "通过 3 个步骤完成接入，包含密钥申请、SDK 初始化与调用示例。",
    sections: [
      {
        heading: "1. 申请密钥",
        body: [
          "前往后台的接入平台，创建应用并获取访问密钥。",
          "建议为不同环境分别创建密钥以便管理。",
        ],
      },
      {
        heading: "2. 初始化 SDK",
        body: [
          "在项目中安装 SDK 并配置 API Key。",
          "通过统一的客户端实例进行请求调用。",
        ],
      },
      {
        heading: "3. 发起请求",
        body: [
          "使用最小示例完成首次请求。",
          "可在控制台查看日志与用量统计。",
        ],
      },
    ],
  },
  "billing-and-quota": {
    title: "计费与配额说明",
    date: "2026-01-22",
    tag: "计费",
    summary: "了解计费模式、赠金规则与用量统计的查看方式。",
    sections: [
      {
        heading: "计费模型",
        body: [
          "按调用量计费，按月结算。",
          "支持预算告警与限额控制。",
        ],
      },
      {
        heading: "赠金与余额",
        body: ["赠金优先消耗，过期后自动失效。", "余额可在后台实时查看。"],
      },
    ],
  },
  "reliability-update": {
    title: "稳定性升级与可用性实践",
    date: "2026-01-10",
    tag: "平台",
    summary: "我们如何通过多区域与限流策略提升稳定性。",
    sections: [
      {
        heading: "多区域部署",
        body: [
          "核心服务支持多区域冗余，提升容灾能力。",
          "路由策略会根据延迟与负载动态选择。",
        ],
      },
      {
        heading: "限流与重试",
        body: [
          "对高频请求启用自适应限流。",
          "客户端建议使用指数退避重试。",
        ],
      },
    ],
  },
};

export default function BlogDetailPage({
  params,
}: {
  params: { slug: any };
}) {
  const res = use(params as unknown as Promise<{ slug: string }>);
  const article = BLOG_DETAIL[res.slug];

  console.log(res);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold mb-2">文章不存在</h1>
        <p className="text-gray-600 mb-6">请返回博客列表查看其他内容。</p>
        <Link
          href="/blogs"
          className="inline-flex items-center justify-center rounded-md border border-black text-black px-4 py-2 text-sm"
        >
          返回博客列表
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="text-xs text-gray-500 mb-3">
        {article.date} · {article.tag}
      </div>
      <h1 className="text-3xl font-semibold mb-3">{article.title}</h1>
      <p className="text-gray-600 mb-8">{article.summary}</p>
      <div className="space-y-8">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-medium mb-2">{section.heading}</h2>
            <div className="space-y-2 text-gray-700">
              {section.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="mt-10">
        <Link
          href="/blogs"
          className="inline-flex items-center justify-center rounded-md border border-black text-black px-4 py-2 text-sm"
        >
          返回博客列表
        </Link>
      </div>
    </div>
  );
}
