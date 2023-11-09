

interface LoopItemsProps {
    items: any[],
    renderElemnt: (item:any,index:number)=>JSX.Element
}

const LoopItems = ({
    items=[],
    renderElemnt=(item:any,index:number)=>null,
}) : JSX.Element =>  {
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