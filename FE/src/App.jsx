import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Home from "./features/home/Home";

function App() {

  return (
    <>
      {/* Splash screen */}
      <BrowserRouter>
        <Routes>

          {/* Router home page */}
          <Route path="/" element={<Home/>}/>
          {/* Unknown path will be route back to home page */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
