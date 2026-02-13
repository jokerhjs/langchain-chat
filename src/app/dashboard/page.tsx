"use client";
import { useEffect, useState } from "react";
import {Form, Card, Select, message, Row, Col, Statistic } from 'antd'

export default function DashboardPage() {
    const [form] = Form.useForm();

    useEffect(() => {
        fetchDeekSeek()
    }, [])

    const [deekSeekData, setDeekSeekData] = useState<any>({})
    const fetchDeekSeek = async () => {
        try {
            const res = await fetch('/api/deekseek')
            const data = await res.json()
            setDeekSeekData(data)
        } catch (error: any) {
            message.error(error.message || '查询失败');
        }
    }

    const queryStatistic = async (key: string) => {
        switch(key) {
            case 'deepseek':
                fetchDeekSeek();
                break;
            default:
                return null;
        }
    }
    return (
        <div>
            <Card title="服务信息"> 
                <Form form={form} layout="inline">
                    <Form.Item label="服务商" name="name">
                        <Select defaultValue={'deepseek'} onChange={(value) => (queryStatistic(value))} style={{width: 200}} options={[{label: 'DeepSeek', value: '1'}, {label: '服务2', value: '2'}]} />
                    </Form.Item>

                    
                </Form>
                <Row gutter={16} className="mt-4">
                    <Col span={8}>
                        <Statistic title={`总的可用余额(${deekSeekData?.balance_infos[0]?.currency
})`} value={deekSeekData?.balance_infos[0]?.total_balance ?? 0} />
                    </Col>
                    <Col span={8}>
                        <Statistic title={`未过期的赠金余额(${deekSeekData?.balance_infos[0]?.currency
})`} value={deekSeekData?.balance_infos[0]?.granted_balance ?? 0} />
                    </Col>
                    <Col span={8}>
                        <Statistic title={`充值余额(${deekSeekData?.balance_infos[0]?.currency
})`} value={deekSeekData?.balance_infos[0]?.topped_up_balance
 ?? 0} />
                    </Col>
                </Row>
            </Card>
        </div>
    )
}