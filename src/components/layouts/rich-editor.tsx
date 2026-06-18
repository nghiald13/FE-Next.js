'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/components/ui/button'
import { Bold, Italic, Heading1, Heading2, List, ListOrdered } from 'lucide-react'

interface RichEditorProps {
    onChange: (json: any) => void;
    initialContent?: any;
}

export default function RichEditor({ onChange, initialContent }: RichEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: initialContent || '',
        onUpdate: ({ editor }) => {
            // 🌟 Lấy dữ liệu dưới dạng JSON sạch để gửi lên NestJS
            onChange(editor.getJSON())
        },
        editorProps: {
            attributes: {
                // Class 'prose' giúp ô nhập liệu hiển thị chuẩn format ngay khi đang gõ
                className: 'prose prose-slate max-w-none min-h-[150px] p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white text-sm',
            },
        },
    })

    if (!editor) return null

    return (
        <div className="space-y-2 w-full">
            {/* Thanh công cụ (Toolbar) tinh gọn bằng Lucide Icons */}
            <div className="flex flex-wrap gap-1 p-1.5 bg-slate-50 border border-slate-200 rounded-xl w-full">
                <Button
                    type="button" size="icon" variant={editor.isActive('bold') ? 'default' : 'ghost'} className="size-8 rounded-lg"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold className="size-4" />
                </Button>
                <Button
                    type="button" size="icon" variant={editor.isActive('italic') ? 'default' : 'ghost'} className="size-8 rounded-lg"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic className="size-4" />
                </Button>
                <Button
                    type="button" size="icon" variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'} className="size-8 rounded-lg"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                    <Heading1 className="size-4" />
                </Button>
                <Button
                    type="button" size="icon" variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'} className="size-8 rounded-lg"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    <Heading2 className="size-4" />
                </Button>
                <Button
                    type="button" size="icon" variant={editor.isActive('bulletList') ? 'default' : 'ghost'} className="size-8 rounded-lg"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <List className="size-4" />
                </Button>
                <Button
                    type="button" size="icon" variant={editor.isActive('orderedList') ? 'default' : 'ghost'} className="size-8 rounded-lg"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <ListOrdered className="size-4" />
                </Button>
            </div>

            {/* Vùng nhập liệu thực tế */}
            <EditorContent editor={editor} />
        </div>
    )
}