import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { ShieldBan } from "lucide-react"
import Link from "next/link"

const DashboardForbidden = () => {
    return (
        <Empty className="border border-dashed">
            <EmptyHeader>
                <EmptyMedia variant="default">
                    <ShieldBan size={256} color="#a20606" strokeWidth={1.5} />
                </EmptyMedia>
                <EmptyTitle className="font-extrabold">Forbidden</EmptyTitle>
                <EmptyDescription>
                    You don't have permission to do any further actions
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button variant="outline" size="sm" asChild>
                    <Link href="/products">Go to safe zone</Link>
                </Button>
            </EmptyContent>
        </Empty>
    )
}

export default DashboardForbidden