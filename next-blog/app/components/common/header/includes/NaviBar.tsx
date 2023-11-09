'use client'

import { HasRoles } from "@/app/components/authentication-guard/HasRoles "
import { IsAuth } from "@/app/components/authentication-guard/IsAuth"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"


const AuthMenu = () =>{
    return (
        <>
        <li>
            <Link
                href={'/'}
                className="block py-2 pl-3 pr-4 text-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
            >
               Home
            </Link>
        </li>
        <li>
            <Link
                href={'/post/create'}
                className="block py-2 pl-3 pr-4 text-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
            >
               Create Post
            </Link>
        </li>
        <HasRoles roles="ADMIN">
            <li>
                <Link
                    href={'/admin/manage-user'}
                    className="block py-2 pl-3 pr-4 text-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                >
                Manage User
                </Link>
            </li>
        </HasRoles>
        <li>
            <Link
                href={'/about'}
                className="block py-2 pl-3 pr-4 text-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
            >
               About
            </Link>
        </li>
        <li>
            <a
            href="#"
                className="block py-2 pl-3 pr-4 text-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                onClick={()=>signOut()}
            >
               Logout
            </a>
        </li>
        </>
    )
}

const GuestMenu = () =>{
    return (
        <>
        <li>
            <Link
                href={'/'}
                className="block py-2 pl-3 pr-4 text-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
            >
               Home
            </Link>
        </li>
        <li>
            <Link
                href={'/about'}
                className="block py-2 pl-3 pr-4 text-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
            >
               About
            </Link>
        </li>
        <li>
            <Link
                href={'/register'}
                className="block py-2 pl-3 pr-4 text-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
            >
               Register
            </Link>
        </li>
        <li>
            <Link
                href={'/api/auth/signin'}
                className="block py-2 pl-3 pr-4 text-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
            >
               Login
            </Link>
        </li>
        </>
    )
}



const NaviBar = () : JSX.Element =>  {
    const { status } = useSession();
    return (
        <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <IsAuth
                renderElse={<GuestMenu />}
            >
                <AuthMenu />
            </IsAuth>
        </ul>
    )
}

export {
    NaviBar
}