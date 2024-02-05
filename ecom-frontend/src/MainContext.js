import { createContext, useContext, useState, useEffect } from 'react';

const MainContext = createContext();

export const useMainContext = () => {
  return useContext(MainContext);
};

export const MainContextProvider = ({ children }) => {
    const initialIsSignedIn = !!localStorage.getItem('token');
   //const usernameSignedIn = !!localStorage.getItem('username');
    const [isSignedIn, setIsSignedIn] = useState(initialIsSignedIn);
    const [username, setUsername] = useState('');
    const [showCart, setShowCart] = useState(false);
    const [loading, setLoading] = useState(true);
    

  const signin = (responseUsername) => {
    setIsSignedIn(true);
    console.log(isSignedIn);
    console.log(responseUsername);
    setUsername(responseUsername);
    localStorage.setItem('username', responseUsername);
  };

  const signout = () => {
    
    setIsSignedIn(false);
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  // Check if the token exists in local storage and update the isSignedIn state
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token) {
      setIsSignedIn(true);
      setUsername(storedUsername);
    } else {
      setIsSignedIn(false);
      setUsername('');
    }

    // Set loading state to false after initial check
    setLoading(false);

  }, []);

  const value = {
    isSignedIn,
    signin,
    signout,
    username,
    showCart,
    setShowCart,
    loading, 
    setLoading
  };



  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

