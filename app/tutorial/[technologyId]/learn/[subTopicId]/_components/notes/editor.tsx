"use client";
import React, { useEffect, useState, MutableRefObject } from "react";
import EditorJS from "@editorjs/editorjs";

interface UpdateEditorProps {
  editorRef: MutableRefObject<EditorJS | null>;
  initialData: any;
}

const Editor = ({ editorRef, initialData }: UpdateEditorProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const initializeEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;    // @ts-ignore
    const Header = (await import("@editorjs/header")).default;    // @ts-ignore
    const List = (await import("@editorjs/list")).default;    // @ts-ignore
    // @ts-ignore
    const Embed = (await import("@editorjs/embed")).default;    // @ts-ignore
    const Table = (await import("@editorjs/table")).default;    // @ts-ignore
    const Quote = (await import("@editorjs/quote")).default;    // @ts-ignore
        // @ts-ignore
    const Marker = (await import("@editorjs/marker")).default;     // @ts-ignore
    const Warning = (await import("@editorjs/warning")).default;     // @ts-ignore
    const LinkTool = (await import("@editorjs/link")).default;     // @ts-ignore
    const RawTool = (await import("@editorjs/raw")).default;
    const Delimiter = (await import("@editorjs/delimiter")).default;     // @ts-ignore
    const InlineCode = (await import("@editorjs/inline-code")).default;     // @ts-ignore
    const SimpleImage = (await import("@editorjs/simple-image")).default;     // @ts-ignore
    const Checklist = (await import("@editorjs/checklist")).default;     // @ts-ignore
    const CodeBox = (await import("@bomdi/codebox")).default;     // @ts-ignore
const ImageTool = (await import("@editorjs/image")).default;
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        onReady: () => {
          editorRef.current = editor;
        },
        placeholder: "Type here to write your content...",
        inlineToolbar: true,
        data: initialData || { blocks: [] },
        tools: {
          header: {
            // @ts-ignore
            class: Header,
            config: {
              placeholder: "Enter a header",
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 1,
            },
          },
          list: List,
          embed: Embed,
          table: Table,
          quote: Quote,
          marker: Marker,
          warning: Warning,
          code: {
            class: CodeBox,
            config: {
              themeURL:
                "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css",
              themeName: "atom-one-dark",
            },
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/blog/link",
            },
          },
          raw: RawTool,
          delimiter: Delimiter,
          inlineCode: InlineCode,
          image: {
            // @ts-ignore
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "/api/upload-image", // Uploads to Cloudinary
                byUrl: "/api/fetchUrl", // Your backend endpoint that provides URL uploading
              },
            },
          },
          checklist: Checklist,
        },
      });

      editorRef.current = editor;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };

    if (isMounted) {
      init();
      return () => {
        editorRef.current?.destroy();
        editorRef.current = null;
      };
    }
  }, [isMounted]);

  return (
    <div className="mt-4">
      <div id="editorjs" className="prose max-w-full border rounded-sm py-10 px-10" />
    </div>
  );
};

export default Editor;
