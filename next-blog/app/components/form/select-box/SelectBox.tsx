'use client'

import { ChangeEvent } from "react"
import { InputElemnetWrapper } from "../wrappers/InputElemnetWrapper"
import { LoopItems } from "../../common/util/LoopItems"

interface SelectBoxProps {
    elementID?: string,
    labelText?: string,
    inputType?: string,
    name?: string,
    value?: string,
    items: any[],
    displayKey?: string,
    valueKey?: string,
    placeholder?: string,
    errorMessage?: string,
    inputBoxWrapperClassName?: string,
    labelWrapperClassName?: string,
    inputWrapperClassName?: string,
    erroWrapperClassName?: string,
    onChangeEvent?: (name:any,value:any,event:ChangeEvent<HTMLInputElement>)=>void
    onClickEvent?: ()=>void
}

const SelectBox=({
    elementID="",
    labelText="",
    name="",
    value="",
    placeholder="",
    errorMessage="",
    items=[],
    displayKey="",
    valueKey="",
    inputBoxWrapperClassName="",
    labelWrapperClassName="",
    inputWrapperClassName="",
    erroWrapperClassName="",
    onChangeEvent=(name:any,value:any,event:ChangeEvent<HTMLInputElement>)=>{},
    onClickEvent=()=>{}
}:SelectBoxProps ) : JSX.Element => {
    return(
        <InputElemnetWrapper
            elementID={elementID}
            labelText={labelText}
            errorMessage={errorMessage}
            inputBoxWrapperClassName={inputBoxWrapperClassName}
            labelWrapperClassName={labelWrapperClassName}
            erroWrapperClassName={erroWrapperClassName}
        >
            <select 
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${inputWrapperClassName}`} 
                value={value} 
                onChange={(event: ChangeEvent<HTMLInputElement>)=>onChangeEvent(name,event.target.value,event)}
                onClick={()=>onClickEvent()}
            >
            { (placeholder) && (<option key={0} value="">{placeholder}</option>) }
            <LoopItems
                items={items}
                renderElemnt={(item,index)=> {
                    return(
                        <option key={index} value={item[valueKey]}>{item[displayKey]}</option>
                    )
                
                }}
            />
            </select>
        </InputElemnetWrapper>
    )
}

export {
    SelectBox
}