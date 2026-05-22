'use client'

import { cn } from "@/lib/utils"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarProvider } from "../ui/sidebar"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu"

const UserSideBar = () => {
    return (
        <>
            <SidebarProvider>
                <Sidebar collapsible="offcanvas" variant="sidebar">

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
                                                <span className="truncate font-medium">Le Dai Nghia Le Dai Nghia Le Dai Nghia</span>
                                                <span className="truncate text-xs">threesixes.ldn@gmail.com</span>
                                            </div>
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>

                </Sidebar>
            </SidebarProvider>

            {/* <div className="flex justify-center">
            <Input className="w-[80vw] lg:w-[50vw]" />
        </div> */}

        </>
    )
}

export default UserSideBar