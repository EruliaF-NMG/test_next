'use client'
import { useSession } from "next-auth/react";

interface HasRolesProps {
    children?: JSX.Element | JSX.Element[] | null,
    renderElse?: JSX.Element | JSX.Element[] | null,
    roles:string,
}

const HasRoles = ({ 
    children=null,
    renderElse=null,
    roles=""
} : HasRolesProps ) => {
    const { data, status } = useSession();
    if(status === "loading") return null;
    console.log(data);
    return(
        <>
        {
            data?.user.roles.includes(roles)===true ? children : renderElse
        }
        </>
    )
}

export {
    HasRoles
}