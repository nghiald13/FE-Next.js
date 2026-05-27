import { auth } from '@/auth';
import UserSideBar from '@/components/layouts/user.sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const DashboardLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const session = await auth()

    return (
        <>
            <div className='grid grid-cols-12'>
                <div className='col-span-3'>
                    <SidebarProvider>
                        <UserSideBar session={session} />
                        <SidebarTrigger />
                    </SidebarProvider>
                </div>
                <div className='col-span-9 justify-center place-items-center'>
                    {children}
                </div>
            </div>
        </>

    )
}

export default DashboardLayout