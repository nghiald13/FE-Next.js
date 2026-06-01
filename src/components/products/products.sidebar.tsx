'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
} from "@/components/ui/sidebar"
import SidebarUserFooter from "../layouts/sidebar.footer"
import BrandLogo from "../layouts/brand-logo"
import { useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"

export function ProductsSidebar(props: any) {
    const searchParams = useSearchParams()
    const router = useRouter()

    const params = queryString.parse(searchParams.toString())
    const manu: string[] = params.manufacturer ? (params.manufacturer as string).split(',') : []
    const handleCheck = (manufacturer: string, checked: boolean) => {
        let m = [...manu]

        if (checked) {
            m.push(manufacturer)
        } else m = m.filter(item => item !== manufacturer)

        const updatedParams = {
            ...params,
            manufacturer: m.length > 0 ? m.join(",") : undefined,
            current: "1"
        }

        router.push(`/products?${queryString.stringify(updatedParams, {
            skipNull: true,
            skipEmptyString: true
        })}`)
    }

    const { listManufacturers, session } = props

    return (
        <Sidebar >
            {/* 🌟 PHẦN HEADER CỦA SIDEBAR */}
            <SidebarHeader className="px-4 py-4 border-b border-sidebar-border">
                <BrandLogo />
            </SidebarHeader>

            {/* 🌟 PHẦN NỘI DUNG CÁC BỘ LỌC */}
            <SidebarContent className="gap-0 p-4 space-y-6">

                {/* Nhóm Lọc 1: Categories */}
                <SidebarGroup className="p-0">
                    <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-0">
                        Manufacturers
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="space-y-3">
                        {listManufacturers.map((manufacturer: any) => {
                            const isChecked = manu.includes(manufacturer)

                            return (
                                <div key={manufacturer} className="flex items-center gap-3">
                                    <Checkbox checked={isChecked} onCheckedChange={(checked) => handleCheck(manufacturer, checked as boolean)} id={`filter-${manufacturer}`} />
                                    <label
                                        htmlFor={`filter-${manufacturer}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
                                    >
                                        {manufacturer}
                                    </label>
                                </div>
                            )
                        })}
                    </SidebarGroupContent>
                </SidebarGroup>

                <Separator className="bg-sidebar-border" />

            </SidebarContent>

            <SidebarUserFooter session={session} />
        </Sidebar>
    )
}