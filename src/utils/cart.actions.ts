'use server'

import { auth } from '@/auth';
import { getCookie, setCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const CART_COOKIE_NAME = 'anonymous_cart';
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
interface CartItemSummary {
    id: string;
    quantity: number;
}

// 🛒 1. Lấy danh sách giỏ hàng sơ bộ từ Cookie
export async function getCartFromCookie(): Promise<CartItemSummary[]> {
    const cartRaw = await getCookie(CART_COOKIE_NAME, { cookies });
    if (!cartRaw) return [];
    try {
        return JSON.parse(cartRaw as string) as CartItemSummary[];
    } catch (error) {
        return [];
    }
}

// ➕ 2. Thêm sản phẩm vào giỏ hàng ẩn danh
export async function addToCartAction(productId: string, amount: number = 1) {
    const cart = await getCartFromCookie();

    // Kiểm tra sản phẩm đã tồn tại trong giỏ chưa
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += amount;
    } else {
        cart.push({ id: productId, quantity: amount });
    }

    // Lưu ngược lại vào Cookie (Hạn 30 ngày)
    await setCookie(CART_COOKIE_NAME, JSON.stringify(cart), {
        cookies,
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        sameSite: 'lax',
    });
}

// ➖ 3. Cập nhật số lượng sản phẩm (hoặc Xóa nếu số lượng = 0)
export async function updateCartQuantityAction(productId: string, newQuantity: number) {
    let cart = await getCartFromCookie();

    if (newQuantity <= 0) {
        // Xóa khỏi giỏ hàng
        cart = cart.filter(item => item.id !== productId);
    } else {
        // Cập nhật số lượng mới
        cart = cart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item);
    }

    await setCookie(CART_COOKIE_NAME, JSON.stringify(cart), {
        cookies,
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
    });
}

export async function processPayment(billing: any, items: any) {
    const session = await auth()
    if (!session?.user) throw new Error("You must be signed in")

    const user = session.user

    const fetchURL = `${baseURL}/api/v1/payment`
    const res = await fetch(fetchURL, {
        method: "POST",
        body: JSON.stringify({
            userInfo: user,
            items: items,
            billing: billing,
        }),
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token || ""}`
        })
    }).then(r => r.json())

    if (res.statusCode === 201) {
        return redirect(res.data)
    } else if (res.statusCode === 401) {
        throw new Error("Sign in session expired.")
    } else throw new Error("Internal server error")
}