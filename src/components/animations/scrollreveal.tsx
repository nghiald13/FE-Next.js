'use client'
import { motion } from "framer-motion"
import { ReactNode } from "react"

interface ScrollRevealProps {
    children: ReactNode
    delay?: number
    yOffset?: number
}

export default function ScrollReveal({ children, delay = 0, yOffset = 40 }: ScrollRevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: yOffset }} // Trạng thái ban đầu: mờ và nằm hơi thấp xuống
            whileInView={{ opacity: 1, y: 0 }}   // 🎯 KHI CUỘN TỚI: Hiện rõ và mượt mà bay lên vị trí chuẩn
            viewport={{ once: true, margin: "-100px" }} // Chỉ chạy 1 lần khi cuộn qua cách mép màn hình 100px
            transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
            className="h-full"
        >
            {children}
        </motion.div>
    )
}