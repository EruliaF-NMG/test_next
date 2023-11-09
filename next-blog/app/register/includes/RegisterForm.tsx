'use client'
import { useRouter } from "next/navigation"

import { ButtonWithState } from "@/app/components/form/button/Button";
import { InputBoxWithState } from "@/app/components/form/input-box/InputBox";
import { registerAPI } from "@/config/api-end-opints";
import { FormElement } from "@/app/components/form/form/FormElement";

const formGroupKey:string="registerForm";

const RegisterForm = () => {
   const router = useRouter()
    return(
        <FormElement
            formGroupKey={formGroupKey}
            setFormObject={{
                email:"",
                password:"",
                name:"",
            }}
        >
            <InputBoxWithState
              labelText="Name"
              elementID="name"
              name="name"
              formGroupKey={formGroupKey}
              placeholder="Name"
            />
           <InputBoxWithState
              labelText="E-mail"
              elementID="email"
              name="email"
              formGroupKey={formGroupKey}
              placeholder="E-mail"
            />
             <InputBoxWithState
              inputType="password"
              labelText="Password"
              elementID="password"
              name="password"
              formGroupKey={formGroupKey}
              placeholder="Password"
            />
            <ButtonWithState
                buttonText="Register"
                apiUrl={registerAPI}
                apiMethod="POST"
                formGroupKey={formGroupKey}
                validationSchema={{
                    fields:{
                        'name':'Name',
                        'password':'Password',
                        'email':'E-mail'
                    },
                    rules:{
                        'name':'required|min:3',
                        'password':'required|min:3',
                        'email':'required'
                    }
                }}
                onClickEvent={(error)=>{
                    if(!error){
                        router.push("/")
                        return;
                    }
                }}
           />
        </FormElement>
    )
}

export {
    RegisterForm
}