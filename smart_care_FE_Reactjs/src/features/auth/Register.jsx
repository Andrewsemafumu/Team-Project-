/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet";
import InputText from "../../components/InputText";
import FilterCheckBox from "../../components/FilterCheckBox";
import Button from "../../components/Button";
import utils from "../../utils/utils";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import $ from 'jquery';

function Register(){

    const showPassref = useRef();
    const passwordRef = useRef();
    const repasswordRef = useRef();

    const isLogin = function(){
        if(utils.UID){
            nav("/");
        }else{
            utils.ClearLocal();
        }
    }

    useEffect(()=>{
        isLogin();
    }, [])
    
    const nav = useNavigate();

    const handleCheckboxChange = function() {
        if(showPassref.current && passwordRef.current && repasswordRef.current){
            passwordRef.current.type = showPassref.current.checked ? "text" : "password";
            repasswordRef.current.type = showPassref.current.checked ? "text" : "password";
        }
    }

    const [registerData, setRegisterData] = useState({
        name        : "",
        mail        : "",
        phone       : "",
        pass        : "",
        repass      : "",
    });

    const handleChange = function(e){
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = async function(){
        if(registerData.name.length < 7){
            alert("Username too short!")
            return;
        }
        if(registerData.name.length > 20){
            alert("Username too long!")
            return;
        }
        if(!registerData.mail.includes("@") || !registerData.mail.includes(".")){
            alert("Please check email format!")
            return;
        }
        if(registerData.phone.length < 10 || registerData.phone.length > 11){
            alert("Please check phone number!")
            return;
        }
        if(registerData.pass.length < 8){
            alert("Password too short!")
            return;
        }
        if(registerData.repass !== registerData.pass){
            alert("Re-enter password was wrong!")
            return;
        }

        $.ajax({
            url    : utils.URL_BE_BASE + "auth/register" ,
            crossDomain: true,
            type   : "POST",
            data   : {
                ...registerData
            },
            timeout: 10000,
            success: (d)=>{
                alert(d.message);
                nav("/auth/login");
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message);
            },
        })
    }

    return(
        <>
            <Helmet><title>SMARTCARE | Create account</title></Helmet>
            <div className="flex items-start justify-evenly w-screen gap-3 h-screen fixed">
            {/* register form */}
            <div className="w-full flex-1/2 overflow-scroll h-full">
                <div className="p-10 rounded-2xl w-full">
                    <h1 className="text-4xl text-[#2D3A45] font-semibold pt-7">Create account</h1>
                    <p className="pt-7 px-1 pb-10">
                        <p className="text-lg text-[#2D3A45]">If you already have account,</p>
                        <p className="text-lg text-[#2D3A45]">login <a onClick={()=>nav("/auth/login")} className="cursor-pointer font-bold text-[#2D3A45]">here!</a></p>
                        <p className="text-md text-[#2D3A45]"><a onClick={()=>nav("/")} className="cursor-pointer font-bold text-[#2D3A45] ">Home</a></p>
                    </p>
                    <div className="flex flex-col gap-5 pb-5">
                        <InputText onChange={(e)=>handleChange(e)} inputName="name" InputclassName="bg-[white] text-[#2C1E14]  border-[#00000031] focus:border-[#00000082]" LabelclassName="text-[#2C1E14] peer-placeholder-shown:text-[#2C1E14]" label="Username" />
                        <InputText onChange={(e)=>handleChange(e)} inputName="mail" InputclassName="bg-[white] text-[#2C1E14]  border-[#00000031] focus:border-[#00000082]" LabelclassName="text-[#2C1E14] peer-placeholder-shown:text-[#2C1E14]" label="Email" />
                        <InputText onChange={(e)=>handleChange(e)} inputName="phone" InputclassName="bg-[white] text-[#2C1E14]  border-[#00000031] focus:border-[#00000082]" LabelclassName="text-[#2C1E14] peer-placeholder-shown:text-[#2C1E14]" label="Phone number" />
                        <InputText onChange={(e)=>handleChange(e)} inputName="pass" type="password" ref={passwordRef} InputclassName="bg-[white] text-[#2C1E14]  border-[#00000031] focus:border-[#00000082]" LabelclassName="text-[#2C1E14] peer-placeholder-shown:text-[#2C1E14]" label="Password" />
                        <InputText onChange={(e)=>handleChange(e)} inputName="repass" type="password" ref={repasswordRef} InputclassName="bg-[white] text-[#2C1E14]  border-[#00000031] focus:border-[#00000082]" LabelclassName="text-[#2C1E14] peer-placeholder-shown:text-[#2C1E14]" label="Re-enter pasword" />
                    </div>
                    <div className="flex justify-start items-center px-1 pb-2">
                        <FilterCheckBox input_name="show_pass_check" ref={showPassref} onChange={handleCheckboxChange} name="Show password" />
                    </div>
                    <div className="pt-3">
                        <Button
                            className="w-full h-12 bg-[#2D3A45] text-[white] rounded-lg text-lg font-bold hover:bg-[white] hover:text-[#2D3A45] transition-all duration-300"
                            childs="Create account"
                            click={()=>handleRegister()}
                        />
                    </div>
                </div>
            </div>
            {/* img view slide */}
            <div className="w-full flex-1/2 hidden sm:hidden md:hidden lg:flex xl:flex items-center h-screen justify-center">
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

export default Register;