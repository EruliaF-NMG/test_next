import Link from "next/link"
import { LoopItems } from "../util/LoopItems"

interface ITabItems{
    key:string,
    label:string,
    href:string,
}

interface TabsProps{
    tabItms?: Array<ITabItems>,
    activeTabKey?:string,
}

const Tabs=({
    tabItms=[],
    activeTabKey="",
}:TabsProps)=>{
    return (
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
                <LoopItems
                 items={tabItms}
                 renderElemnt={(item:ITabItems,index)=>{
                    return(
                        <li key={index} className="me-2">
                            <Link 
                                href={item.href}
                                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTabKey===item.key?'active border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500':'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}>
                                {item.label}
                            </Link>
                        </li>
                    )
                 }}
                />
            </ul>
        </div>
    )
}

export {
    Tabs
}