"use client";
import { Hint } from "@/components/Global/hint";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOrigin } from "@/hooks/use-origin";
import { Check, Copy } from "lucide-react";
import React from "react";

const ReferalCode = ({ overviewData }: any) => {
  const [copied, setCopied] = React.useState(false);

  const origin = useOrigin();
  const referralLink = `${origin}/?ref=${overviewData?.referralCode}`;

  const onCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-row justify-between w-full flex-1 items-center gap-2">
      <Input
        value={referralLink}
        readOnly
        className="font-medium text-sm 
      border-[#E5E7EB] dark:border-[#46443f] dark:bg-[#27272A] bg-[#F3F4F6] dark:text-[#E5E7EB] text-[#27272A] rounded-md px-4 py-2"
      />
      <Hint
      label="Copy Referral Link"
      align="center"
      side="left"
      alignOffset={10}
      sideOffset={10}
      

      >
      <Button onClick={onCopy} variant={"outline"} size={"icon"}>
        {!copied ? (
          <Copy size={18} />
        ) : (
          <Check size={18} className="text-emerald-400" />
        )}
      </Button>
      </Hint>
     
    </div>
  );
};

export default ReferalCode;
