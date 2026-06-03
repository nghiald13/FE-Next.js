'use client'

import { useState, useEffect } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "../ui/button"

interface ControllerProps {
    productId: string
    initialAmount: number
    onAmountChange: (targetQty: number) => void
    disabled?: boolean
}

const CartAmountControl = ({ productId, initialAmount, onAmountChange, disabled }: ControllerProps) => {
    // 💡 Đồng bộ state cục bộ với giá trị ban đầu từ server
    const [localAmount, setLocalAmount] = useState(initialAmount)

    // Nếu dữ liệu từ server thay đổi (ví dụ: gộp giỏ hàng), cập nhật lại state
    useEffect(() => {
        setLocalAmount(initialAmount)
    }, [initialAmount])

    const handleStep = (step: number) => {
        const target = localAmount + step
        if (target <= 0) return // Không giảm xuống dưới 1

        // 🚀 Bước 1: Thay đổi giao diện NGAY LẬP TỨC (0ms delay)
        setLocalAmount(target)

        // 🚀 Bước 2: Gọi hàm xử lý Server Action chạy ngầm dưới nền
        onAmountChange(target)
    }

    return (
        <div className="flex items-center gap-1.5 border border-input rounded-md p-1 bg-white shadow-xs">
            <Button
                onClick={() => handleStep(-1)}
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-sm hover:bg-slate-50"
                disabled={disabled || localAmount <= 1}
            >
                <Minus className="size-3.5" />
            </Button>

            <span className="text-sm font-bold w-8 text-center select-none font-mono">
                {localAmount}
            </span>

            <Button
                onClick={() => handleStep(1)}
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-sm hover:bg-slate-50"
                disabled={disabled}
            >
                <Plus className="size-3.5" />
            </Button>
        </div>
    )
}

export default CartAmountControl