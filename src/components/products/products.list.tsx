'use client'

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { PackageX } from "lucide-react"
import { toast } from "sonner"
import FloatingCart from "./floating-cart"
import { addToCartAction } from "@/utils/cart.actions"
import ResultsPagination from "../layouts/results-pagination"

const ProductsListPage = ({
    listProducts, meta
}: {
    listProducts: any[],
    meta: any
}
) => {

    const handleAddToCart = async (productId: string) => {
        try {
            await addToCartAction(productId, 1)
            window.dispatchEvent(new Event('cart-update'))
        } catch (error) {
            console.error("Lỗi thêm vào giỏ hàng:", error)
        }
    }

    // List Products Empty
    if (!listProducts || listProducts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] border border-dashed rounded-2xl border-slate-200 bg-white p-8">
                <div className="p-4 bg-amber-50 rounded-full text-amber-500 mb-4">
                    <PackageX className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">No components found</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm text-center">
                    The connection to the catalog database was interrupted or no items match your filters. Please check back shortly.
                </p>
            </div>
        )
    }

    return (
        <>
            <FloatingCart />

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {listProducts.map((product: any) => (
                    <Link href={`/products/${product?._id}`} key={product?._id} className="group block h-full">
                        <Card className="h-full overflow-hidden border border-slate-100 bg-white shadow-xs rounded-2xl group-hover:shadow-md group-hover:border-slate-200 transition-all duration-300 flex flex-col justify-between">

                            <div>
                                <div className="p-2">
                                    <AspectRatio ratio={4 / 3} className="bg-slate-50 overflow-hidden relative rounded-xl">
                                        <img
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            src={product?.image || "https://images.unsplash.com/photo-1649399337535-afbf61e74cab?q=80&w=1170&auto=format&fit=crop"}
                                            alt={product?.name}
                                            loading="lazy"
                                        />
                                        <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow-xs border border-white/40">
                                            {product?.manufacturer || 'Generic'}
                                        </div>
                                    </AspectRatio>
                                </div>

                                <CardHeader className="px-4 py-2 space-y-1">
                                    <CardTitle className="text-sm md:text-base font-semibold text-slate-800 line-clamp-2 min-h-[2.5rem] group-hover:text-blue-600 transition-colors duration-200">
                                        {product?.name}
                                    </CardTitle>
                                    <CardDescription className="text-base font-bold text-slate-900 font-mono">
                                        {Number(product?.price || 0).toLocaleString('vi-VN')} <span className="text-xs text-slate-400 font-sans font-normal">VND</span>
                                    </CardDescription>
                                </CardHeader>
                            </div>

                            <div className="p-4 pt-0">
                                <Button
                                    className="w-full text-xs font-semibold h-9 rounded-xl bg-slate-50 hover:bg-primary text-slate-700 hover:text-white border border-slate-200/60 hover:border-transparent transition-all duration-200"
                                    variant="ghost"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleAddToCart(product?._id)
                                        toast.success("Added to cart", {
                                            description: <span className="text-black">1x {product.name} has been added.</span>,
                                            position: "top-center"
                                        })
                                    }}
                                >
                                    Add to cart
                                </Button>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            {/** Pagination */}
            <ResultsPagination url="/products" meta={meta} />
        </>
    )
}

export default ProductsListPage