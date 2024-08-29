"use client";
import React, { memo } from "react";
import Output from "editorjs-react-renderer";
import ParagraphRenderer from "./renderers/CustomParagraphRender";
import HeadingRenderer from "./renderers/CustomHeadRender";
import CustomCodeRenderer from "./renderers/CustomCodeRender";
import CustomImageRenderer from "./renderers/CustomImageRender";
import CustomListRender from "./renderers/CustomListRender";
import CustomWarningRender from "./renderers/CustomWarningRender";
import CustomCheckListRender from "./renderers/CustomCheckList";
import CustomQouteRender from "./renderers/CustomQouteRender";

const ContentClient = ({ data }: any) => {
  const parsedContent = JSON.parse(data.content);

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
    <>
      <div className="prose dark:prose-invert max-w-none mt-4">
        {parsedContent ? (
          <>
            <Output data={parsedContent} renderers={renderers} />
          </>
        ) : null}
      </div>
    </>
  );
};

export default memo(ContentClient);
