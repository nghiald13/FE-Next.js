'use client'

import { useMemo } from 'react'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'

export default function RichRenderer({ contentJson }: { contentJson: any }) {
    // Dùng useMemo để tránh việc render lại HTML không cần thiết làm chậm trang
    const outputHtml = useMemo(() => {
        if (!contentJson || Object.keys(contentJson).length === 0) return ''
        try {
            // Tự động chuyển đổi cấu trúc JSON Block thành mã HTML sạch
            return generateHTML(contentJson, [StarterKit])
        } catch (e) {
            console.error('Lỗi phân giải JSON Rich Text:', e)
            return ''
        }
    }, [contentJson])

    if (!outputHtml) {
        return <p className="text-slate-400 text-sm italic">No description available.</p>
    }

    return (
        <div
            className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed 
                 prose-headings:font-bold prose-headings:text-slate-900
                 prose-strong:text-slate-900 prose-ul:list-disc prose-ol:list-decimal"
            dangerouslySetInnerHTML={{ __html: outputHtml }}
        />
    )
}