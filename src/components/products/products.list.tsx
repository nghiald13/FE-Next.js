'use client'

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ScrollArea } from "../ui/scroll-area"
import { ShoppingCart } from "lucide-react"
import { addToCartAction } from "@/utils/cart.actions"
import { useEffect, useState } from "react"
import { getCookie } from "cookies-next/client"
import { toast } from "sonner"

const ProductsListPage = (props: any) => {

    const { listProducts } = props

    useEffect(() => {
        const cartCookie = getCookie('anonymous_cart')
        if (cartCookie) {
            try {
                const cart = JSON.parse(cartCookie as string)
                setCartAmount(cart.length)
            } catch (e) {
                setCartAmount(0)
            }
        }
    }, [])

    const [cartAmount, setCartAmount] = useState<number>(0)

    const handleAddToCart = async (productId: string) => {
        await addToCartAction(productId, 1)
        setCartAmount(prev => prev + 1)
    }

    return (
        <>
            {/** Sticky Cart */}
            <div className="fixed top-5 right-5 z-50">
                <Link href="/cart">
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full w-14 h-14 bg-white shadow-lg relative hover:scale-105 transition-transform"
                    >
                        <ShoppingCart className="size-6 text-foreground" />

                        {cartAmount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground font-mono font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-sm animate-in zoom-in duration-200">
                                {cartAmount}
                            </span>
                        )}
                    </Button>
                </Link>
            </div>

            <ScrollArea className="flex flex-col lg:flex-row gap-8 w-full h-[75vh] p-4">
                {/* 🌟 LƯỚI HIỂN THỊ SẢN PHẨM (PRODUCT GRID) */}
                <main className="flex-1">
                    {/* Tự động chia cột linh hoạt: 1 cột di động, 2 cột tablet, 3 cột PC */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {listProducts?.map((product: any) => (
                            /* Bọc Card bằng Link để hướng tới trang chi tiết */
                            <Link href="#" key={product?._id} className="group block h-full">
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
                                            {Number(product?.price).toLocaleString('vi-VN')} VND
                                        </CardDescription>
                                    </CardHeader>

                                    <CardFooter className="p-4 pt-0 bg-white">
                                        <Button
                                            className="w-full text-xs font-medium"
                                            variant="secondary"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleAddToCart(product._id)
                                                toast.success("An item has been added to your cart", {
                                                    description: <span className="text-black">{product.name} * 1 added</span>,
                                                    position: "top-center"
                                                })
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
            </ScrollArea >
        </>

    )
}

export default ProductsListPage