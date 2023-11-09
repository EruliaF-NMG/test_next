'use client'
import { useSession } from "next-auth/react";

interface HasPermissionProps {
    children: JSX.Element | JSX.Element[] | null,
    renderElse: JSX.Element | JSX.Element[] | null,
    permission:string,
}

const HasPermission = ({ 
    children=null,
    renderElse=null,
    permission=""
} : HasPermissionProps ) => {
    const { data, status } = useSession();
    if(status === "loading") return null;
    return(
        <>
        {
            data?.user.permissions.includes(permission) ? children : renderElse
        }
        </>
    )
}

export {
    HasPermission
}