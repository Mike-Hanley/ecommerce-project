import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

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
    const [item, setItem] = useState(null);
    const [products, setProducts] = useState([]);
    const [qty, setQty] = useState(1);
    const [itemQty, setItemQty] = useState(0);
    const [checkedItems, setCheckedItems] = useState([]);
    const [curQty, setCurQty] = useState(0);
    const [cartItems, setCartItems] = useState(
      JSON.parse(localStorage.getItem('cartItems')) || []);
    const [imgData, setImgData] = useState();

    const memoizedCartItems = useMemo(() => cartItems, [cartItems]); 

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
    setLoading,
    item,
    setItem,
    products,
    setProducts,
    qty,
    setQty,
    itemQty,
    setItemQty,
    cartItems,
    setCartItems,
    imgData, 
    setImgData,
    checkedItems,
    setCheckedItems,
    curQty,
    setCurQty
  };



  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

