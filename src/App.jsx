import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setloading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className=" min-h-screen flex flex-wrap content-between bg-slate-800">
          <dir className = "w-full block text-white text-center">
            <Header />
            <main>
              {/* <Outlet /> */}
            </main>
            <Footer />
          </dir>
        </div>
      </>
    );
  }
}
export default App;
