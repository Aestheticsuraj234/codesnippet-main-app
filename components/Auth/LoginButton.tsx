"use client";
import  {useRouter} from "next/navigation";

interface LoginButtonProps{
    children:React.ReactNode;
    mode?:"MODAL" |"REDIRECT";
    asChild?:boolean;
}

export const LoginButton = ({
    children,
    mode="REDIRECT",
    asChild,
}:LoginButtonProps) => {

    const router = useRouter()

    const onClick = () => {
        router.push("/auth/login")
    }

    if(mode === "MODAL")
        {
            return(
                <span>
                    TODO: Implement Modal
                </span>
            )
        }


    return(
        <span onClick={onClick}  className="cursor-pointer">
            {children}
        </span>
    )
}