import Navbar from "./components/navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
function App() {
  return (
    
    <Provider store={appStore}>
        <BrowserRouter basename="/">
        <Navbar />

        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
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