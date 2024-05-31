import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Admin from "./pages/admin/Admin";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "./pages/404/NotFound";
import Profile from "./pages/profile/Profile";


axios.defaults.withCredentials = true;


const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <>
      <ToastContainer />
      <Header />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />

        <Route
          path="/admin/*"
          element={
            <AdminOnlyRoute>
              <Admin />
            </AdminOnlyRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
