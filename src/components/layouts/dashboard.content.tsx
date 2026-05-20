'use client'

import { Layout } from "antd";

const DashboardContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

    const { Content } = Layout
    return (
        <Content>
          Dashboard Content
        </Content>
    )
}

export default DashboardContent