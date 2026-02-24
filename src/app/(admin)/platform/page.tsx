'use client';

import { Card, Pagination } from 'antd';
import { useState } from 'react';
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
    description: 'Description 1',
    image: '/qianwen.png',
  },
  {
    name: 'doubao',
    description: 'Description 1',
    image: '/doubao.png',
  },
  {
    name: 'openai',
    description: 'Description 1',
    image: '/openai-copy.png',
  },
  {
    name: 'deepseek',
    description: 'Description 1',
    image: '/deepseek.png',
  }],
);
  return (
      <div className="relative h-full">
        <div className="grid grid-cols-6 gap-4 pb-24">
        {platforms.map((platform) => (
          <Card
            key={platform.name}
            cover={
                platform.image ? (
                  <img
                    className="w-full aspect-[4/3] object-contain"
                    src={platform.image}
                    alt={platform.name}
                  />
                ) : null
            }
          >
            <Meta title={platform.name} description={platform.description} />
          </Card>
        ))}
      </div>

      <div className="absolute bottom-0 right-0 flex items-center h-[80px]">
        <Pagination defaultCurrent={1} total={100} />
      </div>
    </div>
  );
}
