import Navbar from "./navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
  <>
    <BrowserRouter basename="/">
    <Routes>
      <Route path = "/" element= {<div>Base page</div>} />
      <Route path = "/login" element= {<div>login page</div>} />
      <Route path = "/logout" element= {<div>logout page</div>} />

    </Routes>
    </BrowserRouter>


    <Navbar />    

    

  </> 
  )
}

export default App
