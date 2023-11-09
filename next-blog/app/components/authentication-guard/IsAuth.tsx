'use client'
import { useSession } from "next-auth/react";

interface IsAuthProps {
    children: JSX.Element | JSX.Element[] | null,
    renderElse: JSX.Element | JSX.Element[] | null
}

const IsAuth = ({ 
children=null,
renderElse=null
}:IsAuthProps) => {
    const { status,data } = useSession();
    if(status === "loading") return null;
    console.log(data,"data-------------")
    return(
        <>
        {
            status === "authenticated" ? children : renderElse
        }
        </>
    )
}

interface IsDoneByAuthUserProps extends IsAuthProps{
    userID:string
}

const IsDoneByAuthUser = ({ 
    children=null,
    renderElse=null,
    userID=""
}) => {
        const { data,status } = useSession();
        if(status === "loading") return null;
        return(
            <>
            {
                data?.user.id === userID ? children : renderElse
            }
            </>
        )
    }

export {
    IsAuth,
    IsDoneByAuthUser
}