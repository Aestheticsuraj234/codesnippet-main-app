"use client";

import { CommunityWithMemberWithUser } from "@/types";
import { useModal } from "@/zustand/use-modal-store";
import { MemberRole } from "@prisma/client";

import { 
    ChevronDown, 
    LogOut, 
    PlusCircle, 
    Settings, 
    Trash, 
    UserPlus,
    Users
  } from "lucide-react";
  
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger
  } from "@/components/ui/dropdown-menu";


interface CommunityHeaderProps {
    community: CommunityWithMemberWithUser;
    role?: MemberRole;
}

export const CommunityHeader = ({
    community,
    role,
}: CommunityHeaderProps) => {
    const { onOpen , isOpen } = useModal();

    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;

    const handleMenuItemClick = (event: React.MouseEvent<HTMLDivElement>, action: () => void) => {
        event.preventDefault();
        action();
    };

    return (
     <DropdownMenu>
      <DropdownMenuTrigger
        className="focus:outline-none" 
        asChild
      >
        <button
          className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
        >
          {community.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]"
      >
        {isModerator && (
          <DropdownMenuItem
            onClick={(event) => handleMenuItemClick(event, () => onOpen("invite", { community }))}
            className="text-green-600 dark:text-green-400 px-3 py-2 text-sm cursor-pointer"
          >
            Invite People
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={(event) => handleMenuItemClick(event, () => onOpen("editCommunity", { community }))}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Community  Settings
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={(event) => handleMenuItemClick(event, () => onOpen("members", { community }))}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Manage Members
            <Users className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            onClick={(event) => handleMenuItemClick(event, () => onOpen("createChannel"))}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Create Channel
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuSeparator />
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={(event) => handleMenuItemClick(event, () => onOpen("deleteCommunity", { community }))}
            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
          >
            Delete Community
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            onClick={(event) => handleMenuItemClick(event, () => onOpen("leaveCommunity", { community }))}
            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
          >
            Leave Community
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        
      </DropdownMenuContent>
    </DropdownMenu>
    );
}
