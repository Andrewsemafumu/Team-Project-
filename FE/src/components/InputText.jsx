import { forwardRef } from "react";

/* eslint-disable react/prop-types */
const InputText = forwardRef(function InputText({onChange, inputName, label, InputclassName, LabelclassName, type = "text", disabled, value},ref){
    return(
        <div className={"relative w-full"}>
            <input
                ref={ref}
                id={inputName}
                name={inputName}
                onChange={onChange}
                type={type}
                placeholder=" "
                disabled={disabled}
                value={value}
                className={"peer w-full px-4 pt-7 pb-3 focus:outline-none transition ease-in-out border-2 text-xl rounded-lg " + InputclassName}
            />
            <label
                htmlFor={inputName}
                className={"absolute left-4 top-2 text-sm transition-all peer-focus:top-2 peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg " + LabelclassName}
            >{label}</label>
        </div>
    );
})

export default InputText;