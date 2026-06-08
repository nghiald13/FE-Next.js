import { auth } from "@/auth"
import { OrderListClient } from "@/components/orders/orders-list"
import { getListOrders } from "@/utils/actions"
import { redirect } from "next/navigation"

export default async function OrdersPage() {
    const session = await auth()
    if (!session?.access_token) {
        return redirect(`/auth/signin?callbackUrl=/order`)
    }

    const res = await getListOrders(session.user._id, session.access_token)
    let data: any[] = []
    if (res.ok) data = res.data
    else if (res.statusCode === 401) return redirect(`/auth/signin?callbackUrl=/order`)

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Invoices & Orders</h1>
                    <p className="text-muted-foreground text-sm">
                        Review your order history
                    </p>
                </div>
            </div>

            <OrderListClient initialOrders={data} />
        </div>
    )
}