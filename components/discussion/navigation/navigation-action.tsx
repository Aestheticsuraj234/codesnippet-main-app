"use client";

import { Hint } from "@/components/Global/hint";
import { useCurrentRole } from "@/hooks/auth/use-current-role";
import { useModal } from "@/zustand/use-modal-store";
import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const NavigationAction = () => {
  const { onOpen } = useModal();
  const router = useRouter();
  const user = useCurrentRole();

  const onBack = () => {
    router.push("/dashboard/tutorials");
  };

  if (user !== "ADMIN") {
    return (
      <div>
        <Hint
          label="Go Back"
          side="right"
          align="center"
          alignOffset={10}
          sideOffset={10}
        >
          <button onClick={onBack} className="group flex items-center">
            <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
              <ArrowLeft
                className="group-hover:text-white transition text-emerald-500 "
                size={25}
              />
            </div>
          </button>
        </Hint>
      </div>
    );
  }

  return (
    <div>
      <Hint
        label="Add a community"
        side="right"
        align="center"
        alignOffset={10}
        sideOffset={10}
      >
        <button
          onClick={() => onOpen("createCommunity")}
          className="group flex items-center"
        >
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus
              className="group-hover:text-white transition text-emerald-500 "
              size={25}
            />
          </div>
        </button>
      </Hint>
    </div>
  );
};
