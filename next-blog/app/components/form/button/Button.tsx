'use client'

import { submitData } from "@/global-state/slice/formSlices"
import { _get } from "@/lib/util/lodash.wrappers"
import { useDispatch, useSelector } from "react-redux"


interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined,
    buttonClassName?: string,
    buttonText?: string,
    onClickEvent?: ()=>void
}

const Button = ({
    type="button",
    buttonClassName="",
    buttonText="",
    onClickEvent=()=>{}
}:ButtonProps) : JSX.Element => {
  return (
    <button 
        type={type} 
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={()=>onClickEvent()}
    >
        {buttonText}
    </button>
  )
}

interface ButtonWithStateProps {
    type?: "button" | "submit" | "reset" | undefined,
    buttonClassName?: string,
    formGroupKey?: string,
    buttonText?: string,
    apiUrl?: string,
    apiMethod?: string,
    validationSchema?: any,
    onClickEvent?: (error:any,result:any)=>void,
    onOverrideFormObject?: (formObject:any)=>any
}

const ButtonWithState = ({
  type="button",
  buttonClassName="",
  buttonText="",
  formGroupKey="",
  apiUrl="",
  apiMethod="POST",
  validationSchema={},
  onClickEvent=(error:any,result:any)=>{},
  onOverrideFormObject=(formObject:any)=>{ undefined }
}:ButtonWithStateProps) : JSX.Element => {

  const formObject = useSelector((state:any) => state.form);
  const dispatch = useDispatch();

  const onBtnClick = () => {
    const object = onOverrideFormObject(_get(formObject,`${formGroupKey}`,{})) ?? _get(formObject,`${formGroupKey}`,{});
    dispatch(submitData({
      apiURL:apiUrl,
      apiMethod:apiMethod,
      formGroupKey:formGroupKey,
      body:object,
      validationSchema:validationSchema,
      cb:(error,result)=>onClickEvent(error,result)
    }));
  };

    return(
      <Button
        type={type}
        buttonClassName={buttonClassName}
        buttonText={buttonText}
        onClickEvent={()=>onBtnClick()}
      />
    )
}


export {
  Button,
  ButtonWithState
}