"use client"
import React, { useEffect, useState } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github-dark.css'
import { Check, Copy } from 'lucide-react';

hljs.registerLanguage('javascript', javascript);

const GithubCode = () => {
    const [copied , setCopied] = useState(false)
  useEffect(() => {
    hljs.highlightAll();
  }, []);



  // Write a motivational quote here
  const code = `
  git clone launchFast
    `

    const handleCopy = () => {
        navigator.clipboard.writeText(`git clone launchFast`)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

  const highlightedCode = hljs.highlight(code, { language: 'javascript' }).value;

  return (
    <div className=' hidden md:flex justify-center items-center w-full'>
      <pre className='relative flex p-2  flex-row items-center justify-between bg-gray-800 h-auot w-auto border-2  rounded-md shadow-lg border-[#03DC7A] text-white '>
        <code
          className="block whitespace-pre overflow-x-auto rounded-md p-4"
          dangerouslySetInnerHTML={{
            __html: highlightedCode,
          }}
        />
        {
            copied ?<Check className='text-[#03dc7a]'/>  : <Copy onClick={handleCopy } className='cursor-pointer'/>
        }
      </pre>
    </div>
  );
};

export default GithubCode;