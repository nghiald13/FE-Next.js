'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    Search, Edit2, Trash2,
    Filter, ArrowUpDown, Layers, AlertCircle
} from "lucide-react"
import ResultsPagination from "@/components/layouts/results-pagination"

export default function ManageProductsList(props: any) {
    const { listProducts, meta } = props
    // Dữ liệu giả lập mẫu để hiển thị UI
    // const mockProducts = [
    //     { id: "PROD-001", name: "Linear Guide Way HGR20", manufacturer: "Hiwin (Taiwan)", price: 1250000, stock: 45, status: "In Stock" },
    //     { id: "PROD-002", name: "Ball Screw SFU1605 - 1000mm", manufacturer: "TBI Motion", price: 850000, stock: 12, status: "Low Stock" },
    //     { id: "PROD-003", name: "AC Servo Motor 400W", manufacturer: "Yaskawa (Japan)", price: 4200000, stock: 0, status: "Out of Stock" },
    // ];

    return (
        <>
            {/* 3. FILTER & SEARCH CONTROL BAR */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-muted/30 p-3 rounded-xl border border-border/80">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            placeholder="Tìm theo tên sản phẩm, mã ID hoặc hãng..."
                            className="pl-9 bg-card h-9 border-border/80"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-9 gap-1.5 bg-card">
                        <Filter className="size-3.5" /> Hãng sản xuất
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 gap-1.5 bg-card">
                        <Layers className="size-3.5" /> Trạng thái
                    </Button>
                </div>
            </div>

            {/* 4. MAIN DATA TABLE BLOCK */}
            <div className="border border-border rounded-xl overflow-hidden bg-card shadow-xs">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-border bg-muted/50 hover:bg-muted/50">
                            {/* <TableHead className="w-[100px] font-semibold text-muted-foreground">Mã ID</TableHead> */}
                            <TableHead className="w-[80px] font-semibold text-muted-foreground">Ảnh</TableHead>
                            <TableHead className="font-semibold text-muted-foreground min-w-[200px]">
                                <span className="flex items-center gap-1 cursor-pointer select-none hover:text-foreground">
                                    Tên sản phẩm <ArrowUpDown className="size-3" />
                                </span>
                            </TableHead>
                            <TableHead className="font-semibold text-muted-foreground">Hãng sản xuất</TableHead>
                            <TableHead className="font-semibold text-muted-foreground text-right">
                                <span className="flex items-center gap-1 justify-end cursor-pointer select-none hover:text-foreground">
                                    Giá bán (VND) <ArrowUpDown className="size-3" />
                                </span>
                            </TableHead>
                            <TableHead className="font-semibold text-muted-foreground text-center">Kho hàng</TableHead>
                            <TableHead className="font-semibold text-muted-foreground text-center">Trạng thái</TableHead>
                            <TableHead className="w-[100px] font-semibold text-center text-muted-foreground">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {listProducts.map((product: any) => (
                            <TableRow key={product._id} className="border-b border-border/60 last:border-0 hover:bg-muted/20 transition-colors">
                                {/* ID
                                <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                                    {product.id}
                                </TableCell> */}

                                {/* Ảnh */}
                                <TableCell>
                                    <div className="size-10 bg-muted/40 border border-border/80 rounded-md p-1 flex items-center justify-center overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1649399337535-afbf61e74cab?q=80&w=120&auto=format&fit=crop"
                                            alt={product.name}
                                            className="max-size-full object-contain mix-blend-multiply dark:mix-blend-normal"
                                        />
                                    </div>
                                </TableCell>

                                {/* Tên */}
                                <TableCell className="font-medium text-sm text-foreground max-w-[300px] truncate">
                                    {product.name}
                                </TableCell>

                                {/* Hãng */}
                                <TableCell>
                                    <Badge variant="secondary" className="font-medium tracking-wide uppercase text-[10px] px-2 py-0.5 rounded-sm">
                                        {product.manufacturer}
                                    </Badge>
                                </TableCell>

                                {/* Giá */}
                                <TableCell className="text-right font-mono font-bold text-sm text-foreground">
                                    {product.price.toLocaleString('vi-VN')}
                                </TableCell>

                                {/* Kho hàng */}
                                <TableCell className="text-center font-mono text-sm text-muted-foreground">
                                    {product.in_stock}
                                </TableCell>

                                {/* Trạng thái */}
                                <TableCell className="text-center">
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${product.status === "In Stock" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                                        product.status === "Low Stock" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                                            "bg-destructive/10 text-destructive"
                                        }`}>
                                        {product.status === "Low Stock" && <AlertCircle className="size-3 shrink-0" />}
                                        {product.status}
                                    </span>
                                </TableCell>

                                {/* Hành động */}
                                <TableCell>
                                    <div className="flex justify-center gap-1">
                                        <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground">
                                            <Edit2 className="size-3.5" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="size-8 text-destructive hover:bg-destructive/10">
                                            <Trash2 className="size-3.5" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <ResultsPagination
                url={`/dashboard/product`}
                current={1}
                meta={{ totalItems: 1234, totalPages: 3 }}
            />
        </>
    )
}