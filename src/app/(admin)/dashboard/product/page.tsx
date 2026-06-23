import { auth } from "@/auth"
import DashboardForbidden from "@/components/dashboard/dashboard.forbidden"
import ManageProductsHeader from "@/components/dashboard/product/dashboard.product.header"
import ManageProductsList from "@/components/dashboard/product/dashboard.product.list"
import ManageProductStats from "@/components/dashboard/product/dashboard.product.stats"
import { getListProducts, getProductsStatistics } from "@/utils/actions"
import queryString from "query-string"

const ManageProductsPage = async (
    { searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }
) => {
    const {
        kw = '',
        manufacturer = '',
        current = 1,
        pageSize = 24 } = await searchParams


    const session = await auth()

    const q = queryString.stringify({ kw, manufacturer, current, pageSize })

    const productsStats = await getProductsStatistics(session?.access_token || "")
    const listProducts = await getListProducts(q)
    const { results, meta, statusCode } = listProducts

    if (statusCode === 403) {
        return <DashboardForbidden />
    }

    return (
        <>
            <div className="p-6 max-w-[1600px] mx-auto space-y-6 text-foreground bg-background min-h-screen">
                <ManageProductsHeader />
                <ManageProductStats stats={productsStats} />
                <ManageProductsList listProducts={results} meta={meta} />
            </div>
        </>
    )
}

export default ManageProductsPage