import Link from "next/link";

const BLOGS = [
  {
    slug: "getting-started",
    title: "快速上手：从 0 到 1 接入平台",
    excerpt: "通过 3 个步骤完成接入，包含密钥申请、SDK 初始化与调用示例。",
    date: "2026-02-01",
    tag: "指南",
  },
  {
    slug: "billing-and-quota",
    title: "计费与配额说明",
    excerpt: "了解计费模式、赠金规则与用量统计的查看方式。",
    date: "2026-01-22",
    tag: "计费",
  },
  {
    slug: "reliability-update",
    title: "稳定性升级与可用性实践",
    excerpt: "我们如何通过多区域与限流策略提升稳定性。",
    date: "2026-01-10",
    tag: "平台",
  },
  {
    slug: "billing-and-quota",
    title: "计费与配额说明",
    excerpt: "了解计费模式、赠金规则与用量统计的查看方式。",
    date: "2026-01-22",
    tag: "计费",
  },
  {
    slug: "reliability-update",
    title: "稳定性升级与可用性实践",
    excerpt: "我们如何通过多区域与限流策略提升稳定性。",
    date: "2026-01-10",
    tag: "平台",
  }
];

export default function BlogsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 items-start">
      <h1 className="text-3xl font-semibold mb-2">Blogs</h1>
      <p className="text-gray-600 mb-8">
        产品更新、技术实践与接入指南。
      </p>
      <div className="space-y-4">
        {BLOGS.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
            className="block border rounded-lg p-5 hover:border-black transition-colors"
          >
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
              <span>{blog.date}</span>
              <span className="px-2 py-0.5 border rounded-full">{blog.tag}</span>
            </div>
            <h2 className="text-lg font-medium mb-1">{blog.title}</h2>
            <p className="text-sm text-gray-600">{blog.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}