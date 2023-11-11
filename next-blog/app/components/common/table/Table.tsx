import { _get } from "@/lib/util/lodash.wrappers"
import { LoopItems } from "../util/LoopItems"

interface Tablehead {
    key:string,
    label:string,
    renderElemnt?: (data:any)=>JSX.Element|null
}

interface TableProps {
    tablehead:Array<Tablehead>,
    body:any[],
    tableWrapper?:string
}

const Table = ({
    tablehead=[],
    body=[],
    tableWrapper="",
}:TableProps) => {
    return (
        <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ${tableWrapper}`}>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                    <LoopItems
                        items={tablehead}
                        renderElemnt={(item:Tablehead,index)=>{
                            return(
                                <th key={`${item.key}${index}`} scope="col" className="px-6 py-3">
                                    {item.label}
                                </th>
                            )
                        }}
                    />
                    </tr>
                </thead>
                <tbody>
                    <LoopItems
                        items={body}
                        renderElemnt={(bodyItem:any,index:number)=>{
                            return(
                                <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <LoopItems
                                        items={tablehead}
                                        renderElemnt={(headerItem:Tablehead,index)=>{
                                            return(
                                                <td key={`data-${headerItem.key}-${index}`} className="px-6 py-4">
                                                    { headerItem.renderElemnt(bodyItem) !== null ? headerItem.renderElemnt(bodyItem) : _get(bodyItem,headerItem.key,'') }
                                                </td>
                                            )
                                        }}
                                    />
                                </tr>
                            )
                        }}
                    />
                </tbody>
            </table>
        </div>
    )
}

export {
    Table
}