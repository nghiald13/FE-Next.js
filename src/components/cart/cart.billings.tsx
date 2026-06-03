'use client'
import { Tag, CreditCard, ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import { processPayment } from "@/utils/cart.actions"
import { toast } from "sonner"

const CartBilling = (props: any) => {
    const { items } = props

    // Tính tổng giá trị đơn hàng sơ bộ
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.amount), 0)
    const shippingFee = 0 // Freeship hoặc phí ship mặc định
    const tax = Math.round(subtotal * 0.08)    // Thuế VAT 8%
    const total = subtotal + shippingFee + tax

    const handlePayment = async () => {
        try {
            await processPayment(total)
        } catch (err: any) {
            toast.error(err.message)
        }
    }

    return (
        <Card className="bg-white border-muted shadow-sm rounded-xl">
            <CardHeader className="p-6 pb-4">
                <CardTitle className="text-lg font-bold tracking-tight text-foreground">Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="p-6 pt-0 space-y-5">

                {/* Nhập mã khuyến mãi */}
                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input placeholder="Mã giảm giá (PROMO)" className="pl-9 h-9 text-sm focus-visible:ring-primary" />
                    </div>
                    <Button variant="outline" size="sm" className="h-9 font-medium px-4">
                        Áp dụng
                    </Button>
                </div>

                <Separator className="bg-slate-100" />

                {/* Các dòng chi tiết chi phí */}
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center text-muted-foreground">
                        <span>Tạm tính (Subtotal)</span>
                        <span className="font-mono font-semibold text-foreground">{subtotal} VND</span>
                    </div>

                    <div className="flex justify-between items-center text-muted-foreground">
                        <span>Phí giao hàng (Shipping)</span>
                        {shippingFee === 0 ? (
                            <span className="text-emerald-600 font-medium text-xs bg-emerald-50 px-2 py-0.5 rounded">Miễn phí</span>
                        ) : (
                            <span className="font-mono font-semibold text-foreground">{shippingFee} VND</span>
                        )}
                    </div>

                    <div className="flex justify-between items-center text-muted-foreground">
                        <span>Thuế ước tính (VAT 8%)</span>
                        <span className="font-mono font-semibold text-foreground">{tax} VND</span>
                    </div>

                    <Separator className="my-2 bg-slate-100" />

                    {/* Tổng cộng cuối cùng */}
                    <div className="flex justify-between items-baseline pt-1">
                        <span className="text-base font-bold text-foreground">Tổng cộng</span>
                        <div className="text-right">
                            <p className="font-mono text-2xl font-extrabold text-primary tracking-tight">
                                {total} VND
                            </p>
                        </div>
                    </div>
                </div>

            </CardContent>

            <CardFooter className="p-6 pt-0">
                {/* Nút hành động thanh toán chính */}
                <Button
                    className="w-full font-semibold group h-11 text-sm shadow-sm hover:opacity-95 active:scale-[0.99] transition-transform"
                    disabled={subtotal === 0}
                    onClick={() => handlePayment()}
                >
                    <CreditCard className="size-4 mr-2" />
                    Tiến hành thanh toán
                    <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </CardFooter>
        </Card>
    )
}

export default CartBilling