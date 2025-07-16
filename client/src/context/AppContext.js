import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const AppContext = createContext();

// Always send cookies (token) with requests
axios.defaults.withCredentials = true;

export const AppContextProvider = (props) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ loading state added

  const checkAuth = async () => {
    setLoading(true); // ✅ start loading
    try {
      const res = await axios.post(backendUrl + '/api/admin/auth-check');

      if (res.data.success) {
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
        if (res.data.message !== "Not Authorized. Try again") {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      setIsLoggedin(false);
      toast.error(error.message);
    } finally {
      setLoading(false); // ✅ done loading
    }
  };

  useEffect(() => {
    checkAuth(); // ✅ check auth on load
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    loading // ✅ expose loading
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
