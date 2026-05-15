import DashboardContent from '@/components/layouts/dashboard.content';
import UserFooter from '@/components/layouts/user.footer';
import UserHeader from '@/components/layouts/user.header';
import UserSideNav from '@/components/layouts/user.sidenav';
import { Layout } from 'antd';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

    return (
        <Layout>
        <UserHeader />
        <Layout>
            <UserSideNav/>
            <DashboardContent>
                {children}
            </DashboardContent>
        </Layout>
        <UserFooter />
        </Layout>
    )
}

export default DashboardLayout