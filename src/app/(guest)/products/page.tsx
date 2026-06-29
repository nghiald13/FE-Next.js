import ProductsHeader from "@/components/products/products.header"
import ProductListPage from "@/components/products/products.list"
import { Skeleton } from "@/components/ui/skeleton";
import { getListProducts } from "@/utils/actions"
import queryString from "query-string"
import { Suspense } from "react";

// Skeleton list when no data
function ProductListSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="border border-slate-100 rounded-2xl p-3 space-y-3 bg-white">
                    <Skeleton className="aspect-[4/3] w-full rounded-xl bg-slate-100" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-2/3 bg-slate-100" />
                        <Skeleton className="h-4 w-1/2 bg-slate-100" />
                    </div>
                    <Skeleton className="h-9 w-full rounded-lg bg-slate-100" />
                </div>
            ))}
        </div>
    );
}

async function ProductGridWithData({ q }: { q: string }) {
    let results = [];
    let meta = null;

    try {
        const listProducts = await getListProducts(q);
        results = listProducts?.results || [];
        meta = listProducts?.meta || null;
    } catch (error) {
        console.error(">>> Backend đang sập hoặc lỗi kết nối, hiển thị danh sách rỗng:", error);
    }

    return <ProductListPage listProducts={results} meta={meta} />;
}



const ProductPage = async (
    { searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }
) => {

    const {
        kw = '',
        manufacturer = '',
        current = 1,
        pageSize = 24 } = await searchParams

    const q = queryString.stringify({ kw, manufacturer, current, pageSize })

    return (
        <>
            {/** Container */}
            <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8 w-full">
                {/* Header luôn hiển thị bất kể backend có sống hay chết */}
                <ProductsHeader current={current} />

                {/* Phần danh sách sản phẩm được streaming độc lập, hiển thị skeleton khi chưa có data */}
                <Suspense key={q} fallback={<ProductListSkeleton />}>
                    <ProductGridWithData q={q} />
                </Suspense>
            </div>
        </>
    )
}

export default ProductPage