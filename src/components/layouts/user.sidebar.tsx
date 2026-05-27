'use client'

import { cn } from "@/lib/utils"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarProvider, useSidebar } from "../ui/sidebar"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu"

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
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton className="py-5">
                                        <Avatar>
                                            <AvatarImage src="https://pbs.twimg.com/media/G5IXXkfWoAAhjNQ?format=png&name=360x360" alt="username" />
                                        </Avatar>
                                        <div className="grid flex text-left leading-tight ">
                                            <span className="truncate font-medium">{session.user.name}</span>
                                            <span className="truncate text-xs">{session.user.email}</span>
                                        </div>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </>
    )
}

export default UserSideBar