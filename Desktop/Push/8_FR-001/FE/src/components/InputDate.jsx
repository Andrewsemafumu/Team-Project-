
/* eslint-disable react/prop-types */
function InputDate({onChange, inputName, InputclassName, disabled, value}){
    return(
        <div className={"relative w-full"}>
            <input
                id={inputName}
                name={inputName}
                onChange={onChange}
                type="date"
                placeholder=" "
                disabled={disabled}
                value={value}
                className={"w-full px-2 py-1 focus:outline-none disabled:bg-[#f0f0f0] disabled:text-[#969696] transition ease-in-out border-2 text-lg rounded-lg " + InputclassName}
            />
        </div>
    );
}

export default InputDate;