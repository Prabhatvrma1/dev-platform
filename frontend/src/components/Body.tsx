//import Navbar from "../navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div>
        {/* <Navbar /> */}
        <Outlet />
        
        
        
    </div>
  );
};

export default Body;  