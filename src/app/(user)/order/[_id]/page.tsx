import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { getOrderById } from "@/utils/actions"
import { formatCurrency } from "@/utils/helper"
import { ArrowLeft, User, Calendar } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

const OrderDetailsPage = async (
    { params, }: { params: { _id: string } }
) => {
    const { _id } = await params
    const session = await auth()
    if (!session?.access_token) {
        return redirect(`/auth/signin?callbackUrl=/order/${_id}`)
    }
    const res = await getOrderById(_id, session.access_token)
    let order;
    if (res.ok) order = res.data
    else if (res.statusCode === 401) return redirect(`/auth/signin?callbackUrl=/order/${_id}`)

    // Tính toán thuế dựa trên dữ liệu thực tế (Giả định VAT 10% nếu hệ thống của bạn lưu tổng tiền đã thuế)
    const vatRate = 0.08
    const subTotal = order.totalAmount / (1 + vatRate)
    const vatAmount = order.vatAmount || (order.totalAmount - subTotal)

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-12">

            {/* THANH ĐIỀU HƯỚNG QUAY LẠI */}
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild className="gap-2 text-muted-foreground hover:text-foreground">
                    <Link href="/order">
                        <ArrowLeft className="size-4" /> Back to Invoices
                    </Link>
                </Button>
            </div>

            {/* TỜ HÓA ĐƠN HÀNH CHÍNH SỬ DỤNG DATA THẬT */}
            <div className="bg-white text-black border border-slate-300 p-8 sm:p-12 shadow-md rounded-xl font-sans">

                {/* TOP HEADER HÓA ĐƠN */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-slate-900 pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl font-black tracking-wider text-slate-900">MECSU</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed max-w-sm">
                            CÔNG TY CỔ PHẦN MECSU<br />
                            Địa chỉ: B28/i - B29/i, Đường Số 2B, Bình Tân, TP.HCM<br />
                            Hotline: 1800.8137 | Email: sales@mecsu.vn
                        </p>
                    </div>
                    <div className="text-left sm:text-right">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">Hóa đơn bán hàng</h2>
                        <p className="font-mono text-sm font-semibold mt-1 text-slate-700">Số: {order.orderCode}</p>
                        <div className="mt-2 inline-block">
                            {order.status}
                        </div>
                    </div>
                </div>

                {/* THÔNG TIN HÀNH CHÍNH KHÁCH HÀNG */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 text-xs border-b border-dashed border-slate-300">
                    <div className="space-y-2">
                        <h3 className="font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 text-sm">
                            <User className="size-4 text-slate-600" /> Đơn vị mua hàng
                        </h3>
                        <p><span className="text-slate-500">Người mua:</span> <span className="font-semibold text-slate-900">{order.customerEmail || order.buyerName || "Khách hàng doanh nghiệp"}</span></p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 text-sm">
                            <Calendar className="size-4 text-slate-600" /> Thông tin giao dịch
                        </h3>
                        <p><span className="text-slate-500">Ngày tạo đơn:</span> {new Date(order.createdAt).toLocaleString("vi-VN")}</p>
                        <p><span className="text-slate-500">Hình thức thanh toán:</span> <span className="font-medium text-slate-800">{order.paymentMethod}</span></p>
                        <p><span className="text-slate-500">Mã Giao dịch:</span> <span className="font-medium text-slate-800">{order?.momoTransId || "PENDING"}</span></p>
                        <p><span className="text-slate-500">Thực hiện lúc:</span> <span className="font-medium text-slate-800">{new Date(order.paymentAt)?.toLocaleString("vi-VN") || "PENDING"}</span></p>
                    </div>
                </div>

                {/* BẢNG CHI TIẾT DANH SÁCH VẬT TƯ THỰC TẾ */}
                <Table className="border border-slate-200">
                    <TableHeader className="bg-slate-50">
                        <TableRow className="border-b border-slate-200">
                            <TableHead className="text-slate-900 font-bold text-center w-[60px] text-xs">STT</TableHead>
                            <TableHead className="text-slate-900 font-bold text-xs">Tên sản phẩm / Quy cách kỹ thuật vật tư</TableHead>
                            <TableHead className="text-slate-900 font-bold text-center text-xs w-[80px]">ĐVT</TableHead>
                            <TableHead className="text-slate-900 font-bold text-center text-xs w-[80px]">SL</TableHead>
                            <TableHead className="text-slate-900 font-bold text-right text-xs w-[130px]">Đơn giá</TableHead>
                            <TableHead className="text-slate-900 font-bold text-right text-xs w-[140px]">Thành tiền</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-xs text-slate-700">
                        {order.items?.map((item: any, index: number) => (
                            <TableRow key={item.id || index} className="border-b border-slate-200 hover:bg-slate-50/50">
                                <TableCell className="text-center font-mono text-slate-500 py-3.5">{index + 1}</TableCell>
                                <TableCell className="font-medium text-slate-900 py-3.5">{item.name || item.productName}</TableCell>
                                <TableCell className="text-center text-slate-600 py-3.5">{item.unit || "Cái"}</TableCell>
                                <TableCell className="text-center font-mono font-medium text-slate-900 py-3.5">{item.quantity}</TableCell>
                                <TableCell className="text-right font-mono py-3.5">{formatCurrency(item.unitPrice || item.price)}</TableCell>
                                <TableCell className="text-right font-mono font-semibold text-slate-900 py-3.5">
                                    {formatCurrency((item.quantity) * (item.unitPrice || item.price))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* BLOCK BÓC TÁCH THUẾ GTGT & TỔNG TIỀN */}
                <div className="flex justify-end pt-2">
                    <div className="w-full sm:w-80 space-y-2 text-xs border-t border-slate-300 pt-4">
                        <div className="flex justify-between text-slate-600">
                            <span>Cộng tiền hàng trước thuế:</span>
                            <span className="font-mono">{formatCurrency(subTotal)}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                            <span>Tiền thuế GTGT ({vatRate * 100}%):</span>
                            <span className="font-mono">{formatCurrency(vatAmount)}</span>
                        </div>
                        <div className="flex justify-between items-center border-t border-slate-900 pt-3 text-sm font-bold text-slate-900">
                            <span>Tổng tiền thanh toán (gồm thuế):</span>
                            <span className="font-mono text-lg text-slate-900">
                                {formatCurrency(order.totalAmount)}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderDetailsPage