'use client'
import { cn } from "@/lib/utils"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "../ui/pagination"
import { useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"

const ResultsPagination = (props: any) => {

    const { url, current, meta } = props
    const router = useRouter()
    const searchParams = useSearchParams()

    const toPage = (e: any, page: number) => {
        e.preventDefault()
        const kw = searchParams.get('kw') || ''
        router.push(`${url}?${queryString.stringify({ kw, current: page })}`)
    }

    if (+meta?.totalPages <= 1) return <></>

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem className={cn("", +current === 1 && "hidden")}>
                    <PaginationPrevious onClick={e => toPage(e, +current - 1)} />
                </PaginationItem>
                {Array.from({ length: +meta?.totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            onClick={e => toPage(e, index + 1)}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem className={cn("", +current === meta?.totalPages && "hidden")}>
                    <PaginationNext onClick={e => toPage(e, +current + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )

}

export default ResultsPagination