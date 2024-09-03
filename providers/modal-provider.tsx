"use client";

import { AddModal } from "@/components/modal/Add-Modal";
import { CreateCommunityModal } from "@/components/modal/create-community-modal";
import { EditCommunityModal } from "@/components/modal/edit-community-modal";
import { InviteModal } from "@/components/modal/invite-community-modal";
import { MembersModal } from "@/components/modal/members-modal";
import { RemoveModal } from "@/components/modal/Remove-Modal";

import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AddModal />
      <RemoveModal />
      <CreateCommunityModal />
      <InviteModal />
      <EditCommunityModal />
      <MembersModal />
    </>
  );
};
