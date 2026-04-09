import { forwardRef } from "react";

/* eslint-disable react/prop-types */
const InputTextArea = forwardRef(function InputTextArea({onChange, inputName, label, InputclassName, LabelclassName, disabled, value}, ref){
    return(
        <div className={"relative w-full"}>
            <textarea
                id={inputName}
                name={inputName}
                onChange={onChange}
                minLength={10}
                type="text"
                ref={ref}
                value={value}
                placeholder=" "
                disabled={disabled}
                className={"peer w-full px-4 pt-7 pb-3 focus:outline-none transition ease-in-out border-2 text-xl rounded-lg " + InputclassName}
            ></textarea>
            <label
                htmlFor={inputName}
                className={"absolute left-4 top-2 text-sm transition-all peer-focus:top-2 peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg " + LabelclassName}
            >
            {label}
            </label>
        </div>
    );
})

export default InputTextArea;