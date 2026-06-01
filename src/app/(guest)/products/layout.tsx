import { auth } from "@/auth";
import { ProductsSidebar } from "@/components/products/products.sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getListManufacturers } from "@/utils/actions";

const ProductPageLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const session = await auth()

    const listManufacturers = await getListManufacturers()

    return (
        <>
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