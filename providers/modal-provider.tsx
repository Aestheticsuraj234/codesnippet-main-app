"use client";

import { AddModal } from "@/components/modal/Add-Modal";
import { RemoveModal } from "@/components/modal/Remove-Modal";
import { useEffect, useState } from "react";




export const ModalProvider = ()=>{
    const [isMounted, setIsMounted] = useState(false)

useEffect(() => {
    setIsMounted(true)
},[])

if(!isMounted){
    return null
}


return (
    <>
        <AddModal />
        <RemoveModal />
    </>
)
}