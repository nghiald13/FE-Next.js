import { auth } from "@/auth";
import { ProductsSidebar } from "@/components/products/products.sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const ProductPageLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const session = await auth()

    return (
        <>
            <SidebarProvider>
                <ProductsSidebar session={session} />
                <SidebarTrigger />
                <SidebarInset>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}

export default ProductPageLayout