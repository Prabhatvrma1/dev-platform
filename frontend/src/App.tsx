import Navbar from "./components/navbar";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useAppDispatch } from "./hooks";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";

function AppContent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchuser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchuser();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;