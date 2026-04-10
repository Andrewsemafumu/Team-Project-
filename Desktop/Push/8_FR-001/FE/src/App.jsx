import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Home from "./features/home/Home";
import Booking_manager from "./features/booking/manager/Booking_manager";
import Booking_doctor from "./features/booking/doctor/Booking_doctor";
import Booking_client from "./features/booking/client/Booking_client";
import Account from "./features/account/Account";
import ChangePass from "./features/account/Changepass";
import User_manager from "./features/user_manager/User_manager";
import Specialty_manager from "./features/specialty_manager/Specialty_manager";

function App() {

  return (
    <>
      {/* Splash screen */}
      <BrowserRouter>
        <Routes>

          {/* Router home page */}
          <Route path="/" element={<Home/>}/>
          {/* Router account layout */}
          <Route path="/account" element={<Account/>}/>
          {/* Router user manager layout */}
          <Route path="/user" element={<User_manager/>}/>
          {/* Router specialty manager layout */}
          <Route path="/specialty" element={<Specialty_manager/>}/>
          {/* Router change password layout */}
          <Route path="/changepass" element={<ChangePass/>}/>
          {/* Router manage booking page by manager */}
          <Route path="/manager/booking" element={<Booking_manager/>}/>
          {/* Router manage booking page by doctor*/}
          <Route path="/doctor/booking" element={<Booking_doctor/>}/>
          {/* Router booking page for client*/}
          <Route path="/client/booking" element={<Booking_client/>}/>
          {/* Router auth layout */}
          <Route path="/auth/login" element={<Login/>}/>
          {/* Router register page */}
          <Route path="/auth/register" element={<Register/>}/>
          {/* Unknown path will be route back to home page */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
