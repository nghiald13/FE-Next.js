import CartBilling from "@/components/cart/cart.billings";
import CartItems from "@/components/cart/cart.items";
import { Card } from "@/components/ui/card";
import { getListProducts } from "@/utils/actions";
import { getCartFromCookie } from "@/utils/cart.actions";
import queryString from "query-string";

// Mock Data dữ liệu sản phẩm trong giỏ hàng
const MOCK_CART = [
    {
        id: "p1",
        name: "Wireless Over-Ear Headphones (Noise Cancelling)",
        price: 299,
        quantity: 1,
        manufacturer: "Sony",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80"
    },
    {
        id: "p2",
        name: "Mechanical Gaming Keyboard RGB v2",
        price: 145,
        quantity: 2,
        manufacturer: "Keychron",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&auto=format&fit=crop&q=80"
    }
];

const CartPage = async () => {

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
                amount: cartItem.amount // Giữ số lượng từ cookie
            };
        })

    }

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Shopping Cart</h1>
                <p className="text-muted-foreground mt-1">Bạn đang có {anonymousCart.length || 0} mặt hàng trong giỏ sản phẩm.</p>
            </div>

            {/* Bố cục Grid tổng thể */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* BÊN TRÁI: DANH SÁCH CHI TIẾT SẢN PHẨM (Chiếm 8/12 cột) */}
                <div className="lg:col-span-8 w-full">
                    <CartItems items={fullCartItems} />
                </div>
                {/* BÊN PHẢI: TÓM TẮT HÓA ĐƠN & THANH TOÁN (Chiếm 4/12 cột) */}
                <div className="lg:col-span-4 w-full lg:sticky lg:top-6">
                    <CartBilling items={fullCartItems} />
                </div>
            </div>

        </>
    )
};

export default CartPage;