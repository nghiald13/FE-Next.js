'use client'
import { getCookie } from "cookies-next"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"


const FloatingCart = () => {
    const [cartAmount, setCartAmount] = useState<number>(0)

    // function to update cart
    const updateCart = () => {
        const cartCookie = getCookie('anonymous_cart')
        if (cartCookie) {
            try {
                const cart = JSON.parse(cartCookie as string)
                setCartAmount(cart.length)
            } catch (e) {
                setCartAmount(0)
            }
        }
    }

    useEffect(() => {
        // update ONCE first enter
        updateCart()

        // on event listened, do
        const handleCartUpdateEvent = () => {
            updateCart()
        }

        // add event listener named 'cart-update'
        window.addEventListener('cart-update', handleCartUpdateEvent)
        return () => {
            window.removeEventListener('cart-update', handleCartUpdateEvent)
        }
    }, [])

    return (
        <>
            {/** Sticky Floating Cart */}
            <div className="fixed bottom-6 right-6 z-50">
                <Link href="/cart">
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full w-14 h-14 shadow-xl relative hover:scale-110 active:scale-95 transition-all duration-200"
                    >
                        <ShoppingCart className="size-5" />
                        {cartAmount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-mono font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">
                                {cartAmount}
                            </span>
                        )}
                    </Button>
                </Link>
            </div>
        </>

    )
}

export default FloatingCart