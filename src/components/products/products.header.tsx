'use client'
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "../ui/input"

const ProductsHeader = (props: any) => {
    const {current} = props
    const url = '/products'
    const router = useRouter()
    const searchParams = useSearchParams()
    const [kw, setKW] = useState<string>(searchParams.get('kw') || '')

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
        }, 400)

        return () => clearTimeout(delayDebounceFn)
    }, [kw])

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 w-full">
            <div className="space-y-1">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">Industrial Catalog</h1>
                <p className="text-xs md:text-sm text-slate-500">
                    High-precision engineering hardware and parts.
                </p>
            </div>

            <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input
                    value={kw}
                    onChange={(e) => setKW(e.target.value)}
                    placeholder="Search model, serial or keywords..."
                    className="pl-10 pr-4 h-10 rounded-xl bg-white border-slate-200 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
                />
            </div>
        </div>
    )
}

export default ProductsHeader