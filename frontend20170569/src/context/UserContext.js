import React, {createContext, useEffect, useState} from "react";

export const UserContext = createContext({
    user: null,
    setUser: () => {},
});

export const UserProvider= (props)=>{
    // const [user,setUser] = useState({})
    // useEffect(()=>{
    //   const existingUser=JSON.parse(localStorage.getItem("user"))
    //   setUser(existingUser)
    // },[])

    // const existingUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    // const existingRole = JSON.parse(localStorage.getItem("role"));
    // const [role, setRole] = useState(JSON.parse(localStorage.getItem("role")) || {});
    // const existingDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    // const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || prefersDarkMode);
    // const setUserAndRole = (user,role) => {
    //   localStorage.setItem("user", JSON.stringify(user));
    //   localStorage.setItem("role", JSON.stringify(role));
    //   setUser(user);
    //   setRole(role)
    // }
    const setUserAndLocal = (user) => {
      console.log(user)
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    }
    // const setRoleAndLocal = (role) => {
    //   localStorage.setItem("role", JSON.stringify(role));
    //   setRole(role)
    // }
    // const toggleDarkMode = () => {
    //   localStorage.setItem("darkMode", !darkMode);
    //   setDarkMode(darkMode => !darkMode)
    // }
  
    return(
      <UserContext.Provider value={{user,setUser:setUserAndLocal}}>
        {
          props.children
        }
      </UserContext.Provider>
    )
  
  }