'use client'

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ScrollArea } from "../ui/scroll-area"

// 💡 Mock Data danh sách sản phẩm mẫu
const MOCK_PRODUCTS = [
    { id: "1", name: "Wireless Headphones", price: 99, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60" },
    { id: "2", name: "Leather Wallet", price: 45, category: "Accessories", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=60" },
    { id: "3", name: "Mechanical Keyboard", price: 120, category: "Electronics", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60" },
    { id: "4", name: "Running Shoes", price: 85, category: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60" },
    { id: "5", name: "Minimalist Watch", price: 150, category: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60" },
    { id: "6", name: "Travel Backpack", price: 70, category: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60" },
]

const ProductsListPage = (props: any) => {

    const { listProducts } = props

    return (
        <>
            <ScrollArea className="flex flex-col lg:flex-row gap-8 w-full h-[75vh] p-4">
                {/* 🌟 LƯỚI HIỂN THỊ SẢN PHẨM (PRODUCT GRID) */}
                <main className="flex-1">
                    {/* Tự động chia cột linh hoạt: 1 cột di động, 2 cột tablet, 3 cột PC */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {listProducts?.map((product: any) => (
                            /* Bọc Card bằng Link để hướng tới trang chi tiết */
                            <Link href={`/products/${product?._id}`} key={product?._id} className="group block h-full">
                                <Card className="
                  h-full overflow-hidden border border-muted bg-card shadow-sm
                  hover:shadow-md transition-all duration-300 select-none cursor-pointer
                  hover:scale-[1.02] 
                ">
                                    {/* Tỉ lệ khung ảnh 4/3 */}
                                    <AspectRatio ratio={4 / 3} className="bg-muted overflow-hidden relative">
                                        <img
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            src={product?.image ? product?.image : "https://images.unsplash.com/photo-1649399337535-afbf61e74cab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                            alt={product?.name}
                                        />
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-xs font-semibold shadow-xs">
                                            {product?.manufacturer}
                                        </div>
                                    </AspectRatio>

                                    <CardHeader className="p-4 space-y-1">
                                        <CardTitle className="text-base font-semibold tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                                            {product?.name}
                                        </CardTitle>
                                        <CardDescription className="text-sm font-medium text-foreground/90 font-mono">
                                            ${product?.price}.00
                                        </CardDescription>
                                    </CardHeader>

                                    <CardFooter className="p-4 pt-0">
                                        <Button
                                            className="w-full text-xs font-medium"
                                            variant="secondary"
                                            onClick={(e) => {
                                                e.preventDefault(); // 💡 Chặn không cho kích hoạt click của thẻ Link cha
                                                alert(`Added ${product?.name} to cart!`);
                                            }}
                                        >
                                            Add to cart
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </main>
            </ScrollArea>
        </>

    )
}

export default ProductsListPage