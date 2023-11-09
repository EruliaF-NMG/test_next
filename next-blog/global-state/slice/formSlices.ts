'use client';

import { _get } from '@/lib/util/lodash.wrappers';
import validate from '@/lib/validator';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface FormState {
    [key: string]: any
}

const initialState: FormState = {}



export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        initFormGroup: (state,action) => { 
            return {
                ...state,
                ...{
                    [action.payload.formGroupKey]:{
                        ...action.payload.formObject,
                        ['_updateStatus']: false,
                        ['_onLoad']:false,
                    }
                }
            };         
        },
        removeFormGroup: (state,action) => { 
            delete state[action.payload];
            return state;       
        },
        onInputChange: (state,action) => { 
            return {
                ...state,
                [action.payload.formGroupKey]:{
                    ...state[action.payload.formGroupKey],
                    [action.payload.inputName]:action.payload.inputValue,
                    _updateStatus:!state[action.payload.formGroupKey]["_updateStatus"]
                }
            };
        },
        setErrors: (state,action) => { 
            console.log(action.payload,"eeeee");
            return {
                ...state,
                [action.payload.formGroupKey]:{
                    ...state[action.payload.formGroupKey],
                    _errors:action.payload.error,
                    _updateStatus:!state[action.payload.formGroupKey]["_updateStatus"]
                }
            };
        },
        setPageLoad: (state,action) => { 
            console.log(action.payload,"setPageLoad")
            return {
                ...state,
                [action.payload.formGroupKey]:{
                    ...state[action.payload.formGroupKey],
                    _onLoad:action.payload.status,
                    _updateStatus:!state[action.payload.formGroupKey]["_updateStatus"]
                }
            };
        },
        mergeFormObject: (state,action) => { 
            return {
                ...state,
                [action.payload.formGroupKey]:{
                    ...state[action.payload.formGroupKey],
                    ...action.payload.formObject,
                    _updateStatus:!state[action.payload.formGroupKey]["_updateStatus"],
                    
                }
            };   
        },
        
    }
});

export const submitData = createAsyncThunk( "FORM/SUBMIT_DATA", async ({
    formGroupKey,
    validationSchema,
    body,
    apiURL,
    apiMethod,
    cb
 }:any,{dispatch})=>{
    dispatch({
        type:"form/setPageLoad",
        payload:{
            formGroupKey,
            status:true
        }
    });
    if(_get(validationSchema,'rules',null) !== null) {
        validate(body)
        .setFileds(_get(validationSchema,'fields',{}))
        .setRules(_get(validationSchema,'rules',{}))
        .setMessage(_get(validationSchema,'message',{}))
        .run( async (error:any) => {
            if (error) {
                dispatch({
                    type:"form/setErrors",
                    payload:{
                        formGroupKey:formGroupKey,
                        error:error
                    }
                });
                dispatch({
                    type:"form/setPageLoad",
                    payload:{
                        formGroupKey,
                        status:false
                    }
                });
                cb(error, null);
            } else {
                dispatch({
                    type:"form/setErrors",
                    payload:{
                        formGroupKey:formGroupKey,
                        error:[]
                    }
                });
                let response = await fetch(apiURL, {
                    method: apiMethod,
                    body: JSON.stringify(body),
                });
                response = await response.json();
                dispatch({
                    type:"form/setPageLoad",
                    payload:{
                        formGroupKey,
                        status:false
                    }
                });
                cb(null, response);
            }
        });
    } else {
        dispatch({
            type:"form/setErrors",
            payload:{
                formGroupKey:formGroupKey,
                error:[]
            }
        });
        let response = await fetch(apiURL, {
            method: apiMethod,
            body: JSON.stringify(body),
        });
        response = await response.json();
        dispatch({
            type:"form/setPageLoad",
            payload:{
                formGroupKey,
                status:false
            }
        });
        cb(null, response);
    }
});

export const { initFormGroup, removeFormGroup, onInputChange,setErrors,mergeFormObject,setPageLoad } = formSlice.actions;

export default formSlice.reducer;