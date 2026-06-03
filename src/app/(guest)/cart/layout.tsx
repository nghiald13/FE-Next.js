import { getCartFromCookie } from "@/utils/cart.actions";

const CartLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <div className="w-full bg-slate-50/50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">


                {children}
            </div>
        </div>
    )
}

export default CartLayout