import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { toastSuccess, toastError } from "../lib/Toast";
import { useNavigate } from "react-router-dom";
import { mergeFavorites } from "../services/favoriteService";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getAuth = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/users/auth", {
        withCredentials: true,
      });
      if (data.success) {
        setIsAuth(true);
        setUser(data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setIsAuth(false);
        setUser(null);
      } else {
        console.error("❌ Error in getAuth:", error);
      }
    }
  }, []);

  const mergeFavoritesAfterLogin = useCallback(async () => {
    const localFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (localFavorites.length > 0) {
      try {
        const data = await mergeFavorites(
          localFavorites.map((item) => item._id)
        );
        if (data.success) {
          await getAuth();
          localStorage.removeItem("favorites");
        }
      } catch (error) {
        console.error("❌ Error merging favorites after login:", error);
      }
    }
  }, [getAuth]);

  const handleLogin = useCallback(
    async (values) => {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/users/login",
          values,
          { withCredentials: true }
        );
        if (data.success) {
          toastSuccess(data.message);
          await new Promise((resolve) => setTimeout(resolve, 100));
          await getAuth();
          await mergeFavoritesAfterLogin();
          return { success: true };
        }
      } catch (error) {
        console.error("❌ Error in handleLogin:", error);
        const msg = error.response?.data?.error || "Login failed";
        toastError(msg);
        return { success: false, message: msg };
      }
    },
    [getAuth, mergeFavoritesAfterLogin]
  );

  const logOut = useCallback(async () => {
    try {
      await axios.get("http://localhost:3000/users/logout", {
        withCredentials: true,
      });
      setIsAuth(false);
      setUser(null);
      toastSuccess("Logout successful");
      navigate("/");
    } catch (error) {
      console.error("❌ Error in logOut:", error);
    }
  }, [navigate]);

  useEffect(() => {
    getAuth();
  }, [getAuth]);

  const value = {
    isAuth,
    user,
    setUser,
    handleLogin,
    logOut,
    getAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
