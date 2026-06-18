import { auth } from "@/auth";
import { ProductsSidebar } from "@/components/products/products.sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { getListManufacturers } from "@/utils/actions";

const ProductPageLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const session = await auth()
    let listManufacturers = []
    try {
        listManufacturers = await getListManufacturers()
    } catch (e) {
        console.error(">>> Không lấy được danh sách nhà sản xuất:", e)
    }

    return (
        <>
            <Toaster />
            <SidebarProvider>
                <ProductsSidebar listManufacturers={listManufacturers} session={session} />
                <SidebarTrigger className="sticky top-0" />
                <SidebarInset>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}

export default ProductPageLayout