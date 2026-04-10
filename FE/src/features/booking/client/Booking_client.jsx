import { useEffect, useRef, useState } from "react";
import InputText from "../../../components/InputText";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { Helmet } from "react-helmet";
import utils from "../../../utils/utils";
import InputSelect from "../../../components/InputSelect";
import InputDateTime from "../../../components/InputDate";
import $ from "jquery";
import { TbProgressCheck } from "react-icons/tb";
import { FiLoader } from "react-icons/fi";
import { MdEdit, MdOutlineDone } from "react-icons/md";

export default function Booking_client(){

    useEffect(()=>{
        isLogin();
    }, [])

    const [bookingID, setBookingID] = useState(null);

    const nav = useNavigate();
    
    // check login funciton
    const isLogin = function(){
        if(!utils.UID){
            utils.ClearLocal();
            nav("/auth/login");
        }else{
            if(utils.UROLE !== "CLIENT" && utils.UROLE !== "ADMIN"){
                alert("You don't have any permission on this page!")
                nav("/")
            }
            getall_doctor();
            getall_booking();
            setTimeList(utils.booking_time_json_array())
        }
    }

    // time list
    const [time, setTimeList] = useState([])

    // booking list
    const [bookings, setBookingList] = useState([])

    // doctor list
    const [doctors, setDoctorList] = useState([])
    
    // booking
    const [booking, setBooking] = useState({
        title: "Booking",
        descript: "",
        date: null,
        time: null,
        clientID : null,
        status : null,
        doctorID : null
    });

    const change = function(e){
        if(e.target.name === "time"){
            setBooking({
                ...booking,
                [e.target.name] : utils.Booking_id_to_time(e.target.value*1) ? utils.Booking_id_to_time(e.target.value*1) : null
            });
        }else if(e.target.name === "doctorID"){
            setBooking({
                ...booking,
                ["date"] : null,
                ["time"] : null,
                [e.target.name] : e.target.value ? e.target.value : null
            });
        }else if(e.target.name === "date"){
            setBooking({
                ...booking,
                ["time"] : null,
                [e.target.name] : e.target.value ? e.target.value : null
            });
        }else{
            setBooking({
                ...booking,
                [e.target.name] : e.target.value ? e.target.value : null
            });
        }
       
    }

    function getall_doctor(){
        $.ajax({
            url    : utils.URL_BE_BASE + "user/all" ,
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "GET",
            data   : {
                search:"",
                role: JSON.stringify([2]),
            },
            timeout: 10000,
            success: (d)=>{
                console.table(d.data)
                setDoctorList(d.data)
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    function create(){
        if(utils.UROLE === "CLIENT"){
            booking.clientID = utils.UID
        }

        if(booking.date){
            if(booking.time){
                booking.datetime = new Date(`${booking.date}T${booking.time}`).toISOString();
            }else{
                alert("Please choose booking time!");
                return;
            }
        }else{
            alert("Please choose booking date!");
            return;
        }

        if(!booking.title || booking.title === "" || booking.title === null){
            alert("Please enter booking title!");
            return;
        }

        if(!booking.clientID || booking.clientID === ""){
            alert("Please choose patient!");
            return;
        }

        if(!booking.doctorID || booking.doctorID === ""){
            alert("Please choose doctor!");
            return;
        }

        $.ajax({
            url    : utils.URL_BE_BASE + "booking" ,
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "POST",
            data   : {
                ...booking
            },
            timeout: 10000,
            success: (d)=>{
                alert(d.message);
                getall_booking();
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    function getall_booking(){
        $.ajax({
            url    : utils.URL_BE_BASE + "booking/patient/all" ,
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

    function cancel_update(){
        setBookingID(null);
        setBooking({
            title: "",
            descript: "",
            date: null,
            time: null,
            clientID : "",
            status : "",
            doctorID : ""
        })
    }

    function get_booking(id){
        $.ajax({
            url    : utils.URL_BE_BASE + "booking" ,
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "GET",
            data: {
                id: id
            },
            timeout: 10000,
            success: (d)=>{
                const bookDate = new Date(d.data.bookingDate);
                const date = `${bookDate.getUTCFullYear()}-${String(bookDate.getUTCMonth()+1).padStart(2,'0')}-${String(bookDate.getUTCDate()).padStart(2,'0')}`;
                const time = `${String(bookDate.getHours()).padStart(2,'0')}:${String(bookDate.getMinutes()).padStart(2,'0')}`;
                setBooking({
                    title: d.data.title,
                    descript: d.data.descript,
                    date: date,
                    time: time,
                    clientID : d.data.clientID,
                    status : d.data.status,
                    doctorID : d.data.doctorID
                });
                init_timelist_for_update_booking(date, d.data.doctorID, time)
                setBookingID(id);
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
                    <table className="border-collapse w-full">
                        <thead className="text-[12px] text-[#000000]">
                            <th className="p-2 px-5 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">#</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Title</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Descript</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Doctor Info</th>
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
                                        <td className="font-semibold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{`${d.doctor.name} ${d.doctor.specialty ? `(${d.doctor.specialty.name})` : ""} - ${d.doctor.phone} - ${d.doctor.mail} - ${d.doctor.address ? d.doctor.address : "No Address"} - ${d.doctor.birthdate ? new Date(d.doctor.birthdate).toLocaleDateString() : "No Birthdate"}`}</td>
                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{new Date(d.bookingDate).toLocaleString()}</td>
                                        <td className="pt-2 font-semibold text-center p-2 flex justify-center items-center text-[#000000]  text-[11px] overflow-scroll text-wrap">
                                            {
                                                d.status ?
                                                d.status === 1 ? <TbProgressCheck className="animate-pulse text-xl" title={utils.Booking_status_mapping(d.status)} /> 
                                                :
                                                d.status === 2 ? <FiLoader className="text-xl animate-spin" title={utils.Booking_status_mapping(d.status)} />
                                                :
                                                d.status === 3 ? <MdOutlineDone className="text-xl" title={utils.Booking_status_mapping(d.status)} /> 
                                                : null : null
                                            }
                                        </td>
                                        <td className="p-2 text-center font-bold text-[#000000] text-[11px] overflow-scroll">
                                            <div className="flex justify-center items-center w-full gap-1">
                                                <Button
                                                    disabled={d.status === 3 ? true : false}
                                                    className="bg-[#464646] p-1 rounded-full text-[#ffffff] text-[11px] font-semibold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                                    childs={
                                                        <MdEdit/>
                                                    }
                                                    click={()=>get_booking(d.id)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="bg-[#ffffff] shadow-2xl p-5 rounded-lg w-full">
                    <h1 className="text-[#000000] text-lg pb-3"><i>Booking information</i></h1>
                    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-start gap-5 pb-5">
                        <InputText onChange={(e)=>{change(e)}} value={booking.title} inputName="title" InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] " LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label="Title" />
                    </div>
                    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-start gap-5 pb-5">
                        <InputText onChange={(e)=>{change(e)}} value={booking.descript} inputName="descript" InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] " LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label="Descript" />
                    </div>
                    <div className="flex justify-center items-stretch gap-5 w-full pb-5">
                        <InputSelect value={booking.doctorID ? booking.doctorID : null} onChange={(e)=>{change(e)}} inputName="doctorID" InputclassName="h-full py-5 text-sm bg-[#e9e9e9] px-3 py-5 text-[black] border-none focus:border-[#00000082]" 
                            options={
                                doctors.length > 0
                                ? [
                                    { name: "Doctor", id: "" },
                                    ...doctors.map(d => ({
                                        name: `${d.name} ${d.specialty ? `(${d.specialty.name})` : ""}`,
                                        id: d.id
                                    }))
                                ]
                                : [
                                    { name: "Doctor", id: "" }
                                ]
                            }
                        />
                        <InputDateTime onChange={(e)=>change(e)} value={booking.date} inputName="date" InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] h-full text-sm" LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label="From" />
                        <InputSelect value={ booking.time ? utils.Booking_time_to_id(booking.time) : null} onChange={(e)=>{change(e)}} inputName="time" InputclassName="h-full text-sm text-lg bg-[#e9e9e9] px-3 py-5 text-[black] border-none focus:border-[#00000082]" 
                            options = {
                                time.length > 0
                                    ? [
                                        { name: "Pick a time", id: "" },
                                        ...time.map(d => ({
                                            name: d.value,
                                            id: d.id
                                        }))
                                    ]
                                    : [
                                        { name: `${booking.doctorID ? "Doctor's schedule full!" : "Choose doctor and date!"}`, id: "" }
                                    ]
                            }
                        />
                    </div>
                    
                </div>

                <div className="flex items-center justify-end gap-3 w-full">
                    {
                        bookingID 
                        ?
                        <>
                            <Button
                                className="w-full h-12 bg-[black] text-[#ffffff] rounded-lg text-lg font-bold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                childs={"Cancel"}
                                click={()=>{cancel_update()}}
                            />
                        </>
                        :
                        <Button
                            className="w-full h-12 bg-[black] text-[#ffffff] rounded-lg text-lg font-bold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                            childs={"Book"}
                            click={()=>create()}
                        />
                    }
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