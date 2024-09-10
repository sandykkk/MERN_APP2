import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState( localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services,setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const API = import.meta.env.VITE_APP_URI_API;


  const autherizationToken = `Bearer ${token}`;

  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  //   this is the get the value in either true or false in the original state of token
  let isLoggedIn = !!token;
  console.log("token", token);
  console.log("isLoggedin ", isLoggedIn);

  //   to check whether is loggedIn or not
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };
  // JWT AUTHENTICATION- to get currently data
 const userAuthentication = async()=>{
  try {
    setIsLoading(true);
   const response = await fetch(`${API}/api/auth/user`,{
     method: "GET",
     headers:{
       Authorization : autherizationToken
     }
   });
   if(response.ok){
     const data = await response.json();
     console.log('user data',data.userData)
     setUser(data.userData);
     setIsLoading(false);

   }
   
  } catch (error) {
   console.log(error);
  }
}
const getServiceData = async () => {
  try {
    const response = await fetch(`${API}/api/data/service`, {
      method: "GET",
    });
    if (response.ok) {
      const Data = await response.json();
      setServices(Data.msg);
      console.log("services",Data.msg);
    } else {
      console.log("Error: ", response);
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getServiceData();
  userAuthentication();
}, []);


  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser,user,services, autherizationToken,isLoading,API }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};