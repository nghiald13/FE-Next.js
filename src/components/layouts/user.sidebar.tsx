'use client'

import { cn } from "@/lib/utils"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    useSidebar
} from "../ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import {
    ChevronRight,
    LayoutDashboard,
    Users,
    Boxes,
    Settings,
    FileText,
    ShieldCheck
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import SidebarUserFooter from "./sidebar.footer"
import BrandLogo from "./brand-logo"

const navigationData = {
    management: [
        { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { title: "Users Management", url: "/dashboard/user", icon: Users },
        { title: "Products Inventory", url: "/dashboard/product", icon: Boxes },
    ],
    // system: [
    //     {
    //         title: "Settings",
    //         url: "/dashboard/settings",
    //         icon: Settings,
    //         hasSub: true,
    //         subMenu: [
    //             { title: "General", url: "/dashboard/settings/general" },
    //             { title: "Roles & Permissions", url: "/dashboard/settings/permissions", icon: ShieldCheck },
    //         ]
    //     },
    //     { title: "Documentation", url: "/dashboard/docs", icon: FileText }
    // ]
}

const UserSideBar = (props: any) => {
    const { session } = props
    const pathname = usePathname()

    return (
        <Sidebar collapsible="offcanvas" variant="sidebar" className="border-r border-border bg-sidebar text-sidebar-foreground">

            {/* HEADER */}
            <SidebarHeader className="px-4 py-4 border-b border-sidebar-border">
                <BrandLogo />
            </SidebarHeader>

            {/* CONTENT MENU */}
            <SidebarContent className="px-3 py-4 space-y-4">

                {/* NHÓM 1: CORE MANAGEMENT */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-2">
                        Core System
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {navigationData.management.map((item) => {
                                const isActive = pathname === item.url
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className={cn(
                                                "w-full justify-start gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground transition-all font-medium duration-200",
                                                "hover:bg-accent hover:text-accent-foreground",
                                                isActive && "bg-primary text-primary-foreground font-semibold hover:bg-primary hover:text-primary-foreground shadow-sm"
                                            )}
                                        >
                                            <Link href={item.url}>
                                                <item.icon className={cn("size-4 shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* NHÓM 2: SYSTEM & HELP */}
                {/* <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-2">
                        Preferences
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {navigationData.system.map((item) => {
                                const isActive = pathname.startsWith(item.url)

                                if (item.hasSub) {
                                    return (
                                        <Collapsible key={item.title} defaultOpen={isActive} className="group/collapsible w-full">
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton className="w-full justify-between gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground font-medium hover:bg-accent hover:text-accent-foreground group-data-[state=open]/collapsible:bg-accent/50">
                                                        <div className="flex items-center gap-3">
                                                            <item.icon className="size-4 shrink-0 text-muted-foreground" />
                                                            <span>{item.title}</span>
                                                        </div>
                                                        <ChevronRight className="size-3.5 text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 ml-auto" />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="pl-4 mt-1 border-l border-border ml-5 space-y-1">
                                                    <SidebarMenuSub className="m-0 p-0 border-none">
                                                        {item.subMenu?.map((sub) => {
                                                            const isSubActive = pathname === sub.url
                                                            return (
                                                                <SidebarMenuSubItem key={sub.title} className="list-none">
                                                                    <Link
                                                                        href={sub.url}
                                                                        className={cn(
                                                                            "block w-full text-sm py-1.5 px-3 rounded-md text-muted-foreground hover:text-foreground transition-colors font-medium",
                                                                            isSubActive && "text-foreground bg-secondary font-semibold"
                                                                        )}
                                                                    >
                                                                        {sub.title}
                                                                    </Link>
                                                                </SidebarMenuSubItem>
                                                            )
                                                        })}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    )
                                }

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={isActive} className={cn("w-full justify-start gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground font-medium hover:bg-accent hover:text-accent-foreground", isActive && "bg-secondary text-secondary-foreground font-semibold")}>
                                            <Link href={item.url}>
                                                <item.icon className="size-4 shrink-0 text-muted-foreground" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup> */}

            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter className="p-4 border-t border-border bg-sidebar">
                <SidebarUserFooter session={session} />
            </SidebarFooter>

        </Sidebar>
    )
}

export default UserSideBar