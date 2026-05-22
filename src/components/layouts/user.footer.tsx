'use client'
import { Layout } from 'antd';


const { Footer } = Layout;

const UserFooter = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                Le Dai Nghia ©{currentYear}
            </Footer>
        </>
    )
}

export default UserFooter