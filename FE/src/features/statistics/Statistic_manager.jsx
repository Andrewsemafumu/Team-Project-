import { useEffect, useState } from "react";
import $ from 'jquery';
import { Bar, Pie } from 'react-chartjs-2';
import utils from "../../utils/utils";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Button from "../../components/Button";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Statistic_manager(){
    const nav = useNavigate();

    const [account_summary, setAccountSummary] = useState({
        data: {
            labels: ["Doctor", "Patient", "Receptionist"],
            datasets: [
                {
                    label: 'Account Summary',
                    data: [],
                    borderColor:'white',
                    backgroundColor: ["grey", "#FF4136", "#2ECC40"]
                }
            ]  
        },
        option: {

        }
    })

    const [today_patient_booking_chart, setTodayPatientBookingChart] = useState({
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Today Patient Booked',
                    data: [],
                    borderColor:'white',
                    tension: 0.4,
                    backgroundColor: ["grey"]
                }
            ]  
        },
        option: {

        }
    })

    const [today_doctor_booking_chart, setTodayDoctorBookingChart] = useState({
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Today Doctor Booked',
                    data: [],
                    borderColor:'white',
                    tension: 0.4,
                    backgroundColor: ["grey"]
                }
            ]  
        },
        option: {

        }
    })

    const [date_booking_chart, setDateBookingChart] = useState({
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Date Booked',
                    data: [],
                    borderColor:'white',
                    tension: 0.4,
                    backgroundColor: ["grey"]
                }
            ]  
        },
        option: {

        }
    })

    const [doctor_booking_chart, setDoctorBookingChart] = useState({
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Doctor Booked',
                    data: [],
                    borderColor:'white',
                    tension: 0.4,
                    backgroundColor: ["grey"]
                }
            ]  
        },
        option: {

        }
    })

    const [patient_booking_chart, setPatientBookingChart] = useState({
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Patient Booked',
                    data: [],
                    borderColor:'white',
                    tension: 0.4,
                    backgroundColor: ["grey"]
                }
            ]  
        },
        option: {
        }
    })

    function get_statistic(){
        $.ajax({
            url    : utils.URL_BE_BASE + "booking/statistics",
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "GET",
            timeout: 10000,
            success: (d)=>{
                const doctor_labels = [];
                const doctor_data = [];
                for(var docBook of d.statistic_doctor){
                    doctor_labels.push(`${docBook.name} ${docBook.specialty ? `(${docBook.specialty})` : ""} ${docBook._count.id} booking`)
                    doctor_data.push(docBook._count.id);
                }
                setDoctorBookingChart({
                    data: {
                        labels: doctor_labels,
                        datasets: [
                            {
                                label: 'Doctor Booked',
                                data: doctor_data,
                                borderColor:'white',
                                tension: 0.4,
                                backgroundColor: ["grey"]
                            }
                        ]  
                    },
                    option: {

                    }
                })

                const patient_labels = [];
                const patient_data = [];
                for(var patientBook of d.statistic_patient){
                    patient_labels.push(`${patientBook.name} (${patientBook._count.id} booking)`)
                    patient_data.push(patientBook._count.id);
                }
                setPatientBookingChart({
                    data: {
                        labels: patient_labels,
                        datasets: [
                            {
                                label: 'Patient Booked',
                                data: patient_data,
                                borderColor:'white',
                                tension: 0.4,
                                backgroundColor: ["grey"]
                            }
                        ]  
                    },
                    option: {
                    }
                })

                const date_labels = [];
                const date_data = [];
                for(var dateBook of d.statistic_date){
                    date_labels.push(`${dateBook.booking_date.split("T")[0]} (${dateBook.total} booking)`)
                    date_data.push(dateBook.total);
                }
                setDateBookingChart({
                    data: {
                        labels: date_labels,
                        datasets: [
                            {
                                label: 'Date Booked',
                                data: date_data,
                                borderColor:'white',
                                tension: 0.4,
                                backgroundColor: ["grey"]
                            }
                        ]  
                    },
                    option: {
                    }
                })

                const today_doctor_labels = [];
                const today_doctor_data = [];
                for(var today_docBook of d.statistic_doctor_today){
                    today_doctor_labels.push(`${today_docBook.name} ${today_docBook.specialty ? `(${today_docBook.specialty})` : ""} ${today_docBook._count.id} booking`)
                    today_doctor_data.push(today_docBook._count.id);
                }
                setTodayDoctorBookingChart({
                    data: {
                        labels: today_doctor_labels,
                        datasets: [
                            {
                                label: 'Today Doctor Booked',
                                data: today_doctor_data,
                                borderColor:'white',
                                tension: 0.4,
                                backgroundColor: ["grey"]
                            }
                        ]  
                    },
                    option: {

                    }
                })

                const today_patient_labels = [];
                const today_patient_data = [];
                for(var today_patientBook of d.statistic_patient_today){
                    today_patient_labels.push(`${today_patientBook.name} (${today_patientBook._count.id} booking)`)
                    today_patient_data.push(today_patientBook._count.id);
                }
                setTodayPatientBookingChart({
                    data: {
                        labels: today_patient_labels,
                        datasets: [
                            {
                                label: 'Today Patient Booked',
                                data: today_patient_data,
                                borderColor:'white',
                                tension: 0.4,
                                backgroundColor: ["grey"]
                            }
                        ]  
                    },
                    option: {

                    }
                })

                setAccountSummary({
                    data: {
                        labels: ["Doctor", "Patient", "Receptionist"],
                        datasets: [
                            {
                                label: 'Account Summary',
                                data: [d.user.doctor, d.user.patient, d.user.reception],
                                borderColor:'white',
                                backgroundColor: ["#0074D9", "#FF4136", "#2ECC40"]
                            }
                        ]  
                    },
                    option: {

                    }
                })
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    useEffect(()=>{
        get_statistic();
    },[])

    return(
        <>
            <Helmet><title>SMARTCARE | Statistic</title></Helmet>
            <div className="w-full flex gap-2 p-20 flex-wrap">
                <h1 className="text-[#000000] font-bold text-2xl pb-10">Statistic Dashboard</h1>
                <div className="bg-[#ffffff] shadow-2xl p-20 rounded-lg w-full">
                    <h1 className="text-[#000000] text-lg pb-3">Today Doctor Booking Sumary</h1>
                    <Bar data={today_doctor_booking_chart.data} options={today_doctor_booking_chart.option} />
                </div>
                <div className="bg-[#ffffff] shadow-2xl p-20 rounded-lg w-full">
                    <h1 className="text-[#000000] text-lg pb-3">Today Patient Booking Sumary</h1>
                    <Bar data={today_patient_booking_chart.data} options={today_patient_booking_chart.option} />
                </div>
                <div className="bg-[#ffffff] shadow-2xl p-20 rounded-lg w-full">
                    <h1 className="text-[#000000] text-lg pb-3">Doctor In Booking Sumary</h1>
                    <Bar data={doctor_booking_chart.data} options={doctor_booking_chart.option} />
                </div>

                <div className="bg-[#ffffff] shadow-2xl p-20 rounded-lg w-full">
                    <h1 className="text-[#000000] text-lg pb-3">User Sumary</h1>
                    <Pie data={account_summary.data} options={account_summary.option} />
                </div>

                <div className="bg-[#ffffff] shadow-2xl p-20 rounded-lg w-full">
                    <h1 className="text-[#000000] text-lg pb-3">Patient Booking Sumary</h1>
                    <Bar data={patient_booking_chart.data} options={patient_booking_chart.option} />
                </div>
                <div className="bg-[#ffffff] shadow-2xl p-20 rounded-lg w-full">
                    <h1 className="text-[#000000] text-lg pb-3">Booking Date Sumary</h1>
                    <Bar data={date_booking_chart.data} options={date_booking_chart.option} />
                </div>
                <div className="flex items-center justify-end gap-3 w-full">
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