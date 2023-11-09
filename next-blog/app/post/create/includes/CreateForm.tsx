'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ButtonWithState } from "@/app/components/form/button/Button";
import { InputBoxWithState } from "@/app/components/form/input-box/InputBox";
import { SelectBoxWithState } from "@/app/components/form/select-box/SelectBoxWithFetch";
import { TextareaWithState } from "@/app/components/form/textarea/Textarea";
import { createArticleAPI, getCatagoryAPI } from "@/config/api-end-opints";
import { FormElement } from "@/app/components/form/form/FormElement";

const formGroupKey:string="createPost";

interface CreateFormProps {
      type?:'CREATE'|'EDIT'
      blogID?:string
}

const CreateForm = ({
   type="CREATE",
   blogID="",
}) => {
   const { data } = useSession();
   const router = useRouter()
   const editAPI = `${createArticleAPI}/${blogID}`;
    return(
        <FormElement
            formGroupKey={formGroupKey}
            apiURL={type==="EDIT"?editAPI:""}
            overrideFormObject={(apiResponce)=>{
               return {
                  title:apiResponce.title,
                  categoryId:apiResponce.categoryId,
                  body:apiResponce.body,
               }
            }}
            setFormObject={{
                title:"",
                categoryId:"",
                body:"",
            }}
        >
            <InputBoxWithState
              labelText="Title"
              elementID="title"
              name="title"
              formGroupKey={formGroupKey}
              placeholder="Title"
            />
           <SelectBoxWithState
              labelText="Post Type"
              elementID="categoryId"
              name="categoryId"
              formGroupKey={formGroupKey}
              apiURL={getCatagoryAPI}
              displayKey="name"
              valueKey="id"
              placeholder="----Select Item----"
           />
           <TextareaWithState
              labelText="Discraption"
              elementID="body"
              formGroupKey={formGroupKey}
              name="body"
              placeholder="add discraption"
           />
           <ButtonWithState
              buttonText="Submit"
              apiUrl={ type==="CREATE"?createArticleAPI:editAPI}
              apiMethod={ type==="CREATE"?"POST":"PUT"}
              formGroupKey={formGroupKey}
              onOverrideFormObject={(formObject)=>{
               return {
                  ...formObject,
                  authorId: data?.user?.id
               }
              }}
              validationSchema={{
                  fields:{
                     'title':'Title',
                     'categoryId':'Post Type',
                     'body':'Discraption'
                  },
                  rules:{
                     'title':'required|min:5',
                     'categoryId':'required',
                     'body':'required|min:10'
                  }
               }}
              onClickEvent={(error,result)=>{
               if(!error){
                  router.reload("/")
                  return;
               }
              }}
           />
        </FormElement>
    )
}

export {
    CreateForm
}