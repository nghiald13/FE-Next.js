'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Minus, Plus, ShieldCheck, Truck, RotateCcw, PackageX, FileText, Settings } from "lucide-react"
import { addToCartAction } from "@/utils/cart.actions"
import { toast } from "sonner"
import RichRenderer from "@/components/products/rich-renderer"
import FloatingCart from "@/components/products/floating-cart"

interface ProductDetailProps {
    product: {
        _id: string;
        name: string;
        price: number;
        manufacturer?: string;
        image?: string;
        descriptionJson?: any;
        specifications?: { key: string; value: string }[];
    } | null;
}

const ProductDetails = (
    { product }: ProductDetailProps,
) => {
    const [quantity, setQuantity] = useState<number>(1)
    const [isAdding, setIsAdding] = useState<boolean>(false)

    // Xử lý fallback khi không tìm thấy hoặc lỗi kết nối sản phẩm
    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center h-[55vh] border border-dashed rounded-2xl border-border bg-card p-8">
                <div className="p-4 bg-destructive/10 rounded-full text-destructive mb-4">
                    <PackageX className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Product parameters missing</h3>
                <p className="text-sm text-muted-foreground mt-1 text-center max-w-sm">
                    Could not load the component details. The item might be archived or server is unreachable.
                </p>
            </div>
        )
    }

    const handleQuantityChange = (type: 'inc' | 'dec') => {
        if (type === 'inc') setQuantity(prev => prev + 1)
        if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1)
    }

    const handleAddToCart = async () => {
        setIsAdding(true)
        try {
            await addToCartAction(product._id, quantity)
            toast.success("Added to cart successfully!", {
                description: <span className="text-foreground">{quantity}x {product.name} has been added</span>,
                position: "top-center"
            })
            window.dispatchEvent(new Event('cart-update'))
        } catch (error) {
            toast.error("Failed to add item to cart.")
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-card p-4 sm:p-6 md:p-8 rounded-2xl border border-border/60 shadow-xs">
            {/* 📸 CỘT TRÁI (Chiếm 5/12 cột PC): Ảnh Sản Phẩm & Khối Cam Kết */}
            <div className="lg:col-span-5 space-y-6">
                <div className="border border-border rounded-2xl overflow-hidden bg-muted/30 p-4 md:p-8 flex items-center justify-center group">
                    <AspectRatio ratio={1} className="w-full relative">
                        <img
                            src={product?.image || "https://images.unsplash.com/photo-1649399337535-afbf61e74cab?q=80&w=1170&auto=format&fit=crop"}
                            alt={product?.name}
                            className="w-full h-full object-contain rounded-xl mix-blend-multiply dark:mix-blend-normal group-hover:scale-102 transition-transform duration-300"
                        />
                    </AspectRatio>
                </div>
            </div>

            <FloatingCart />

            {/* 📝 CỘT PHẢI (Chiếm 7/12 cột PC): Thông tin mua hàng & Tabs Thông số kĩ thuật */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                {/* Khối thông tin cốt lõi */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="font-bold tracking-wider uppercase text-[10px] px-2.5 py-0.5 rounded-md">
                            {product?.manufacturer || "Generic"}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-medium">ID: {product?._id}</span>
                    </div>

                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-tight">
                        {product?.name}
                    </h1>

                    <Separator className="bg-border/60" />

                    {/* Vùng hiển thị Giá */}
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-foreground font-mono tracking-tight">
                            {Number(product?.price || 0).toLocaleString('vi-VN')}
                        </span>
                        <span className="text-sm font-semibold text-muted-foreground font-sans">VND</span>
                        <span className="text-xs text-muted-foreground font-normal ml-2">(Excluding VAT)</span>
                    </div>
                </div>

                {/* Khối cam kết chuẩn B2B kĩ thuật */}
                <div className="p-4 bg-muted/40 rounded-xl border border-border grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-muted-foreground font-medium">
                    <div className="flex items-center gap-2.5 justify-center sm:justify-start">
                        <ShieldCheck className="size-4 text-primary shrink-0" />
                        <div className="leading-tight">
                            <span className="block font-semibold text-foreground">Genuine Parts</span>
                            <span className="text-[10px] text-muted-foreground/70">100% Certified</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2.5 justify-center sm:justify-start border-t sm:border-t-0 sm:border-x border-border sm:px-4">
                        <Truck className="size-4 text-primary shrink-0" />
                        <div className="leading-tight">
                            <span className="block font-semibold text-foreground">Global Shipping</span>
                            <span className="text-[10px] text-muted-foreground/70">Fast & Tracked</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2.5 justify-center sm:justify-start border-t sm:border-t-0">
                        <RotateCcw className="size-4 text-primary shrink-0" />
                        <div className="leading-tight">
                            <span className="block font-semibold text-foreground">Warranty</span>
                            <span className="text-[10px] text-muted-foreground/70">12 Months Standard</span>
                        </div>
                    </div>
                </div>

                {/* Khối thao tác Giỏ hàng bám sát chân */}
                <div className="space-y-4 pt-4 border-t border-border">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">

                        {/* Cụm tăng giảm số lượng */}
                        <div className="flex items-center justify-between sm:justify-start gap-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Qty:</span>
                            <div className="flex items-center border border-border rounded-xl bg-muted p-0.5 h-10 overflow-hidden shadow-2xs">
                                <Button
                                    type="button" variant="ghost" size="icon"
                                    onClick={() => handleQuantityChange('dec')}
                                    className="size-8 rounded-lg hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors"
                                >
                                    <Minus className="size-3.5" />
                                </Button>
                                <span className="w-10 text-center font-mono font-bold text-sm text-foreground select-none">
                                    {quantity}
                                </span>
                                <Button
                                    type="button" variant="ghost" size="icon"
                                    onClick={() => handleQuantityChange('inc')}
                                    className="size-8 rounded-lg hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors"
                                >
                                    <Plus className="size-3.5" />
                                </Button>
                            </div>
                        </div>

                        {/* Nút Đặt hàng chính */}
                        <Button
                            onClick={handleAddToCart}
                            disabled={isAdding}
                            variant="default"
                            className="flex-1 h-11 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all"
                        >
                            <ShoppingCart className="size-4" />
                            <span>{isAdding ? "Adding..." : "Add to Order List"}</span>
                        </Button>
                    </div>
                </div>

            </div>

            {/* 📊 KHỐI TABS: Tách biệt Mô tả văn bản và Bảng thông số kĩ thuật */}
            <div className="lg:col-span-12">
                <Tabs defaultValue="specifications" className="w-full border border-border rounded-xl p-2 bg-muted/20">
                    <TabsList className="grid w-full grid-cols-2 bg-muted p-1 rounded-lg h-9">
                        <TabsTrigger value="specifications" className="text-xs font-semibold flex items-center gap-1.5 data-[state=active]:bg-card data-[state=active]:text-card-foreground data-[state=active]:shadow-xs rounded-md">
                            <Settings className="size-3.5" /> Technical Specs
                        </TabsTrigger>
                        <TabsTrigger value="description" className="text-xs font-semibold flex items-center gap-1.5 data-[state=active]:bg-card data-[state=active]:text-card-foreground data-[state=active]:shadow-xs rounded-md">
                            <FileText className="size-3.5" /> Details Description
                        </TabsTrigger>
                    </TabsList>

                    {/* Tab 1: Bảng thông số kỹ thuật động */}
                    <TabsContent value="specifications" className="mt-4 p-2 focus-visible:outline-hidden">
                        {product?.specifications && product.specifications.length > 0 ? (
                            <div className="border border-border rounded-xl overflow-hidden shadow-2xs bg-card">
                                <table className="w-full text-sm text-left">
                                    <tbody>
                                        {product.specifications.map((spec, index) => (
                                            <tr
                                                key={index}
                                                className={`border-b border-border last:border-0 transition-colors hover:bg-muted/30 ${index % 2 === 0 ? 'bg-card' : 'bg-muted/10'
                                                    }`}
                                            >
                                                <td className="px-4 py-3 font-semibold text-muted-foreground w-1/3 bg-muted/20 text-xs sm:text-sm">
                                                    {spec.key}
                                                </td>
                                                <td className="px-4 py-3 text-foreground font-mono text-xs sm:text-sm">
                                                    {spec.value}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-xs text-muted-foreground italic p-4 text-center">No structural specifications available for this component.</p>
                        )}
                    </TabsContent>

                    {/* Tab 2: Mô tả bài viết Rich Text lấy từ TipTap */}
                    <TabsContent value="description" className="mt-4 bg-card p-4 lg:px-10 border border-border rounded-xl shadow-2xs focus-visible:outline-hidden">
                        <RichRenderer contentJson={product?.descriptionJson} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default ProductDetails