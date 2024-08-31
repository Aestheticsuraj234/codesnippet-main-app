'use client'

import React, { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Bold, Italic, Underline as UnderlineIcon, AlignLeft, AlignCenter, AlignRight, 
  Heading1, Heading2, Heading3, Code, Image as ImageIcon
} from 'lucide-react'
import CustomImage from './extension/custom-image'

interface CustomRichTextEditorProps {
  onChange: (value: string) => void
  value: string
}

const CustomRichTextEditor: React.FC<CustomRichTextEditorProps> = ({ onChange, value }) => {
  const [imageUrl, setImageUrl] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CustomImage,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none text-zinc-800 dark:text-white',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  const toggleStyle = (style: string) => {
    if (style === 'toggleHeading') {
      editor?.chain().focus().toggleHeading({ level: 1 }).run()
    } else {
      // @ts-ignore
      editor?.chain().focus()[style]().run()
    }
  }

  const setAlignment = (alignment: 'left' | 'center' | 'right') => {
    editor?.chain().focus().setTextAlign(alignment).run()
  }

  const addImage = () => {
    if (imageUrl) {
      // @ts-ignore
      editor?.chain().focus().setImage({ src: imageUrl, width: '180px', height: '180px' }).run()
      setImageUrl('')
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImageUrl(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  if (!editor) {
    return null
  }

  return (
    <Card className="mx-auto w-full">
      <CardContent className="p-6 w-full">
        <div className="mb-4 flex flex-wrap gap-2">
          <Toggle pressed={editor.isActive('bold')} onPressedChange={() => toggleStyle('toggleBold')}>
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle pressed={editor.isActive('italic')} onPressedChange={() => toggleStyle('toggleItalic')}>
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle pressed={editor.isActive('underline')} onPressedChange={() => toggleStyle('toggleUnderline')}>
            <UnderlineIcon className="h-4 w-4" />
          </Toggle>
          <Toggle pressed={editor.isActive({ textAlign: 'left' })} onPressedChange={() => setAlignment('left')}>
            <AlignLeft className="h-4 w-4" />
          </Toggle>
          <Toggle pressed={editor.isActive({ textAlign: 'center' })} onPressedChange={() => setAlignment('center')}>
            <AlignCenter className="h-4 w-4" />
          </Toggle>
          <Toggle pressed={editor.isActive({ textAlign: 'right' })} onPressedChange={() => setAlignment('right')}>
            <AlignRight className="h-4 w-4" />
          </Toggle>
          <Toggle pressed={editor.isActive('heading', { level: 1 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
            <Heading1 className="h-4 w-4" />
          </Toggle>
          <Toggle pressed={editor.isActive('heading', { level: 2 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <Heading2 className="h-4 w-4" />
          </Toggle>
          <Toggle pressed={editor.isActive('heading', { level: 3 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            <Heading3 className="h-4 w-4" />
          </Toggle>
          <Toggle pressed={editor.isActive('codeBlock')} onPressedChange={() => toggleStyle('toggleCodeBlock')}>
            <Code className="h-4 w-4" />
          </Toggle>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button variant="outline" size="icon">
              <ImageIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {imageUrl && (
          <div className="mb-4 flex items-center gap-2">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Image URL"
              className="flex-grow p-2 border rounded"
            />
            <Button onClick={addImage}>Insert Image</Button>
          </div>
        )}
        <EditorContent
          editor={editor}
          className="min-h-[15rem] border rounded-md p-4 text-zinc-800 dark:text-white"
        />
      </CardContent>
    </Card>
  )
}

export default CustomRichTextEditor