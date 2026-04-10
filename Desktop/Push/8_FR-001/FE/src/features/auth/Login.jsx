/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet";
import InputText from "../../components/InputText";
import FilterCheckBox from "../../components/FilterCheckBox";
import Button from "../../components/Button";
import utils from "../../utils/utils";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import $ from "jquery";

function Login(){

    useEffect(()=>{
        isLogin();
    }, [])

    const showPassref = useRef();
    const passwordRef = useRef();

    const nav = useNavigate();

    const handleCheckboxChange = function() {
        if(showPassref.current && passwordRef.current){
            passwordRef.current.type = showPassref.current.checked ? "text" : "password";
        }
    }

    const isLogin = function(){
        if(utils.UID){
            nav("/");
        }else{
            utils.ClearLocal();
        }
    }

    const [loginData, setLoginData] = useState({
        email_phone : "",
        pass        : "",
    });

    const handleChange = function(e){
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async function(){
        $.ajax({
            url    : utils.URL_BE_BASE + "auth/login" ,
            crossDomain: true,
            type   : "POST",
            data   : {
                ...loginData
            },
            timeout: 10000,
            success: (d)=>{
                utils.Save_uD(d);
                alert(d.message)
                nav("/");
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    return(
        <>
        <Helmet><title>SMARTCARE | Login</title></Helmet>
        <div className="flex items-center justify-center w-screen gap-1" >
            {/* login form */}
            <div className="w-full flex-1/2">
                <div className="p-10 rounded-2xl w-full h-full">
                    <h1 className="text-4xl text-[#2D3A45] font-semibold pt-7">Login</h1>
                    <p className="pt-7 px-1 pb-10">
                        <p className="text-lg text-[#2D3A45]">If you don&apos;t have account,</p>
                        <p className="text-lg text-[#2D3A45]">create one <a onClick={()=>nav("/auth/register")} className="cursor-pointer font-bold text-[#2D3A45] ">here!</a></p>
                        <p className="text-md text-[#2D3A45]"><a onClick={()=>nav("/")} className="cursor-pointer font-bold text-[#2D3A45] ">Home</a></p>
                    </p>
                    <div className="flex flex-col gap-5 pb-5">
                        <InputText onChange={(e)=>handleChange(e)} inputName="email_phone" InputclassName="bg-[white] text-[#2C1E14] border-[#00000031] focus:border-[#00000082] " LabelclassName="text-[#2C1E14] peer-placeholder-shown:text-[#2C1E14]" label="Email or Phone number" />
                        <InputText onChange={(e)=>handleChange(e)} inputName="pass" type="password" ref={passwordRef} InputclassName="bg-[white] text-[#2C1E14] border-[#00000031] focus:border-[#00000082]" LabelclassName="text-[#2C1E14] peer-placeholder-shown:text-[#2C1E14]" label="Password" />
                    </div>
                    <div className="flex justify-start items-center px-1">
                        <FilterCheckBox input_name="show_pass_check" ref={showPassref} onClick={()=>handleCheckboxChange()} name="Show password" />
                    </div>
                    <div className="pt-10">
                        <Button
                            className="w-full h-12 bg-[#2D3A45] text-[white] rounded-lg text-lg font-bold hover:bg-[#ffffff] hover:text-[#2D3A45] transition-all duration-300"
                            childs="Login"
                            click={()=>handleLogin()}
                        />
                    </div>
                </div>
            </div>
            {/* img view slide */}
            <div className="w-full hidden sm:hidden md:hidden flex-1/2 lg:flex xl:flex items-center justify-end">
                <div className="flex relative items-center h-screen w-full">
                    <img
                        src="/auth1.png"
                        alt=""
                        className="rounded-tl-xl rounded-bl-xl absolute left-0 object-cover w-full h-full border-0 shadow-lg transition-opacity ease-in-out duration-1000"
                    />
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;