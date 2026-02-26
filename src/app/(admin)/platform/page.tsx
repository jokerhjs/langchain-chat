'use client';

import { Card, Pagination, Spin, Empty } from 'antd';
import { useState, useEffect } from 'react';
const { Meta } = Card;

interface Platform {
  name: string;
  description: string | React.ReactNode;
  image?: string;
}
export default function PlatformPage() {
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      name: 'qianwen',
      description: '千问是由阿里巴巴自主研发的AI对话助手，基于Qwen大模型，支持自然语言理解、多模态数据处理等能力。它提供多种服务，包括文字创作、翻译、编程辅助、对话模拟等，旨在为用户提供高效、智能的语言服务体验。千问自2025年11月13日启动以来，已在中国市场迅速发展，成为个人AI助手应用的代表，标志着阿里巴巴从B端企业服务向C端用户市场的战略转型',
      image: '/qianwen.svg',
    },
    {
      name: 'doubao',
      description: '豆包是字节跳动公司基于云雀模型开发的一款功能强大的 AI 智能体。自推出以来，凭借其出色的性能和丰富的功能，迅速在AI领域崭露头角。它依托字节跳动先进的技术和海量的数据，致力于为用户提供全方位、高效、智能的服务。其研发团队来自字节跳动的 AI Lab，在自然语言处理、机器学习等领域深耕多年，为豆包的诞生和持续进化提供了坚实的技术支撑。',
      image: '/doubao-copy.svg',
    },
    {
      name: 'openai',
      description: 'ChatGPT（全称：聊天生成预训练转换器）是OpenAI开发的一款大型语言模型，基于GPT（Generative Pre-trained Transformer）架构。它使用强化学习和人类反馈进行训练，旨在生成自然语言文本并与用户进行对话。ChatGPT于2022年11月首次发布，随后推出了多个版本，包括GPT-3.5和GPT-4等.',
      image: '/openai-copy.svg',
    },
    {
      name: 'deepseek',
      description: '深度求索（DeepSeek），全称杭州深度求索人工智能基础技术研究有限公司，是中国一家人工智能与大型语言模型公司。该公司的总部位于浙江省杭州市（注册地位于拱墅区），由中资对冲基金幻方量化创立，创始人和首席执行官为梁文锋。',
      image: '/deepseek-copy.svg',
    }],
  );
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  async function handlePageChange(page: number, pageSize: number) {
    setCurrentPage(page);
    setPageSize(pageSize);
    setTotal(platforms.length);
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  }


  useEffect(() => {
    setTotal(platforms.length);
    setLoading(false);
  }, [platforms]);
  
  return (
      <div className="relative h-full">
        <Spin spinning={loading}>
          <div className="grid grid-cols-6 gap-4 pb-24">
            {platforms.length > 0 && platforms.map((platform) => (
              <Card
                key={platform.name}
                cover={
                    platform.image ? (
                      <img
                        className="w-full aspect-[4/3] object-contain p-4"
                        src={platform.image}
                        alt={platform.name}
                      />
                    ) : null
                }
              >
                <Meta title={platform.name} description={platform.description} />
              </Card>
            )) || <Empty description="No platforms found" />}
          </div>
        </Spin>
        

        <div className="absolute bottom-0 right-0 flex items-center h-[80px]">
          <Pagination current={currentPage} pageSize={pageSize} onChange={handlePageChange} total={total} pageSizeOptions={['10', '20', '50', '100']} />
        </div>
    </div>
  );
}
