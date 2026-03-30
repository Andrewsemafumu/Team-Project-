import { useNavigate } from "react-router";
import utils from "../../utils/utils";
import Button from "../../components/Button";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import $ from "jquery";

function Home(){
        
        const nav = useNavigate();

        const [todayReport, setTodayReport] = useState({
            "booked": 0,
            "checkin": 0,
            "complete": 0,
            "doctor_create_today": 0,
            "patient_create_today": 0,
            "reception_create_today": 0,
            "doctor_have_specialty": 0,
            "doctor_dont_have_specialty": 0,
            "specialty": 0,
            "specialty_create_today": 0
        })

        useEffect(()=>{
            if(utils.UROLE === "ADMIN" || utils.UROLE === "RECEPTION"){
                $.ajax({
                    url    : utils.URL_BE_BASE + "todayreport",
                    headers: {
                        tokenizer: localStorage.getItem("%UT%")
                    },
                    crossDomain: true,
                    type   : "GET",
                    timeout: 10000,
                    success: (d)=>{
                        setTodayReport(d)
                    },
                    error  : (e)=>{
                        console.log(e);
                        alert(e.responseJSON?.message)
                    },
                })
            }
        },[])

        return(
            <>
            <Helmet><title>SMARTCARE | Home</title></Helmet>
            <div className="flex justify-evenly items-center bg-[white]">
                <div className="p-10">
                    <h1 className=" capitalize text-[#000000] text-5xl w-150 pb-5">Welcome to smart care</h1>
                    <div className="flex flex-col items-start gap-2">
                        <p className="text-wrap text-md w-110 text-[#2C1E14]">Smartcare, where you can trust to protect your health.</p>
                        <p className="text-wrap text-sm w-110 text-[#2C1E14] pb-2">
                        {
                            utils.UID
                            ?
                            `Welcome ${utils.UNAME} (${utils.UROLE})`
                            :
                            ""
                        }
                        </p>
                        {
                            utils.UROLE === "ADMIN" || utils.UROLE === "RECEPTION"
                            ?
                                <div className="w-full flex gap-2 flex-wrap p-2 rounded-2xl">
                                    <h1 className="text-[#000000] font-bold text-xl pb-1 italic">Daily report</h1>
                                    <div className="w-full">
                                        <h1 className="text-[#000000] text-sm pb-2 font-semibold">Specialty: {todayReport.specialty}</h1>
                                        <h1 className="text-[#000000] text-sm pb-2 font-semibold">Specialty (created today): {todayReport.specialty_create_today}</h1>
                                        <h1 className="text-[#000000] text-sm pb-2 font-semibold">Patient (created today): {todayReport.patient_create_today}</h1>
                                        <h1 className="text-[#000000] text-sm pb-2 font-semibold">Doctor (created today): {todayReport.doctor_create_today}</h1>
                                        <h1 className="text-[#000000] text-sm pb-2 font-semibold">Receptionist (created today): {todayReport.reception_create_today}</h1>
                                        <h1 className="text-[#000000] text-sm pb-2 font-semibold">Booking (booked): {todayReport.booked}</h1>
                                        <h1 className="text-[#000000] text-sm pb-2 font-semibold">Booking (check-in): {todayReport.checkin}</h1>
                                        <h1 className="text-[#000000] text-sm pb-2 font-semibold">Booking (done): {todayReport.complete}</h1>
                                        <h1 className="text-[#000000] text-sm pb-2 font-semibold">Doctor (have specialty): {todayReport.doctor_have_specialty}</h1>
                                        <h1 className="text-[#000000] text-sm font-semibold">Booking (don&apos;t have specialty): {todayReport.doctor_dont_have_specialty}</h1>
                                    </div>
                                </div>
                            :
                            null
                        }
                        <div className="flex items-center justify-start gap-3 pt-5 flex-wrap">
                            
                            {
                                utils.UID && utils.UROLE
                                ?
                                    utils.UROLE === "ADMIN" || utils.UROLE === "RECEPTION"
                                    ?
                                        <>

                                            <Button
                                                className="text-nowrap font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Edit Account"
                                                click={()=>{nav("/account")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Statistics"
                                                click={()=>{nav("/statistics")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Change password"
                                                click={()=>{nav("/changepass")}}
                                            />
                                            <Button
                                                className="text-nowrap font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="User manager"
                                                click={()=>{nav("/user")}}
                                            />
                                            <Button
                                                className="text-nowrap font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Specialty manager"
                                                click={()=>{nav("/specialty")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Booking"
                                                click={()=>{nav("/manager/booking")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#ffffff] bg-[#e12727] px-6 py-2  rounded-lg shadow-2xl"
                                                childs="Logout"
                                                click={()=>{utils.ClearLocal(); window.location.reload()}}
                                            />
                                        </>
                                    :
                                    utils.UROLE === "DOCTOR"
                                    ?
                                        <>
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Edit Account"
                                                click={()=>{nav("/account")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Change password"
                                                click={()=>{nav("/changepass")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Booking"
                                                click={()=>{nav("/doctor/booking")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#ffffff] bg-[#e12727] px-6 py-2  rounded-lg shadow-2xl"
                                                childs="Logout"
                                                click={()=>{utils.ClearLocal(); window.location.reload()}}
                                            />
                                        </>
                                    :
                                    utils.UROLE === "CLIENT"
                                    ?
                                        <>
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Edit Account"
                                                click={()=>{nav("/account")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Change password"
                                                click={()=>{nav("/changepass")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Booking"
                                                click={()=>{nav("/client/booking")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#ffffff] bg-[#e12727] px-6 py-2  rounded-lg shadow-2xl"
                                                childs="Logout"
                                                click={()=>{utils.ClearLocal(); window.location.reload()}}
                                            />
                                        </>
                                    :
                                    null
                                :
                                <>
                                    <Button
                                        className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2  rounded-lg shadow-2xl"
                                        childs="Login"
                                        click={()=>{nav("/auth/login")}}
                                    />
                                    <Button
                                        className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2  rounded-lg shadow-2xl"
                                        childs="Register"
                                        click={()=>{nav("/auth/register")}}
                                    />
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex relative items-center h-screen ">
                    <img
                        src="auth1.png"
                        alt=""
                        className="rounded-xl object-cover w-full h-full transition-opacity ease-in-out duration-1000" 
                    />
            </div>
            </div>
        </>
    );
}

export default Home;