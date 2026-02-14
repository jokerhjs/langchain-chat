"use client";
import { useEffect, useState } from "react";
import {Form, Card, Select, message, Row, Col, Statistic, Spin } from 'antd'



// deekSeekData 数据结构
interface DeekSeekData {
    currency: string
    total_balance: number
    granted_balance: number
    topped_up_balance: number
}

export default function DashboardPage() {
    const [form] = Form.useForm();

    useEffect(() => {
        fetchDeekSeek()
    }, [])

    const [deekSeekData, setDeekSeekData] = useState<DeekSeekData>({
        currency: "",
        total_balance: 0,
        granted_balance: 0,
        topped_up_balance: 0,
    })
    const [loading, setLoading] = useState(false)
    const fetchDeekSeek = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/deekseek')
            const data = await res.json()
            setDeekSeekData({
                currency: data?.balance_infos[0]?.currency,
                total_balance: data?.balance_infos[0]?.total_balance,
                granted_balance: data?.balance_infos[0]?.granted_balance,
                topped_up_balance: data?.balance_infos[0]?.topped_up_balance,
            })
        } catch (error: any) {
            message.error(error.message || '查询失败');
        } finally {
            setLoading(false)
        }
    }

    const queryStatistic = async (key: string) => {
        console.log(key)
        setDeekSeekData({
            currency: "",
            total_balance: 0,
            granted_balance: 0,
            topped_up_balance: 0,
        })
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
                        <Select defaultValue={'deepseek'} onChange={(value) => (queryStatistic(value))} style={{width: 200}} options={[{label: 'DeepSeek', value: 'deepseek'}, {label: '服务2', value: '2'}]} />
                    </Form.Item>

                    
                </Form>
                <Spin spinning={loading} tip="加载中...">
                    <Row gutter={16} className="mt-4">
                        <Col span={8}>
                            <Statistic title={`总的可用余额(${deekSeekData.currency
                        })`} value={deekSeekData.total_balance ?? 0} />
                                            </Col>
                                            <Col span={8}>
                                                <Statistic title={`未过期的赠金余额(${deekSeekData.currency
                        })`} value={deekSeekData.granted_balance ?? 0} />
                                            </Col>
                                            <Col span={8}>
                                                <Statistic title={`充值余额(${deekSeekData.currency
                        })`} value={deekSeekData.topped_up_balance
                        ?? 0} />
                        </Col>
                    </Row>
                </Spin>
            </Card>
        </div>
    )
}