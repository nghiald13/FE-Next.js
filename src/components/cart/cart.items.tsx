'use client'
import { Megaphone, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { updateCartQuantityAction } from "@/utils/cart.actions"
import { useTransition } from "react"
import CartAmountControl from "./cart.amount.control"
import { toast } from "sonner"
import { Toaster } from "../ui/sonner"

interface CartItemsProps {
    items: any[]
}

const CartItems = (props: CartItemsProps) => {
    const [isPending, startTransition] = useTransition();

    const handleQuantityChange = (productId: string, targetQty: number) => {
        startTransition(async () => {
            await updateCartQuantityAction(productId, targetQty);
        });
    };

    const handleItemDelete = (_id: string) => {
        const currentToast = toast("Confirm removing an item from cart!", {
            icon: <Megaphone />,
            position: "top-center",
            description: <p className="text-black">You are removing an item from cart. Proceed?<br /><span className="italic">(dismiss this notification if you are unsure)</span></p>,
            action: {
                label: "Confirm",
                onClick: async () => {
                    await updateCartQuantityAction(_id, 0)
                    toast.success("Removed an item from cart", { id: currentToast })
                }
            }
        })
    }

    const { items } = props

    if (items.length === 0) {
        return (
            <Card className="border-dashed border-2 py-16 text-center">
                <p className="text-muted-foreground text-sm">Woopsh! There is nothing here! I should continue shopping</p>
            </Card>
        )
    }

    return (
        <>
            <Toaster />
            <div className="space-y-4">
                {items.map((item) => (
                    <Card key={item._id} className="relative overflow-hidden bg-white border-muted shadow-xs hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex flex-row items-center gap-4">

                            {/* 1. Ảnh sản phẩm */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                                <img
                                    src={item?.image || "https://images.unsplash.com/photo-1649399337535-afbf61e74cab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Cụm thông tin & Điều khiển chính */}
                            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6">

                                {/* 2. Tên & Thương hiệu */}
                                <div className="space-y-1 pr-8 sm:pr-0">
                                    <span className="inline-block text-[10px] uppercase tracking-wider font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                                        {item.manufacturer}
                                    </span>
                                    <h3 className="font-semibold text-sm sm:text-base text-foreground tracking-tight line-clamp-2 sm:line-clamp-1">
                                        {item.name}
                                    </h3>
                                    <span className="text-xs text-muted-foreground italic block">Left in stock: {item.in_stock}</span>
                                </div>

                                {/* 3. Cụm điều khiển số lượng & Giá thành toán (Tối ưu Responsive tại đây) */}
                                <div className="flex flex-row items-center justify-between sm:justify-end gap-4 sm:gap-8 pt-2 sm:pt-0 border-t sm:border-t-0 border-dashed border-slate-100">

                                    {/* Bộ tăng giảm số lượng */}
                                    <div className="shrink-0">
                                        <CartAmountControl
                                            productId={item._id}
                                            initialAmount={item.quantity}
                                            onAmountChange={(targetQty) => handleQuantityChange(item._id, targetQty)}
                                            disabled={isPending}
                                        />
                                    </div>

                                    {/* Thành tiền */}
                                    <div className="text-right min-w-[100px] shrink-0">
                                        <p className="font-mono font-bold text-sm sm:text-base text-foreground">
                                            {Number(item.price * item.quantity).toLocaleString('vi-VN')} VND
                                        </p>
                                        <p className="text-[11px] sm:text-xs text-muted-foreground font-mono">
                                            {Number(item.price).toLocaleString('vi-VN')} VND each
                                        </p>
                                    </div>
                                </div>

                            </div>

                            {/* 4. Nút xóa ghim cố định ở góc phải trên Mobile, về hàng dọc trên Desktop */}
                            <div className="absolute top-2 right-2 sm:relative sm:top-0 sm:right-0">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 h-8 w-8 sm:h-9 sm:w-9 shrink-0 transition-colors rounded-full"
                                    onClick={() => handleItemDelete(item._id)}
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>

                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default CartItems