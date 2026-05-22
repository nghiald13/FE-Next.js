import { auth } from '@/auth';
import DashboardContent from '@/components/layouts/dashboard.content';
import UserFooter from '@/components/layouts/user.footer';
import UserHeader from '@/components/layouts/user.header';
import UserSideBar from '@/components/layouts/user.sidebar';
import UserSideNav from '@/components/layouts/user.sidenav';
import { Col, Layout } from 'antd';

const DashboardLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    // const { Content } = Layout
    const session = await auth()

    return (
        <Layout>
            <UserSideNav session={session} />
            <UserSideBar />
            <Layout>
                <UserHeader />
                <DashboardContent>
                    {children}
                </DashboardContent>
                <UserFooter />
            </Layout>
        </Layout>
    )
}

export default DashboardLayout