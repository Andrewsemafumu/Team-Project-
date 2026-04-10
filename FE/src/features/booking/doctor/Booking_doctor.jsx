import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { Helmet } from "react-helmet";
import utils from "../../../utils/utils";
import { MdOutlineDone } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import { TbProgressCheck } from "react-icons/tb";
import $ from "jquery";

export default function Booking_client(){

    useEffect(()=>{
        isLogin();
    }, [])

    const nav = useNavigate();
    
    // check login funciton
    const isLogin = function(){
        if(!utils.UID){
            utils.ClearLocal();
            nav("/auth/login");
        }else{
            if(utils.UROLE !== "DOCTOR" && utils.UROLE !== "ADMIN"){
                alert("You don't have any permission on this page!")
                nav("/")
            }
            getall_booking();
        }
    }

    // booking list
    const [bookings, setBookingList] = useState([])

    function getall_booking(){
        $.ajax({
            url    : utils.URL_BE_BASE + "booking/doctor/all" ,
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            data: {
                id : utils.UID
            },
            crossDomain: true,
            type   : "GET",
            timeout: 10000,
            success: (d)=>{
                console.table(d.data)
                setBookingList(d.data)
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    return(
        <>
            <Helmet><title>SMARTCARE | Booking Management</title></Helmet>
            <div className="p-5 flex flex-col items-center justify-center gap-5 w-full">
                <div className="bg-[#ffffff] shadow-2xl p-5 rounded-lg w-full">
                    <table className="border-collapse overflow-scroll w-full">
                        <thead className="text-[12px] text-[#000000]">
                            <th className="p-2 px-5 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">#</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Title</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Descript</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Patient Info</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Date</th>
                            <th className="py-2 px-5 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Status</th>
                            <th className="py-2 px-5 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Action</th>
                        </thead>
                        <tbody >
                            {
                                bookings.map(d => {
                                    return <tr className="border-2 text-nowrap" key={d.id}>
                                        <td className="font-bold text-center p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.id}</td>
                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.title}</td>
                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.descript}</td>
                                        <td className="font-semibold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{`${d.client.name} - ${d.client.sex ? d.client.sex === 1 ? "Male" : "Female" : "Undefined sex"} - ${d.client.phone} - ${d.client.mail} - ${d.client.address ? d.client.address : "No Address"} - ${d.client.birthdate ? new Date(d.doctor.birthdate).toLocaleDateString() : "No Birthdate"}` }</td>
                                        <td className="font-bold text-center p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{new Date(d.bookingDate).toLocaleString()}</td>
                                        <td className="font-semibold text-center p-2 text-[#000000] text-[11px] overflow-scroll text-wrap">
                                            <Button
                                                disabled={d.status === 3 || d.status === 4 ? true : false}
                                                className="bg-[#000000] p-2 rounded-full text-[#ffffff] text-[11px] font-semibold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                                childs={
                                                    d.status ?
                                                    d.status === 1 ? <TbProgressCheck className="animate-pulse text-lg" title={utils.Booking_status_mapping(d.status)} /> 
                                                    :
                                                    d.status === 2 ? <FiLoader className="text-lg animate-spin" title={utils.Booking_status_mapping(d.status)} />
                                                    :
                                                    d.status === 3 ? <MdOutlineDone className="text-lg" title={utils.Booking_status_mapping(d.status)} /> 
                                                    : null : null
                                                }
                                                click={()=>{}}
                                            />
                                        </td>
                                        <td className="font-bold text-[#000000] text-[11px] overflow-scroll">
                                            <div className="flex justify-center items-center w-full gap-1 p-3">
                                                <Button
                                                    disabled={d.status === 3 ? true : false}
                                                    className="bg-[red] p-2 rounded-full text-[#ffffff] text-[11px] font-semibold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                                    childs={
                                                        <MdDelete className="text-lg"/>
                                                    }
                                                    title="Delete"
                                                    click={()=>delete_booking(d.id)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-end gap-3 w-full" >
                    <Button
                        className="w-full h-12 bg-[black] text-[#ffffff] rounded-lg text-lg font-bold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                        childs="Back"
                        click={()=>{nav("/")}}
                    />
                </div>
            </div>
        </>
    );
}