
interface InputElemnetWrapperProps {
    elementID?: string,
    labelText?: string,
    errorMessage?: string,
    inputBoxWrapperClassName?: string,
    labelWrapperClassName?: string,
    erroWrapperClassName?: string,
    children?: JSX.Element | JSX.Element[] | null
}


const InputElemnetWrapper = ({
    elementID="",
    labelText="",
    errorMessage="",
    inputBoxWrapperClassName="",
    labelWrapperClassName="",
    erroWrapperClassName="",
    children=null,
}:InputElemnetWrapperProps ) : JSX.Element => {
    return(
        <div className={inputBoxWrapperClassName}>
            <label 
                htmlFor={elementID} 
                className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${labelWrapperClassName}`}
            >
                {labelText}
            </label>
            { children }
            <p className={`mt-2 text-sm text-red-600 dark:text-red-500 ${erroWrapperClassName}`}>
                {errorMessage}
            </p>
        </div>
    )
}

export {
    InputElemnetWrapper
}