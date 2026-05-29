'use client'

import { useState } from "react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Grid, ListFilter, SlidersHorizontal, Search } from "lucide-react"
import Link from "next/link"

// 💡 Mock Data danh sách sản phẩm mẫu
const MOCK_PRODUCTS = [
    { id: "1", name: "Wireless Headphones", price: 99, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60" },
    { id: "2", name: "Leather Wallet", price: 45, category: "Accessories", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=60" },
    { id: "3", name: "Mechanical Keyboard", price: 120, category: "Electronics", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60" },
    { id: "4", name: "Running Shoes", price: 85, category: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60" },
    { id: "5", name: "Minimalist Watch", price: 150, category: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60" },
    { id: "6", name: "Travel Backpack", price: 70, category: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60" },
]

const ProductsListPage = () => {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">
            {/* 🌟 HỆ THỐNG HEADER TRÊN CÙNG: TIÊU ĐỀ & THANH TÌM KIẾM */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Our Products</h1>
                    <p className="text-muted-foreground mt-1">Explore our curated collection of premium tech and lifestyle goods.</p>
                </div>

                {/* Thanh Search tích hợp Icon */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        className="pl-9 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* 🌟 LƯỚI HIỂN THỊ SẢN PHẨM (PRODUCT GRID) */}
                <main className="flex-1">
                    {/* Tự động chia cột linh hoạt: 1 cột di động, 2 cột tablet, 3 cột PC */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MOCK_PRODUCTS.map((product) => (

                            /* Bọc Card bằng Link để hướng tới trang chi tiết */
                            <Link href={`/products/${product.id}`} key={product.id} className="group block h-full">
                                <Card className="
                  h-full overflow-hidden border border-muted bg-card shadow-sm
                  hover:shadow-md transition-all duration-300 select-none cursor-pointer
                  hover:scale-[1.02] 
                ">
                                    {/* Tỉ lệ khung ảnh 4/3 hoặc 16/9 tùy sở thích */}
                                    <AspectRatio ratio={4 / 3} className="bg-muted overflow-hidden relative">
                                        <img
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            src={product.image}
                                            alt={product.name}
                                        />
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-xs font-semibold shadow-xs">
                                            {product.category}
                                        </div>
                                    </AspectRatio>

                                    <CardHeader className="p-4 space-y-1">
                                        <CardTitle className="text-base font-semibold tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                                            {product.name}
                                        </CardTitle>
                                        <CardDescription className="text-sm font-medium text-foreground/90 font-mono">
                                            ${product.price}.00
                                        </CardDescription>
                                    </CardHeader>

                                    <CardFooter className="p-4 pt-0">
                                        <Button
                                            className="w-full text-xs font-medium"
                                            variant="secondary"
                                            onClick={(e) => {
                                                e.preventDefault(); // 💡 Chặn không cho kích hoạt click của thẻ Link cha
                                                alert(`Added ${product.name} to cart!`);
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
            </div>
        </div>
    )
}

export default ProductsListPage