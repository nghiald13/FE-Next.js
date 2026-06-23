
interface IProductsStats {
    totalItems: number,
    totalInStock: number,
    totalLowStock: number,
    totalOutOfStock: number,
}

const ManageProductStats = (
    props: any
) => {
    const {stats} = props
    return (
        <>
            {/* 2. STATS CARDS (Khối thống kê nhanh) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-card border border-border rounded-xl shadow-2xs">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tổng sản phẩm</div>
                    <div className="text-2xl font-bold mt-1 font-mono">{stats.totalInStock}</div>
                </div>
                <div className="p-4 bg-card border border-border rounded-xl shadow-2xs">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Đang hoạt động</div>
                    <div className="text-2xl font-bold mt-1 font-mono text-emerald-600 dark:text-emerald-500">{stats.totalInStock}</div>
                </div>
                <div className="p-4 bg-card border border-border rounded-xl shadow-2xs">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Sắp hết hàng (&lt;15)</div>
                    <div className="text-2xl font-bold mt-1 font-mono text-amber-600 dark:text-amber-500">{stats.totalLowStock}</div>
                </div>
                <div className="p-4 bg-card border border-border rounded-xl shadow-2xs">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Hết hàng</div>
                    <div className="text-2xl font-bold mt-1 font-mono text-destructive">{stats.totalOutOfStock}</div>
                </div>
            </div>
        </>
    )
}

export default ManageProductStats