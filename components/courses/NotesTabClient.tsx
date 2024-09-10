"use client";
import React from 'react'
import Output from "editorjs-react-renderer";
import ParagraphRenderer from "./renderers/CustomParagraphRender";
import HeadingRenderer from "./renderers/CustomHeadRender";
import CustomCodeRenderer from "./renderers/CustomCodeRender";
import CustomImageRenderer from "./renderers/CustomImageRender";
import CustomListRender from "./renderers/CustomListRender";
import CustomWarningRender from "./renderers/CustomWarningRender";
import CustomCheckListRender from "./renderers/CustomCheckList";
import CustomQouteRender from "./renderers/CustomQouteRender";

interface props {
  notes: string | null;
}

const NotesTabClient = ({ notes }: props) => {
  let parsedContent: any = null;
  let isJson = true;

  try {
    // Attempt to parse notes as JSON
    parsedContent = JSON.parse(notes!);
  } catch (error) {
    // If parsing fails, treat the content as plain text
    isJson = false;
  }

  const renderers = {
    header: HeadingRenderer,
    paragraph: ParagraphRenderer,
    code: CustomCodeRenderer,
    image: CustomImageRenderer,
    list: CustomListRender,
    warning: CustomWarningRender,
    checklist: CustomCheckListRender,
    quote: CustomQouteRender,
  };

  return (
    <div className="prose dark:prose-invert max-w-none mt-4">
      {isJson && parsedContent ? (
        // Render parsed JSON content with custom renderers
        <Output data={parsedContent} renderers={renderers} />
      ) : (
        // Render plain text content in a paragraph
        <p>{notes}</p>
      )}
    </div>
  );
}

export default NotesTabClient;
