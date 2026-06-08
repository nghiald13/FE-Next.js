import { SidebarHeader } from "../ui/sidebar"
import BrandLogo from "./brand-logo"

const SidebarBrandHeader = () => {
    return (
        <SidebarHeader className="px-4 py-4 border-b border-sidebar-border">
            <BrandLogo />
        </SidebarHeader>
    )
}

export default SidebarBrandHeader