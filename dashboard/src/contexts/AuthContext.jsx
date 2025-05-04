import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toastError, toastSuccess } from "../lib/Toast.jsx";
import ActionProvider from "./ActionContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogin(values) {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/manager/login`,
        values,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toastSuccess(data.message);
        setIsAuth(true);
        setUser(data.user);
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.error || "Login failed!";
      toastError(msg);
      return false;
    }
  }

  async function getAuth() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/manager/auth`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setIsAuth(true);
        setUser(data.user);
      }
    } catch (error) {
      setIsAuth(false);
      setUser(null);

      if (location.pathname !== "/login") {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }

  async function logOut() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/manager/logout`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toastSuccess(data.message);
        setIsAuth(false);
        setUser(null);

        document.cookie = "manager_token=; Max-Age=0; path=/";
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (location.pathname !== "/login") {
      getAuth();
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  const value = { isAuth, handleLogin, user, logOut, loading };

  return (
    <AuthContext.Provider value={value}>
      <ActionProvider>{!loading ? children : null}</ActionProvider>
    </AuthContext.Provider>
  );
}

export default AuthProvider;
