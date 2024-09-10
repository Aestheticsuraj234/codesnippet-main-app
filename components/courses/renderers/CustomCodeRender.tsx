"use client";
import React, { useEffect, useRef, useState } from "react";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/atom-one-dark.css"; // Import the theme you want to use
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

function CustomCodeRenderer({
  data,
}: {
  data: { language: string; code: string };
}) {
  const codeRef = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    // Remove HTML tags only when code is other than HTML and do not include the highlight.js tags
    const codeToCopy =
      data.language !== "html"
        ? data.code.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")
        : data.code.replace(/&nbsp;/g, " ");

    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [data.code, data.language]);

  return (
    <div
      className="
      flex
      flex-col
      items-start
      w-full
      max-w-full
      overflow-x-auto
      rounded-md
      border
      p-4
      bg-zinc-100
      dark:bg-zinc-900
      relative
      sm:p-3
      md:m-4
      lg:max-w-2xl
      xl:max-w-3xl
    "
    >
      
      <Button
        className="absolute top-2 right-3"
        onClick={onCopy}
        size="icon"
        variant="ghost"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
      <pre className="bg-gray-800 rounded-md p-4 overflow-x-auto w-full max-w-full">
        <code
          ref={codeRef}
          className={`font-semibold text-sm md:text-base lg:text-lg language-${data.language}`}
          dangerouslySetInnerHTML={{ __html: data.code }}
        />
      </pre>
    </div>
  );
}

export default CustomCodeRenderer;
