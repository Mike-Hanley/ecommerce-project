import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMainContext } from "../MainContext";
import styles from "./ShoppingCart.module.css";
import CloseIcon from "@mui/icons-material/Close";
import api from "../utils/ApiConstants";

/**
 * Returns the customers shopping cart. If nothing is in the shopping cart,
 * or if not logged in a message appears.
 */
const ShoppingCart = () => {
  const {
    showCart,
    setShowCart,
    setQty,
    cartItems,
    setCartItems,
    curQty,
    setCurQty,
    imgData,
  } = useMainContext();

  const toggleShowCart = () => {
    setShowCart(!showCart);
  };

  // Clear cart
  function clearItem(id) {
    localStorage.removeItem(id);
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "{}");
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
    setCurQty(0);
  }

  const checkoutButton = () => {
    // Redirect to the ShoppingCartPage
    window.location.href = "/cart";
  };

  // Clear cart
  const clearCart = useCallback(() => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
    setCurQty(0);
  }, [setCartItems, setCurQty]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, [setCartItems]);

  const handleChange = useCallback(
    (e, itemId) => {
      const newValue = Number(e.target.value);

      if (newValue >= 1) {
        setQty(curQty + newValue);
        setCartItems(
          cartItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newValue } : item
          )
        );
      } else {
        setQty(1);
      }
    },
    [cartItems, setCartItems, setQty, curQty]
  );

  const increment = useCallback(
    (itemId) => {
      setCartItems(
        cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    },
    [cartItems, setCartItems]
  );

  const decrement = useCallback(
    (itemId) => {
      if (cartItems.find((item) => item.id === itemId).quantity > 1) {
        setCartItems(
          cartItems.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      }
    },
    [cartItems, setCartItems]
  );

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, [setCartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      <div className={styles.cartHolder}>
        <div className={`${styles.cart} ${showCart ? styles.active : ""}`}>
          <div className={styles.slideCart}>
            <header>
              <div className={styles.topLevel}>
                <h2>Cart</h2>

                <button
                  className={`${styles.closeIcon}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleShowCart();
                    const storedCartItems =
                      JSON.parse(localStorage.getItem("cartItems")) || [];
                    console.log(storedCartItems);
                    setCartItems(storedCartItems);
                  }}
                >
                  <CloseIcon />
                </button>
              </div>
              <div className={styles.checkoutButtonContainer}>
                <button
                  className={styles.checkoutButton}
                  onClick={checkoutButton}
                >
                  View Cart & Checkout
                </button>
                <button className={styles.clearCartButton} onClick={clearCart}>
                  clear cart
                </button>
              </div>
            </header>

            {cartItems !== null ? (
              cartItems.map((item) => (
                <div key={item.id} className={styles.productContainer}>
                  <div className={styles.productImgContainer}>
                    {item.image !== null ? (
                      <img
                        src={`data:image/jpeg;base64, ${item.image}`}
                        alt="Loading"
                        className={styles.productImg}
                        style={item.image === null ? { display: "none" } : {}}
                      />
                    ) : (
                      <img
                        src="https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp"
                        alt="Loading"
                        className={styles.img}
                        style={imgData ? { display: "none" } : {}}
                      />
                    )}
                  </div>

                  <div className={styles.productTitleContainer}>
                    <div className={styles.productTitle}>{item.title} </div>
                    <div> ${item.price} </div>
                    <div
                      className={styles.quantityWrapper}
                      data-quantity-selector=""
                    >
                      <button
                        className={`${styles.quantityButton} ${styles.minus}`}
                        data-decrease-quantity=""
                        type="button"
                        onClick={() => decrement(item.id)}
                      >
                        −
                      </button>
                      <label className={styles.visuallyHidden}>Quantity</label>
                      <input
                        className={styles.quantityInput}
                        type="number"
                        onChange={(e) => handleChange(e, item.id)}
                        id={item.id}
                        value={item.quantity}
                        min={1}
                        step={1}
                      />
                      <button
                        className={`${styles.quantityButton} ${styles.plus}`}
                        data-increase-quantity=""
                        type="button"
                        onClick={() => increment(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className={styles.removeProductContainer}>
                    <button
                      className={styles.removeProductButton}
                      onClick={() => clearItem(item.id)}
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        role="presentation"
                        class="icon icon-bin"
                        viewBox="0 0 16 14"
                      >
                        <path d="M10 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2h9zM9 3H2v9a1 1 0 0 0 .883.993L3 13h5a1 1 0 0 0 .993-.883L9 12V3z"></path>
                        <path d="M10.5 2a.5.5 0 1 1 0 1H.5a.5.5 0 0 1 0-1h10zm-3-2a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1h4z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={`${styles.empty}`}>
                <p>Your cart is empty.</p>{" "}
              </div>
            )}

            <div className={`${styles.continue}`}>
              <button
                className={`${styles.button}`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleShowCart();
                  const storedCartItems =
                    JSON.parse(localStorage.getItem("cartItems")) || [];
                  setCartItems(storedCartItems);
                }}
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
