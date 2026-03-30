import { forwardRef } from "react";

/* eslint-disable react/prop-types */
const FilterCheckBox = forwardRef(function FilterCheckBox({ value, input_name, name, isChecked, onChange, onClick },ref){
    return(
        <div className="flex justify-start items-center gap-3">
            <label className="container_check">
                <input ref={ref} onClick={onClick} checked={isChecked ? "checked" : null} onChange={onChange} type="checkbox" value={value} name={input_name}/>
                <div className="checkmark"></div>
            </label>
            <p className="text-sm sm:text-md md:text-md lg:text-md xl:text-md text-[#2D3A45]">{name}</p>
        </div>
    );
})

export default FilterCheckBox;