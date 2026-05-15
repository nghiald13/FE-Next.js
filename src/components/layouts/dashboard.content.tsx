'use client'

import { Layout } from "antd";

const DashboardContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

    const { Content } = Layout
    return (
        <Content style={{ margin: '24px 16px 0' }}>
                <div
                    style={{
                    padding: 24,
                    minHeight: 360,
                    background: '#CCC',
                    borderRadius: '#CCC',
                    }}
                >
                    Dashboard Content
                </div>
            </Content>
    )
}

export default DashboardContent