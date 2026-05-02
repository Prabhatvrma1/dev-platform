import Navbar from "./navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
import Footer from "./Footer";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    
    <Provider store={appStore}>
        <BrowserRouter basename="/">
        <Navbar />

        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            
          </Route>
        </Routes>


        <Footer/>
      </BrowserRouter>
    </Provider>

  )
}

export default App