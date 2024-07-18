import {auth} from "@/auth";

export const currentUser = async()=>{
    const session = await auth();
    return session?.user;
}

export const currentRole= async()=>{
    const session = await auth();
    return session?.user.role;
}

export const currentUserById = async(id:string)=>{
    
    const session = await auth();
     if(session?.user.id === id){
        return session?.user;
     }
     
}