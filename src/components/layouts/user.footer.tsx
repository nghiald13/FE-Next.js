'use client'
import { Layout } from 'antd';


const { Footer } = Layout;

const UserFooter = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>
        <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{currentYear} Created by Ant UED
        </Footer>
        </>
    )
}

export default UserFooter