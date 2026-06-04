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
            <div className="space-y-6 mb-4 w-full">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Industrial Components & Supplies</h1>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            High-precision mechanical parts, electrical components, and engineering hardware for production and maintenance.
                        </p>
                    </div>
                </div>


                <div className="w-full flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 p-3 rounded-xl border border-slate-100">

                    <div className="flex flex-col sm:flex-row flex-1 items-stretch sm:items-center gap-3 max-w-3xl">

                        <div className="relative flex-1 min-w-[200px]">
                            <InputGroup>
                                <InputGroupInput
                                    value={kw}
                                    onChange={(e) => setKW(e.target.value)}
                                    placeholder="Search products... "
                                />
                                <InputGroupAddon><Search className="size-4 text-muted-foreground" /></InputGroupAddon>
                                <InputGroupAddon align={"inline-end"}>
                                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full shrink-0">
                                        {meta?.totalItems || 0} items available
                                    </span>
                                </InputGroupAddon>
                            </InputGroup>

                        </div>
                    </div>
                </div>

                <div className="flex justify-center lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-dashed border-slate-200 shrink-0">
                    <ResultsPagination url={url} current={+current} meta={meta} />
                </div>
            </div>
        </>
    )
}

export default ProductsHeader