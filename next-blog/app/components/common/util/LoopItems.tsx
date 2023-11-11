

interface LoopItemsProps {
    items: any[],
    renderElemnt?: (item:any,index:number)=>JSX.Element|null
}

const LoopItems = ({
    items=[],
    renderElemnt=(item:any,index:number)=>null,
}:LoopItemsProps) : JSX.Element =>  {
    return(
        <>
            {
                (items).map((item,index)=>{
                    return (
                        renderElemnt(item,index)
                    )
                })
            }
        </>
    )
}

export {
    LoopItems
}