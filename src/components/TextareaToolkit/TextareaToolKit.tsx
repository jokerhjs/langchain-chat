'use client';

import { Input, Button, Dropdown  } from "antd";
import { ArrowUpOutlined, PlusOutlined, FileAddOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { TextAreaProps } from "antd/es/input";
import type { MenuProps } from 'antd';

interface ToolKitProps {
    children?: React.ReactNode;
    value: string;
    textareaProps: TextAreaProps;
    textareaClass: string;
    isLoading?: boolean;
    childToolMenus: MenuProps['items'];
    onSubmit: () => void;
    onTextChange: (val: string) => void
}

const { TextArea } = Input;
export default function TextareaToolKit(props: ToolKitProps) {
    const { children, onSubmit, value, onTextChange, textareaClass, textareaProps, isLoading, childToolMenus = [
        
    ] } = props
    const [message, setMessage] = useState(value);

    useEffect(() => {
        onTextChange(message);
    }, [message]);

    const handleSubmit = () => {
        onSubmit();
    }
    return (
        <div className="flex flex-col gap-2 w-full">
            <TextArea onPressEnter={() => handleSubmit()} autoSize style={{border: 'none', outline: 'none', boxShadow: 'none'}} value={message} className={textareaClass} {...textareaProps} onChange={(e) => setMessage(e.target.value)} />
            <div className="flex justify-between">
                <div className="tools">
                    <Dropdown menu={{ items: [
                        {
                            key: 'fujian',
                            label: (
                                <Button type="link" icon={<FileAddOutlined />}>添加附件</Button>
                            )
                        },
                        ...childToolMenus,
                    ] }} trigger={['click']}>
                        <Button type="link" icon={<PlusOutlined />} />
                    </Dropdown>
                    {children}
                </div>
                
                <Button loading={isLoading} disabled={message.trim() === ''} type="primary" shape="circle" onClick={onSubmit} icon={<ArrowUpOutlined />} />
            </div>
        </div>
    )
}