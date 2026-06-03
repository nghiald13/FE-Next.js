'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import Link from 'next/link'
import { CheckCircle2, XCircle, Loader2, ShoppingBag, ArrowRight, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function CheckoutResultPage(props: any) {
    const [isPending, startTransition] = useTransition()
    const [dbStatus, setDbStatus] = useState<'LOADING' | 'PAID' | 'FAILED'>('LOADING')

    const {
        partnerCode, orderId, requestId,
        amount, orderInfo, orderType,
        transId, resultCode, message,
        payType, responseTime, extraData, signature
    } = props


    const isMomoSuccess = resultCode === '0'

    // 2. Đồng bộ và kiểm tra trạng thái thực tế phía NestJS Backend (Đảm bảo an toàn)
    useEffect(() => {
        if (!isMomoSuccess) {
            setDbStatus('FAILED')
            return
        }

        // Gọi API ngầm về NestJS để xác nhận đơn hàng này thực sự đã chuyển trạng thái PAID chưa
        startTransition(async () => {
            try {
                const res = await fetch(`http://localhost:3333/api/v1/orders/${orderId}/status`, {
                    cache: 'no-store'
                })
                const data = await res.json()

                if (data?.status === 'PAID') {
                    setDbStatus('PAID')
                } else {
                    setDbStatus('LOADING') // Có thể Webhook IPN từ MoMo sang NestJS đang bị trễ chậm vài giây
                }
            } catch (error) {
                console.error('Lỗi kiểm tra đơn hàng từ Backend:', error)
                setDbStatus('LOADING')
            }
        })
    }, [orderId, isMomoSuccess])

    // Hàm cho phép người dùng bấm kiểm tra lại nếu IPN webhook bị trễ
    const handleRecheckStatus = () => {
        if (!orderId) return
        setDbStatus('LOADING')
        startTransition(async () => {
            try {
                const res = await fetch(`http://localhost:3333/api/v1/orders/${orderId}/status`)
                const data = await res.json()
                if (data?.status === 'PAID') setDbStatus('PAID')
                else setDbStatus('FAILED')
            } catch {
                setDbStatus('FAILED')
            }
        })
    }

    return (
        <div className="min-h-screen w-full bg-slate-50/50 flex flex-col items-center justify-center p-4 md:p-8">
            <Card className="w-full max-w-md border-muted/60 shadow-xl overflow-hidden bg-white animate-in fade-in-50 zoom-in-95 duration-300">

                {/* HEADER: Trạng thái thanh toán tổng quan */}
                <CardHeader className="text-center pb-4 pt-8">
                    <div className="flex justify-center mb-4">
                        {isMomoSuccess ? (
                            dbStatus === 'PAID' ? (
                                <div className="p-3 bg-emerald-50 rounded-full text-emerald-500 animate-bounce">
                                    <CheckCircle2 className="size-16" strokeWidth={1.5} />
                                </div>
                            ) : (
                                <div className="p-3 bg-amber-50 rounded-full text-amber-500 animate-spin">
                                    <Loader2 className="size-16" strokeWidth={1.5} />
                                </div>
                            )
                        ) : (
                            <div className="p-3 bg-rose-50 rounded-full text-rose-500">
                                <XCircle className="size-16" strokeWidth={1.5} />
                            </div>
                        )}
                    </div>

                    <CardTitle className="text-2xl font-bold tracking-tight">
                        {isMomoSuccess
                            ? (dbStatus === 'PAID' ? 'Thanh toán thành công!' : 'Đang xử lý giao dịch...')
                            : 'Thanh toán thất bại'}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1 px-4">
                        {isMomoSuccess
                            ? (dbStatus === 'PAID' ? 'Cảm ơn bạn đã mua sắm. Đơn hàng của bạn đã được xác nhận.' : 'Hệ thống đang chờ phản hồi xác thực từ Ví MoMo.')
                            : (message || 'Giao dịch đã bị hủy hoặc không thể hoàn tất.')}
                    </CardDescription>
                </CardHeader>

                {/* CONTENT: Thông tin chi tiết hóa đơn đơn hàng */}
                <CardContent className="space-y-4 px-6">
                    <div className="rounded-xl bg-slate-50 p-4 border border-slate-100/80 space-y-3 text-sm font-medium">
                        <div className="flex justify-between items-center text-muted-foreground">
                            <span>Mã đơn hàng</span>
                            <span className="text-foreground font-mono select-all bg-white px-2 py-0.5 border border-slate-200/60 rounded-md text-xs">
                                {orderId || 'N/A'}
                            </span>
                        </div>

                        <div className="flex justify-between items-center text-muted-foreground">
                            <span>Phương thức</span>
                            <span className="text-foreground flex items-center gap-1.5 font-semibold">
                                <span className="w-2 h-2 rounded-full bg-pink-500 inline-block"></span>
                                Ví điện tử MoMo
                            </span>
                        </div>

                        {amount && (
                            <div className="flex justify-between items-center text-muted-foreground pt-2 border-t border-slate-200/60">
                                <span className="text-foreground font-semibold">Tổng thanh toán</span>
                                <span className="text-xl font-bold text-red-500 font-mono">
                                    {Number(amount).toLocaleString('vi-VN')} VND
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Cảnh báo an toàn nếu hệ thống chưa đồng bộ kịp dữ liệu */}
                    {isMomoSuccess && dbStatus === 'LOADING' && (
                        <Alert variant="default" className="bg-amber-50/50 border-amber-200/60 text-amber-800">
                            <Loader2 className="h-4 w-4 text-amber-600 animate-spin" />
                            <AlertTitle className="font-semibold text-xs text-amber-900">Đang đồng bộ dữ liệu</AlertTitle>
                            <AlertDescription className="text-xs text-amber-800/90 mt-0.5">
                                Tiền đã được trừ trong ví của bạn, nhưng hệ thống cần vài giây để cập nhật trạng thái đơn hàng.
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>

                {/* FOOTER: Nút tương tác điều hướng */}
                <CardFooter className="flex flex-col gap-2 px-6 pb-8 pt-2">
                    {isMomoSuccess && dbStatus === 'LOADING' ? (
                        <Button
                            onClick={handleRecheckStatus}
                            disabled={isPending}
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium"
                        >
                            <RefreshCw className={`mr-2 h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
                            Kiểm tra lại trạng thái
                        </Button>
                    ) : dbStatus === 'PAID' ? (
                        <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium group">
                            <Link href={`/orders/${orderId}`}>
                                Chi tiết đơn hàng
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </Button>
                    ) : (
                        <Button variant="default" asChild className="w-full text-white font-medium">
                            <Link href="/cart">
                                Thử thanh toán lại
                            </Link>
                        </Button>
                    )}

                    <Button asChild variant="outline" className="w-full border-muted text-muted-foreground hover:text-foreground">
                        <Link href="/products">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Tiếp tục mua sắm
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}