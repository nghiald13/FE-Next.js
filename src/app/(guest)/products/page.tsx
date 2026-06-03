import ProductsHeader from "@/components/products/products.header"
import ProductListPage from "@/components/products/products.list"
import { getListProducts } from "@/utils/actions"
import queryString from "query-string"

const ProductPage = async (
    { searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }
) => {

    const {
        kw = '',
        manufacturer = '',
        current = 1,
        pageSize = 24 } = await searchParams

    const listProducts = await getListProducts(queryString.stringify({ kw, manufacturer, current, pageSize }))

    const { results, meta } = listProducts

    return (
        <>
            {/** Container */}
            <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8 w-full">
                <ProductsHeader current={current} meta={meta} />
                <ProductListPage listProducts={results} />
            </div>
        </>
    )
}

export default ProductPage