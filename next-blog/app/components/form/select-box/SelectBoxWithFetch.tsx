'use client'
import { ChangeEvent, useEffect, useState } from "react"
import { SelectBox } from "./SelectBox"
import { getData } from "@/lib/reqvest_data/get-data"
import { useDispatch, useSelector } from "react-redux"
import { onInputChange } from "@/global-state/slice/formSlices"
import { _get } from "@/lib/util/lodash.wrappers"

interface SelectBoxWithFetchProps {
    elementID?: string,
    labelText?: string,
    inputType?: string,
    name?: string,
    value?: string,
    displayKey?: string,
    valueKey?: string,
    apiURL?: string,
    placeholder?: string,
    errorMessage?: string,
    inputBoxWrapperClassName?: string,
    labelWrapperClassName?: string,
    inputWrapperClassName?: string,
    erroWrapperClassName?: string,
    onChangeEvent?: (name:any,value:any,event:ChangeEvent<HTMLInputElement>)=>void
    onClickEvent?: ()=>void
}

const SelectBoxWithFetch = ({
    elementID="",
    labelText="",
    name="",
    value="",
    placeholder="",
    errorMessage="",
    displayKey="",
    valueKey="",
    apiURL="",
    inputBoxWrapperClassName="",
    labelWrapperClassName="",
    inputWrapperClassName="",
    erroWrapperClassName="",
    onChangeEvent=(name:any,value:any,event:ChangeEvent<HTMLInputElement>)=>{},
    onClickEvent=()=>{}
}:SelectBoxWithFetchProps ) : JSX.Element => {

    const [items,setItem] = useState([]);

    useEffect(()=>{
        getData(apiURL).then((data:any)=>{
            setItem(data);
        }).catch((error)=>{
            setItem([]);
        });
    },[])


    return(
        <SelectBox
            elementID={elementID}
            labelText={labelText}
            name={name}
            value={value}
            placeholder={placeholder}
            errorMessage={errorMessage}
            displayKey={displayKey}
            valueKey={valueKey}
            items={items}
            inputBoxWrapperClassName={inputBoxWrapperClassName}
            labelWrapperClassName={labelWrapperClassName}
            inputWrapperClassName={inputWrapperClassName}
            erroWrapperClassName={erroWrapperClassName}
            onChangeEvent={(name,value,event)=>onChangeEvent(name,value,event)}
            onClickEvent={()=>onClickEvent()}
        />
    )
}

interface SelectBoxWithStateProps {
    elementID?: string,
    labelText?: string,
    inputType?: string,
    name?: string,
    defaultValue?: string,
    displayKey?: string,
    valueKey?: string,
    apiURL?: string,
    formGroupKey?: string,
    placeholder?: string,
    inputBoxWrapperClassName?: string,
    labelWrapperClassName?: string,
    inputWrapperClassName?: string,
    erroWrapperClassName?: string,
    onChangeEvent?: (name:any,value:any,event:ChangeEvent<HTMLInputElement>)=>void
    onClickEvent?: ()=>void
}

const SelectBoxWithState = ({
    elementID="",
    labelText="",
    name="",
    placeholder="",
    displayKey="",
    valueKey="",
    defaultValue="",
    formGroupKey="",
    apiURL="",
    inputBoxWrapperClassName="",
    labelWrapperClassName="",
    inputWrapperClassName="",
    erroWrapperClassName="",
    onChangeEvent=(name:any,value:any,event:ChangeEvent<HTMLInputElement>)=>{},
    onClickEvent=()=>{}
}:SelectBoxWithStateProps) : JSX.Element => {
    const formObject = useSelector((state:any) => state.form);
    const dispatch = useDispatch();

    const getErrorMessage = () => {
        const errorObject = _get(formObject,`${formGroupKey}._errors`,[]).find(item => item.property === name)||{};
        return errorObject.message || "";
    }

    return(
        <SelectBoxWithFetch
            elementID={elementID}
            labelText={labelText}
            name={name}
            value={_get(formObject,`${formGroupKey}.${name}`,defaultValue)}
            placeholder={placeholder}
            errorMessage={getErrorMessage()}
            displayKey={displayKey}
            valueKey={valueKey}
            apiURL={apiURL}
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
            onClickEvent={()=>onClickEvent()}
        />
    )
}

export {
    SelectBoxWithFetch,
    SelectBoxWithState
}


