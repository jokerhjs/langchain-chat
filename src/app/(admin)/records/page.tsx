'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Table, Tag, Space, Flex, Form, Input, Button, Select, DatePicker } from 'antd';
import type { TableProps, FormProps } from 'antd';
import { UndoOutlined } from '@ant-design/icons';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <Flex gap="small" align="center" wrap>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </Flex>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

type FieldType = {
  area?: string;
  ip?: string;
  date?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
export default function RecordsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataType[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = data.length;

  const pagedData = useMemo(() => {
    const start = (current - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [current, pageSize, data]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const timer = setTimeout(() => {
      if (!isMounted) return;
      const rows: DataType[] = Array.from({ length: 53 }, (_, index) => {
        const id = index + 1;
        return {
          key: String(id),
          name: `User ${id}`,
          age: 20 + (id % 30),
          address: `City ${id} No. ${id} Street`,
          tags: id % 3 === 0 ? ['cool', 'teacher'] : id % 2 === 0 ? ['loser'] : ['nice', 'developer'],
        };
      });
      setData(rows);
      setLoading(false);
    }, 800);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  const triggerPageLoading = () => {
    if (pageTimerRef.current) {
      clearTimeout(pageTimerRef.current);
    }
    setLoading(true);
    pageTimerRef.current = setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (pageTimerRef.current) {
        clearTimeout(pageTimerRef.current);
      }
    };
  }, []);
  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 mb-4">
        <Form
          name="basic"
          layout="inline"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="地区"
            name="area"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Select placeholder="请选择地区" style={{ width: '200px' }} options={[{ label: '中国', value: 'china' }, { label: '美国', value: 'usa' }]} />
          </Form.Item>

          <Form.Item<FieldType>
            label="IP"
            name="ip"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input placeholder="请输入IP" />
          </Form.Item>

          <Form.Item<FieldType>
            label="日期"
            name="date"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <DatePicker.RangePicker placeholder={['开始日期', '结束日期']} />
          </Form.Item>

          <Form.Item>
            <Flex gap={8}>
              <Button type="primary" htmlType="submit">搜索</Button>
              <Button htmlType="reset" icon={<UndoOutlined />} />
            </Flex>
          </Form.Item>
        </Form>
      </div>
       <div className="min-h-0 flex-1">
        <Table<DataType>
          columns={columns}
          dataSource={pagedData}
          loading={loading}
          scroll={{ y: 'calc(100vh - 260px)' }}
          pagination={{
            current,
            pageSize,
            total,
            showSizeChanger: true,
            onChange: (page, size) => {
              if (size !== pageSize) {
                setCurrent(1);
                setPageSize(size);
                triggerPageLoading();
                return;
              }
              setCurrent(page);
              triggerPageLoading();
            },
            onShowSizeChange: (_page, size) => {
              setCurrent(1);
              setPageSize(size);
              triggerPageLoading();
            },
          }}
        />
      </div>
    </div>
  );
}
