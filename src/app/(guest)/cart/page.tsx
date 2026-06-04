import { auth } from "@/auth";
import CartBilling from "@/components/cart/cart.billings";
import CartItems from "@/components/cart/cart.items";
import { Button } from "@/components/ui/button";
import { getListProducts } from "@/utils/actions";
import { getCartFromCookie } from "@/utils/cart.actions";
import { ShoppingBag, Undo2 } from "lucide-react";
import Link from "next/link";
import queryString from "query-string";

const CartPage = async () => {

    const session = await auth()

    // 1. Lấy mảng [{id, quantity}] từ cookie trên Server
    const anonymousCart = await getCartFromCookie();

    console.log(anonymousCart)

    let fullCartItems = [];

    if (anonymousCart.length > 0) {
        const productIds = anonymousCart.map(item => item.id);

        // 2. Query DB lấy chi tiết các sản phẩm này (Tên, Ảnh, Giá...)
        const productsDetail = await getListProducts(queryString.stringify({ _id: productIds }, {
            arrayFormat: "comma"
        }));

        // 3. Khớp số lượng (quantity) từ cookie vào data chi tiết từ DB
        fullCartItems = anonymousCart.map(cartItem => {
            const detail = productsDetail.results.find((p: any) => p._id === cartItem.id);
            return {
                ...detail,
                quantity: cartItem.quantity // Giữ số lượng từ cookie
            };
        })

    }

    return (
        <>
            <Button variant="outline" asChild>
                <Link href="/products"><Undo2 /> Back to shopping</Link>
            </Button>
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Shopping Cart</h1>
                <p className="text-muted-foreground mt-1">Currently has {anonymousCart.length || 0} items in the cart</p>
            </div>

            {/* Bố cục Grid tổng thể */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* BÊN TRÁI: DANH SÁCH CHI TIẾT SẢN PHẨM (Chiếm 8/12 cột) */}
                <div className="lg:col-span-8 w-full">
                    <CartItems items={fullCartItems} />
                </div>
                {/* BÊN PHẢI: TÓM TẮT HÓA ĐƠN & THANH TOÁN (Chiếm 4/12 cột) */}
                <div className="lg:col-span-4 w-full lg:sticky lg:top-6">
                    <CartBilling session={session} items={fullCartItems} />
                </div>
            </div>

        </>
    )
};

export default CartPage;