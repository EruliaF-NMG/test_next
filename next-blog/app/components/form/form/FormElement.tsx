'use client'
import { initFormGroup, mergeFormObject, removeFormGroup, setPageLoad } from '@/global-state/slice/formSlices';
import { getData } from '@/lib/reqvest_data/get-data';
import { _get } from '@/lib/util/lodash.wrappers';
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

interface FormElementProps {
    formWrapperClassName?:string,
    formGroupKey?:string,
    setFormObject?:any,
    children?:any,
    apiURL?:string,
    overrideFormObject?:(apiResponce:any)=>any,
}

const FormElement=({
    formWrapperClassName="",
    formGroupKey="",
    setFormObject={},
    children=null,
    apiURL="",
    overrideFormObject=(apiResponce:any)=>{ undefined },
}:FormElementProps)=>{

    const formObject = useSelector((state:any) => state.form);
    const dispatch = useDispatch()

    const fetchDataANDSetFormObject = async () => {
        dispatch(setPageLoad({
            status:true,
            formGroupKey,
        }));
        const result = await getData(apiURL);
        const formData = overrideFormObject(result);

        dispatch(mergeFormObject({
            formObject:formData,
            formGroupKey,
        }));

        dispatch(setPageLoad({
            status:false,
            formGroupKey,
        }));
    }
    
    useEffect(() => { 
        if(apiURL!==""){
            dispatch(initFormGroup({
                formObject:{},
                formGroupKey,
            }));
            fetchDataANDSetFormObject();
        } else {
            dispatch(initFormGroup({
                formObject:setFormObject,
                formGroupKey,
            }));
        }

        return () => {
            dispatch(removeFormGroup(formGroupKey));
        }
    },[]);

    console.log("formObject",formObject)

    return(
        <Fragment>
            {
                _get(formObject,`${formGroupKey}._onLoad`,false)===false?(
                    <form className={formWrapperClassName}>
                         {children}
                    </form>
                ):(
                    <div>
                        <center>
                            Loding....
                        </center>
                    </div>
                )
            }
        </Fragment>
    );
}

export {
    FormElement
}