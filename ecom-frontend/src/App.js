import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import RegisterForm from './components/RegisterForm';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Protected from './components/Protected'
import { useMainContext } from './MainContext';
import Navbar from './components/Navbar';
import Home from './components/Home'
import ShoppingCart from './components/ShoppingCart';
import styles from '../src/components/ShoppingCart.module.css'
import MensPage from './components/MensPage';
import ProductDetails from './components/pages/ProductDetails'



function App() {
  const { isSignedIn, signin, signout, username, showCart, setShowCart } = useMainContext();

  // Check authentication status on component mount
 // useEffect(() => {
    // You may have an asynchronous authentication check here
    // For example, calling an authentication API
    // For simplicity, assuming it's synchronous for now
 //   setLoading(false);
 // }, []);

  // If still loading, display a loading indicator
//  if (loading) {
//    return <div>Loading...</div>;
 // }


  return (
    <Router>
      <div className={`${styles.app}`}>
      <div className={`${showCart ? styles.overlayOpen : ''}`}></div>
        <Navbar />
      
        
        {isSignedIn ? (
          <h2 style={{textAlign:'center'}}>Welcome to Dune, {username}!</h2>
        )
        : (
          <></>
        )
        }
        
          <ShoppingCart/>
        
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/men" element={<MensPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          {isSignedIn && (
          <Route
            path="/dashboard"
            element={
              <Protected isSignedIn={isSignedIn}>
                <Dashboard />
              </Protected>
            }
          />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      
      </div>
    </Router>
  );
}

export default App;
