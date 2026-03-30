import { forwardRef } from "react";

// eslint-disable-next-line react/prop-types
const Button = forwardRef(function Button({className, childs, click, disabled=false, title=""}, ref){
    return(
        <button className={"cursor-pointer disabled:opacity-40 "+className} title={title} disabled={disabled} ref={ref} onClick={click}>
            {childs}
        </button>
    );
})

export default Button;