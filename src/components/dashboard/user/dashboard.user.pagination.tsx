'use client'

import { Button } from "@/components/ui/button"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const DashboardUserPagination = (props: any) => {

    const { current, totalPages } = props
    const router = useRouter()

    const toPage = (e: any, page: number) => {
        e.preventDefault()
        router.push(`/dashboard/user?current=${page}`)
    }

    return (
        <>
            <Pagination>
                <PaginationContent>
                    <PaginationItem className={cn("", current === 1 && "hidden")}>
                        <PaginationPrevious onClick={e => toPage(e, current - 1)} />
                    </PaginationItem>
                    {Array.from({ length: +totalPages }, (_, index) => (
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
                    <PaginationItem className={cn("", current === totalPages && "hidden")}>
                        <PaginationNext onClick={e => toPage(e, current + 1)} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}

export default DashboardUserPagination