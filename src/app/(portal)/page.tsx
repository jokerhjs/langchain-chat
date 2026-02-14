export default function PortalHomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 items-start">
      <section>
        <h1 className="text-3xl font-semibold mb-4 text-center">
          AI 工具开发平台
        </h1>
        <p className="text-gray-600 max-w-2xl text-center mx-auto">
          统一的门户入口，提供产品介绍、文档与价格方案。后台管理系统请从登录后进入。
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-5">
            <h2 className="font-medium mb-2">快速接入</h2>
            <p className="text-sm text-gray-600">统一 SDK 与文档，开箱即用。</p>
          </div>
          <div className="border rounded-lg p-5">
            <h2 className="font-medium mb-2">计费透明</h2>
            <p className="text-sm text-gray-600">清晰的用量统计与账单。</p>
          </div>
          <div className="border rounded-lg p-5">
            <h2 className="font-medium mb-2">稳定可靠</h2>
            <p className="text-sm text-gray-600">多平台接入与高可用保障。</p>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <header className="mb-6 text-center">
          <h2 className="text-2xl font-semibold">产品能力</h2>
          <p className="text-gray-600">从接入到运营的完整链路。</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="border rounded-lg p-5">
            <h3 className="font-medium mb-2">统一身份与密钥</h3>
            <p className="text-sm text-gray-600">
              一站式管理应用与密钥，支持多环境隔离与权限控制。
            </p>
          </article>
          <article className="border rounded-lg p-5">
            <h3 className="font-medium mb-2">模型路由与策略</h3>
            <p className="text-sm text-gray-600">
              按场景选择最优模型，支持降级、熔断与自定义路由策略。
            </p>
          </article>
          <article className="border rounded-lg p-5">
            <h3 className="font-medium mb-2">用量与账单</h3>
            <p className="text-sm text-gray-600">
              细粒度用量统计与账单明细，支持预算与告警设置。
            </p>
          </article>
        </div>
      </section>

      <section className="mt-14">
        <header className="mb-6 text-center">
          <h2 className="text-2xl font-semibold">典型场景</h2>
          <p className="text-gray-600">覆盖多行业的落地实践。</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="border rounded-lg p-5">
            <h3 className="font-medium mb-2">智能客服</h3>
            <p className="text-sm text-gray-600">
              支持多轮对话与知识库检索，提升问题解决效率。
            </p>
          </article>
          <article className="border rounded-lg p-5">
            <h3 className="font-medium mb-2">内容生成</h3>
            <p className="text-sm text-gray-600">
              从创意到排版一体化产出，适配多渠道发布。
            </p>
          </article>
          <article className="border rounded-lg p-5">
            <h3 className="font-medium mb-2">数据分析</h3>
            <p className="text-sm text-gray-600">
              自动生成报告与洞察，降低分析门槛。
            </p>
          </article>
        </div>
      </section>

      <section className="mt-14">
        <header className="mb-6 text-center">
          <h2 className="text-2xl font-semibold">安全与合规</h2>
          <p className="text-gray-600">默认安全，符合企业规范。</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="border rounded-lg p-5">
            <h3 className="font-medium mb-2">权限与审计</h3>
            <p className="text-sm text-gray-600">
              细粒度权限管理与审计日志，保障操作可追溯。
            </p>
          </article>
          <article className="border rounded-lg p-5">
            <h3 className="font-medium mb-2">数据隔离</h3>
            <p className="text-sm text-gray-600">
              组织级数据隔离与加密存储，保护核心资产。
            </p>
          </article>
          <article className="border rounded-lg p-5">
            <h3 className="font-medium mb-2">可观测性</h3>
            <p className="text-sm text-gray-600">
              关键指标可视化监控，异常告警快速定位问题。
            </p>
          </article>
        </div>
      </section>

      <section className="mt-16 border-t pt-10">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold">FAQ</h2>
          <p className="text-sm text-gray-500">常见问题解答</p>
        </div>
        <div className="space-y-3">
          <details className="group border rounded-lg p-4">
            <summary className="cursor-pointer font-medium list-none flex items-center justify-between">
              如何开始接入？
              <span className="text-gray-400 group-open:rotate-180 transition-transform">
                ▾
              </span>
            </summary>
            <p className="mt-3 text-sm text-gray-600">
              在后台创建应用并获取密钥，按文档初始化 SDK 后即可调用。
            </p>
          </details>
          <details className="group border rounded-lg p-4">
            <summary className="cursor-pointer font-medium list-none flex items-center justify-between">
              赠金与余额如何使用？
              <span className="text-gray-400 group-open:rotate-180 transition-transform">
                ▾
              </span>
            </summary>
            <p className="mt-3 text-sm text-gray-600">
              赠金优先消耗，余额可在后台实时查看并支持预算告警。
            </p>
          </details>
          <details className="group border rounded-lg p-4">
            <summary className="cursor-pointer font-medium list-none flex items-center justify-between">
              如何进入后台？
              <span className="text-gray-400 group-open:rotate-180 transition-transform">
                ▾
              </span>
            </summary>
            <p className="mt-3 text-sm text-gray-600">
              登录成功后可点击导航右侧“进入后台”按钮直达管理后台。
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
