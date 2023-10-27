import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [userData, setUserData] = useState(null);

  const [allLists, setAllLists] = useState([]);
  const [reloadAllTasks, setReloadAllTasks] = useState(false);

  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const navigate = useNavigate();

  const logoutHandler = () => {
    Cookies.remove("user");
    setIsLoggedOut(true);
  };

  const notifyToast = (message, alert) => {
    if (alert === "success") {
      return toast.success(message, {
        position: "bottom-right",
        style: {
          background: "rgba(0, 0, 0, 0.8)", // Slightly transparent black
          padding: "12px",
          borderRadius: "4px",
          color: "white",
        },
        iconTheme: {
          primary: "green", // White checkmark
          secondary: "white", // Green background
        },
      });
    } else {
      return toast.error(message, {
        position: "bottom-right",
        style: {
          background: "rgba(0, 0, 0, 0.8)", // Slightly transparent black
          padding: "12px",
          borderRadius: "4px",
          color: "white",
        },
        iconTheme: {
          primary: "red", // White checkmark
          secondary: "white", // Green background
        },
      });
    }
  };

  const getProfileUser = async () => {
    const userData = Cookies.get("user");

    if (userData) {
      setUserData(JSON.parse(userData));
      setIsLoggedOut(false);
    } else {
      setUserData(null);
      navigate("/login");
    }
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkTheme((prev) => !prev);
  };

  useEffect(() => {
    if (isLoggedOut) {
      getProfileUser();
    }
  }, [isLoggedOut]);

  return (
    <AppContext.Provider
      value={{
        isDarkTheme,
        setIsDarkTheme,
        toggleTheme,
        userData,
        getProfileUser,
        notifyToast,
        setUserData,
        allLists,
        setAllLists,
        logoutHandler,
        reloadAllTasks,
        setReloadAllTasks,
      }}
    >
      {children}
      <Toaster />
    </AppContext.Provider>
  );
};
