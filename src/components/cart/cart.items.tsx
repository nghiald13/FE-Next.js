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

        // Chạy ngầm tác vụ cập nhật cookie và làm mới dữ liệu Server
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
                <p className="text-muted-foreground text-sm">Giỏ hàng của bạn đang trống rỗng.</p>
            </Card>
        )
    }

    return (
        <>
            <Toaster />
            <div className="space-y-4">
                {items.map((item) => (
                    <Card key={item._id} className="overflow-hidden bg-white border-muted shadow-xs hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">

                            {/* 1. Ảnh sản phẩm */}
                            <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                                <img
                                    src={item?.image || "https://images.unsplash.com/photo-1649399337535-afbf61e74cab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* 2. Tên & Thương hiệu */}
                            <div className="flex-1 min-w-0 space-y-1">
                                <span className="inline-block text-[10px] uppercase tracking-wider font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                                    {item.manufacturer}
                                </span>
                                <h3 className="font-semibold text-base text-foreground tracking-tight line-clamp-1">
                                    {item.name}
                                </h3>
                                <p className="text-sm font-medium font-mono text-muted-foreground sm:hidden">
                                    {item.price} VND / cái
                                </p>
                            </div>

                            {/* 3. Cụm điều khiển số lượng & Giá thành toán */}
                            <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-dashed border-slate-100">

                                {/* Tăng giảm số lượng */}
                                <CartAmountControl
                                    productId={item._id}
                                    initialAmount={item.amount}
                                    onAmountChange={(targetQty) => handleQuantityChange(item._id, targetQty)}
                                    disabled={isPending}
                                />

                                {/* Tổng giá (Đơn giá * Số lượng) */}
                                <div className="text-right min-w-[90px]">
                                    <p className="font-mono font-bold text-base text-foreground">
                                        {item.price * item.amount} VND
                                    </p>
                                    <p className="text-xs text-muted-foreground hidden sm:block font-mono">
                                        {item.price} VND / cái
                                    </p>
                                </div>

                                {/* Nút xóa item */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 h-9 w-9 shrink-0 transition-colors"
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