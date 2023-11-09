'use client'
import { useSession } from "next-auth/react";

interface IsGuestProps {
    children: JSX.Element | JSX.Element[] | null,
    renderElse: JSX.Element | JSX.Element[] | null
}

const IsGuest  = ({ 
children=null,
renderElse=null
}:IsGuestProps) => {
    const { status } = useSession();
    if(status === "loading") return null;
    return(
        <>
        {
            status === "unauthenticated" ? children : renderElse
        }
        </>
    )
}

export {
    IsGuest 
}