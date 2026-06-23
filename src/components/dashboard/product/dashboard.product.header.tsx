'use client'

import { Button } from "@/components/ui/button"
import { Package, FileDown, Plus } from "lucide-react"

const ManageProductsHeader = () => {

    return (
        <>
            {/* 1. TOP HEADER BAR */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-2 border-b border-border/60">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Package className="size-6 text-primary" /> Quản lý sản phẩm
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Xem danh sách, cập nhật thông số kỹ thuật và quản lý bộ lọc sản phẩm B2B.
                    </p>
                </div>

                {/* Nhóm nút hành động nhanh */}
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-9 gap-1.5 hidden sm:flex">
                        <FileDown className="size-4" /> Xuất Excel
                    </Button>
                    <Button size="sm" className="h-9 gap-1.5 font-semibold shadow-xs">
                        <Plus className="size-4" /> Thêm sản phẩm
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ManageProductsHeader