import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from './ShoppingCartButton.module.css';
import { useMainContext } from '../MainContext';

/**
 * Displays a Shopping Cart Button that navigates to the shopping Cart
 * Shows number of items in the shopping cart as a notification badge
 */
const ShoppingCartButton = () => {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('token'));
  const [cart, setCart] = useState([]);
  const { showCart, setShowCart } = useMainContext();

  const toggleShowCart = () => {
    setShowCart(!showCart);
    console.log(showCart)
  };

  return (


    
      <div>
<div className={`${styles.cartIcon}`}>
  <ShoppingCartIcon 
        onClick={(e) => {
          e.preventDefault();
          toggleShowCart();
          }}

          
        />
</div>
        
        {/* If cart is empty, do not show cart badge */}

        {cart.length > 0 && loggedIn && <span className={styles.badge}>{cart.length}</span>}

      
   {/*   <button className={styles.cartButton} type="button">
  </button> */}
       
        

        </div>
  );
};

export default ShoppingCartButton;