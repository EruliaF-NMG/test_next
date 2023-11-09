'use client'

import { ChangeEvent } from "react"
import { InputElemnetWrapper } from "../wrappers/InputElemnetWrapper"
import { useDispatch, useSelector } from "react-redux"
import { _get } from "@/lib/util/lodash.wrappers"
import { onInputChange } from "@/global-state/slice/formSlices"

interface InputBoxProps {
    elementID?: string,
    labelText?: string,
    inputType?: string,
    name?: string,
    value?: string,
    placeholder?: string,
    errorMessage?: string,
    inputBoxWrapperClassName?: string,
    labelWrapperClassName?: string,
    inputWrapperClassName?: string,
    erroWrapperClassName?: string,
    onChangeEvent?: (name:any,value:any,event:ChangeEvent<HTMLInputElement>)=>void
    onClickEvent?: ()=>void
}

const InputBox = ({
    elementID="",
    labelText="",
    inputType="text",
    name="",
    value="",
    placeholder="",
    errorMessage="",
    inputBoxWrapperClassName="",
    labelWrapperClassName="",
    inputWrapperClassName="",
    erroWrapperClassName="",
    onChangeEvent=(name:any,value:any,event:ChangeEvent<HTMLInputElement>)=>{},
    onClickEvent=()=>{}
}:InputBoxProps ) : JSX.Element => {
    return(
        <InputElemnetWrapper
            elementID={elementID}
            labelText={labelText}
            errorMessage={errorMessage}
            inputBoxWrapperClassName={inputBoxWrapperClassName}
            labelWrapperClassName={labelWrapperClassName}
            erroWrapperClassName={erroWrapperClassName}
        >
            <input 
                type={inputType}
                id={elementID}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${inputWrapperClassName}`} 
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={(event: ChangeEvent<HTMLInputElement>)=>onChangeEvent(name,event.target.value,event)}
                onClick={()=>onClickEvent()}
            />
        </InputElemnetWrapper>
    )
}

interface InputBoxWithStateProps {
    elementID?: string,
    labelText?: string,
    inputType?: string,
    name?: string,
    defaultValue?: string,
    formGroupKey?: string,
    placeholder?: string,
    errorMessage?: string,
    inputBoxWrapperClassName?: string,
    labelWrapperClassName?: string,
    inputWrapperClassName?: string,
    erroWrapperClassName?: string,
    onChangeEvent?: (name:any,value:any,event:ChangeEvent<HTMLInputElement>)=>void
    onClickEvent?: ()=>void

}

const InputBoxWithState = ({
    elementID="",
    labelText="",
    inputType="text",
    name="",
    defaultValue="",
    formGroupKey="",
    placeholder="",
    inputBoxWrapperClassName="",
    labelWrapperClassName="",
    inputWrapperClassName="",
    erroWrapperClassName="",
    onChangeEvent=(name:any,value:any,event:ChangeEvent<HTMLInputElement>)=>{},
    onClickEvent=()=>{}
}:InputBoxWithStateProps) : JSX.Element => {

    const formObject = useSelector((state:any) => state.form);
    const dispatch = useDispatch()

    const getErrorMessage = () => {
        const errorObject = _get(formObject,`${formGroupKey}._errors`,[]).find(item => item.property === name)||{};
        return errorObject.message || "";
    }

    return(
        <InputBox
            elementID={elementID}
            labelText={labelText}
            inputType={inputType}
            name={name}
            value={_get(formObject,`${formGroupKey}.${name}`,defaultValue)}
            placeholder={placeholder}
            errorMessage={getErrorMessage()}
            inputBoxWrapperClassName={inputBoxWrapperClassName}
            labelWrapperClassName={labelWrapperClassName}
            inputWrapperClassName={inputWrapperClassName}
            erroWrapperClassName={erroWrapperClassName}
            onChangeEvent={(name:any,value:any,event:ChangeEvent<HTMLInputElement>)=>{
                dispatch(onInputChange({
                    formGroupKey: formGroupKey,
                    inputValue: value,
                    inputName: name
                }));
                onChangeEvent(name,value,event);
            }}
            onClickEvent={onClickEvent}
        />
    );
}

export {
    InputBoxWithState,
    InputBox
}