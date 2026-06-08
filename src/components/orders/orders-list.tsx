'use client'

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Search, CreditCard, Eye, SlidersHorizontal } from "lucide-react"
import { formatCurrency } from "@/utils/helper"
import { useRouter } from "next/navigation"

// Hàm định dạng Badge Trạng thái chuẩn UI/UX
function getStatusBadge(status: any) {
    const config: any = {
        PENDING: { text: "Pending", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200" },
        PAID: { text: "Paid", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200" },
        SHIPPING: { text: "Shipping", className: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200" },
        COMPLETED: { text: "Completed", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200" },
        FAILED: { text: "Failed/Cancelled", className: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200" },
    }
    const current = config[status] || { text: status, className: "" }
    return <Badge variant="outline" className={current.className}>{current.text}</Badge>
}


export function OrderListClient(props: any) {
    const router = useRouter()
    const { initialOrders } = props
    const [orders] = useState(initialOrders)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("ALL")

    // Lọc dữ liệu Realtime ở Client
    const filteredOrders = orders.filter((order: any) => {
        const matchesSearch = order.orderCode.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = statusFilter === "ALL" || order.status === statusFilter
        return matchesSearch && matchesStatus
    })

    return (
        <div className="space-y-4">
            {/* BỘ LỌC TÌM KIẾM & TRẠNG THÁI */}
            <Card className="border-border bg-background shadow-sm">
                <CardContent className="p-4 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by invoice ID (e.g. ORD_...)"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 bg-background"
                        />
                    </div>
                    <div className="flex gap-2 min-w-[160px]">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="bg-background">
                                <SlidersHorizontal className="size-3.5 mr-2 text-muted-foreground" />
                                <SelectValue placeholder="All Statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Statuses</SelectItem>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="PAID">Paid</SelectItem>
                                <SelectItem value="SHIPPING">Shipping</SelectItem>
                                <SelectItem value="COMPLETED">Completed</SelectItem>
                                <SelectItem value="FAILED">Failed/Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-border bg-background shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/40">
                            <TableRow>
                                <TableHead className="font-semibold w-[160px]">Invoice ID</TableHead>
                                <TableHead className="font-semibold">Method</TableHead>
                                <TableHead className="font-semibold">Amount</TableHead>
                                <TableHead className="font-semibold">Date</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                                <TableHead className="w-[80px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order: any) => (
                                    <TableRow key={order.orderCode} className="hover:bg-muted/30 transition-colors">
                                        <TableCell className="font-mono font-medium text-slate-900 dark:text-zinc-100">
                                            {order.orderCode}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <CreditCard className="size-3.5 text-slate-400" />
                                                {order.paymentMethod}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-semibold text-slate-900 dark:text-zinc-100">
                                            {formatCurrency(order.totalAmount)}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                year: 'numeric', month: 'short', day: 'numeric'
                                            })}
                                        </TableCell>
                                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="size-8 p-0 hover:bg-muted">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40 border-border bg-popover">
                                                    <DropdownMenuLabel className="text-xs text-muted-foreground">Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer gap-2"
                                                        onClick={() => {
                                                            router.push(`/order/${order._id}`)
                                                        }}
                                                    >
                                                        <Eye className="size-3.5 text-muted-foreground" /> View Details
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                        No invoices or matching orders found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    )
}