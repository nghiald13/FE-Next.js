import ProductDetails from "@/components/products/product-details"
import { getSingleProduct } from "@/utils/actions"

const ProductDetailsPage = async ({
    params,
}: {
    params: { productId: string }
}) => {

    const { productId } = await params
    const product = await getSingleProduct(productId)
    return (
        <>
            <ProductDetails product={product} />
        </>
    )

}

export default ProductDetailsPage
