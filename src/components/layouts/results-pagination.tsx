'use client'
import { useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ResultsPagination = (props: any) => {

    const { url, current, meta } = props
    const router = useRouter()
    const searchParams = useSearchParams()

    const toPage = (e: any, page: number) => {
        e.preventDefault()

        const q = {
            kw: searchParams.get('kw') || '',
            manufacturer: searchParams.get('manufacturer') || ''
        }
        router.push(`${url}?${queryString.stringify({ ...q, current: page }, { skipEmptyString: true, skipNull: true })}`)
    }

    if (+meta?.totalPages <= 1) return <></>

    return (
        <>
            {/* 5. BOTTOM PAGINATION BAR */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/40">
                {/* Bên trái: Text thông tin */}
                <p className="text-xs text-muted-foreground">
                    Hiển thị <span className="font-medium text-foreground">1-3</span> trong số <span className="font-medium text-foreground">1,248</span> sản phẩm
                </p>

                {/* Bên phải: Dùng thẻ Button thuần, mượn Style của Shadcn */}
                <div className="flex items-center gap-1.5">
                    {/* Nút Quay lại */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-8 bg-card border-border/80"
                        disabled={+current === 1} // Trả trực tiếp trạng thái logic từ API vào đây, NestJS chưa có trang < 1
                        onClick={(e) => toPage(e, +current - 1)}
                    >
                        <ChevronLeft className="size-4" />
                    </Button>

                    {/* Các nút số trang */}
                    {Array.from({ length: +meta?.totalPages }, (_, index) => (
                        <Button
                            key={index}
                            variant={current === index+1? "default" : "outline"} // Trang hiện tại (Active) thì xài màu đậm của hệ thống
                            className="size-8 text-xs font-semibold p-0"
                            onClick={(e) => toPage(e, index + 1)}
                        >
                            {index + 1}
                        </Button>
                    ))}

                    {/* Nút Kế tiếp */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-8 bg-card border-border/80"
                        disabled={+current === meta?.totalPages}
                        onClick={(e) => toPage(e, +current + 1)}
                    >
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </div>
        </>
    )

}

export default ResultsPagination