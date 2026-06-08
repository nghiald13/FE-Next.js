
// Định dạng tiền tệ VND
export function formatCurrency (amount: number) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
}

