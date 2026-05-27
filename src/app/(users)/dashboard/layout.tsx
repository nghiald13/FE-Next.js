import { auth } from '@/auth';
import UserSideBar from '@/components/layouts/user.sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const DashboardLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const session = await auth()

    return (
        <>
            <SidebarProvider>
                <UserSideBar session={session} />
                <SidebarTrigger />
                <SidebarInset>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </>

    )
}

export default DashboardLayout