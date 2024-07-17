"use server";

import { currentRole } from "@/lib/auth/data/auth";

export const admin = async ()=>{
    const role = await currentRole();

    if(role === "ADMIN"){
        return {error:"Allowed Server Action"}
    }


    return {success:"Forbidden Server Action"}
}