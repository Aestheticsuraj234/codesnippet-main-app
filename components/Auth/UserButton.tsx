"use client";
import { LogOut, User } from "lucide-react";
import 
{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger

} from "@/components/ui/dropdown-menu"

import {
Avatar,
AvatarImage,
AvatarFallback
} from "@/components/ui/avatar"
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import LogoutButton from "./LogoutButton";


export const UserButton = ()=>{
    const user = useCurrentUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""}  />
                    <AvatarFallback className="bg-green-500">
                        <User className="text-white"/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <LogoutButton>
                    <DropdownMenuItem> 
                        <LogOut className="h-4 w-4 mr-2"/>
                         Logout</DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}