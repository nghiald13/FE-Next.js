'use client'
import { Search, ShoppingCart } from "lucide-react"
import ResultsPagination from "../layouts/results-pagination"
import { Avatar, AvatarBadge } from "../ui/avatar"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { InputGroup, InputGroupInput, InputGroupAddon } from "../ui/input-group"

const ProductsHeader = (props: any) => {

    const url = '/products'
    const router = useRouter()
    const searchParams = useSearchParams()
    const { current, meta } = props
    const [kw, setKW] = useState<string>()
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString())

            if (kw) {
                params.set('kw', kw)
                params.set('current', '1')
            } else {
                params.delete('kw')
            }

            router.push(`${url}?${params.toString()}`)
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [kw])
    return (
        <>

            {/* 🌟 HỆ THỐNG HEADER TRÊN CÙNG: TIÊU ĐỀ & THANH TÌM KIẾM */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Our Products</h1>
                    <p className="text-muted-foreground mt-1">Explore our curated collection of premium tech and lifestyle goods.</p>
                </div>

                {/* Thanh Search tích hợp Icon */}
                <div className="relative w-full md:w-80">
                    <InputGroup className="">
                        <InputGroupInput onChange={(e) => setKW(e.target.value)} placeholder="Search... " />
                        <InputGroupAddon><Search /></InputGroupAddon>
                        <InputGroupAddon align="inline-end" className="italic text-xs">{meta?.totalItems} results</InputGroupAddon>
                    </InputGroup>
                </div>

                <ResultsPagination url={url} current={+current} meta={meta} />
            </div>
        </>
    )
}

export default ProductsHeader