import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useMainContext } from '../MainContext';
import styles from './ShoppingCart.module.css';
import CloseIcon from '@mui/icons-material/Close';
/* import api from '../../../utilities/ApiConstants'; */



/**
 * Returns the customers shopping cart. If nothing is in the shopping cart,
 * or if not logged in a message appears.
 */
const ShoppingCart = () => {
  const { showCart, setShowCart } = useMainContext();

  const toggleShowCart = () => {
    setShowCart(!showCart);
    console.log(showCart);
  };

  return (
    <>
    <div className={styles.cartHolder}>
      <div className={`${styles.cart} ${showCart ? styles.active : ''}`}>       
        <div className={styles.slideCart}>
          <header>
            <h2>Cart</h2>
          
          <button className={`${styles.closeIcon}`}
          onClick={(e) => {
            e.preventDefault();
            toggleShowCart();
          }}>
            <CloseIcon
          
          />
          </button>
          </header>
         <div className={`${styles.empty}`}>
         <p>Your cart is empty.</p>
         <div className={`${styles.continue}`}>
         <button className={`${styles.button}`}
          onClick={(e) => {
            e.preventDefault();
            toggleShowCart();
          }}>
            CONTINUE SHOPPING
          </button>
         </div>
         </div>
        </div>
      </div>
    </div>
      
    </>
  );
};


export default ShoppingCart;
