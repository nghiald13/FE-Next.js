import { auth } from "@/auth"
import SidebarUserFooter from "@/components/layouts/sidebar.footer"
import SidebarBrandHeader from "@/components/layouts/sidebar.header"
import { Sidebar, SidebarContent, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ReactNode } from "react"

export const metadata = {
    title: "Mecsu Platform | My Orders",
    description: "Manage and track your industrial procurement invoices",
}

export default async function OrdersLayout({ children }: { children: ReactNode }) {
    const session = await auth()
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarBrandHeader/>
                <SidebarContent></SidebarContent>
                <SidebarUserFooter session={session} />
            </Sidebar>
            <SidebarTrigger className="sticky top-0" />
            <SidebarInset>
                <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950/50">
                    <div className="container mx-auto px-4 py-8 max-w-7xl">
                        {children}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}