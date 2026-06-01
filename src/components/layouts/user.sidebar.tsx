'use client'

import { cn } from "@/lib/utils"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarProvider, useSidebar } from "../ui/sidebar"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu"
import SidebarUserFooter from "./sidebar.footer"

const UserSideBar = (props: any) => {
    const { session } = props
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar()


    return (
        <>
            <Sidebar className="" collapsible="offcanvas" variant="sidebar">

                {/* ================= The header of sidebar ================= */}
                <SidebarHeader>

                </SidebarHeader>

                {/* ================= The content of sidebar ================= */}
                <SidebarContent>
                    <Collapsible defaultOpen={false}>
                        <SidebarGroup>
                            <SidebarGroupLabel asChild>
                                <CollapsibleTrigger>
                                    Help
                                    <ChevronDown />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent>Content goes here</SidebarGroupContent>
                                <SidebarGroupContent>Content goes here</SidebarGroupContent>
                                <SidebarGroupContent>Content goes here</SidebarGroupContent>
                                <SidebarGroupContent>Content goes here</SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>

                    </Collapsible>
                </SidebarContent>

                {/* ================= The footer of sidebar ================= */}
                <SidebarUserFooter session={session} />
            </Sidebar>
        </>
    )
}

export default UserSideBar