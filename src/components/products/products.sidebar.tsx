'use client'

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { SlidersHorizontal } from "lucide-react"
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
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarImage } from "../ui/avatar"

export function ProductsSidebar(props: any) {

    const { session } = props

    return (
        <Sidebar >
            {/* 🌟 PHẦN HEADER CỦA SIDEBAR */}
            <SidebarHeader className="px-4 py-4 border-b border-sidebar-border">
                <div className="flex items-center gap-2 font-semibold text-base text-sidebar-foreground">
                    <SlidersHorizontal className="size-4" />
                    <span>Filters</span>
                </div>
            </SidebarHeader>

            {/* 🌟 PHẦN NỘI DUNG CÁC BỘ LỌC */}
            <SidebarContent className="gap-0 p-4 space-y-6">

                {/* Nhóm Lọc 1: Categories */}
                <SidebarGroup className="p-0">
                    <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-0">
                        Categories
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="space-y-3">
                        {["Electronics", "Accessories", "Footwear"].map((category) => (
                            <div key={category} className="flex items-center gap-3">
                                <Checkbox id={`filter-${category}`} defaultChecked />
                                <label
                                    htmlFor={`filter-${category}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
                                >
                                    {category}
                                </label>
                            </div>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>

                <Separator className="bg-sidebar-border" />

                {/* Nhóm Lọc 2: Price Range */}
                <SidebarGroup className="p-0">
                    <div className="flex justify-between items-center mb-4">
                        <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-0">
                            Price Range
                        </SidebarGroupLabel>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-muted">
                            0 - 200
                        </span>
                    </div>
                    <SidebarGroupContent className="px-1">
                        <Slider
                            defaultValue={[0, 200]}
                            max={200}
                            step={5}
                            className="py-2"
                        />
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter>
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
            </SidebarFooter>
        </Sidebar>
    )
}