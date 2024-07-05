import React, { useEffect, useCallback, useState } from "react";
import styles from "./ShoppingCartPage.module.css";
import { useMainContext } from "../../MainContext";

const ShoppingCartPage = () => {
  const {
    showCart,
    setShowCart,
    qty,
    setQty,
    itemQty,
    setItemQty,
    cartItems,
    setCartItems,
    imgData,
    setImgData,
    curQty,
    setCurQty,
  } = useMainContext();
  const [imageLoadingError, setImageLoadingError] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);

  const handleChange = useCallback(
    (e, itemId) => {
      const newValue = Number(e.target.value);
      console.log(curQty);

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
    console.log(cartItems[0]);
    let subTotalCalc =
      cartItems.length > 1
        ? cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
        : cartItems.length === 1
        ? cartItems[0].quantity * cartItems[0].price
        : 0;

    setSubtotal(subTotalCalc);

    setShippingCost(8.0);
  }, [cartItems]);

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
    window.location.href = "/checkout";
  };

  return (
    <div className={styles.main}>
      <div className={`${styles.pageWidth} ${styles.pad}`}>
        <span>
          <a href="/" class="text-interactive" className={styles.link}>
            Home
          </a>
          <span> / </span>
        </span>
        <span>Shopping Cart</span>
      </div>

      <div className={styles.primaryContent}>
        <div className={styles.cartItemsFormWrap}>
          <div className={styles.cartHeader}>
            <h1 className={`${styles.largeReg} ${styles.header}`}>Your Cart</h1>
          </div>
          <div className={styles.headers}>
            <div>
              <a href="/" className={styles.headerLinkContainer}>
                <div className={styles.svgArrow}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18px"
                    height="18px"
                    fill="none"
                  >
                    <path
                      d="M4 12H20M4 12L8 8M4 12L8 16"
                      stroke="#000000"
                      stroke-width="2"
                    />
                  </svg>
                </div>
                <div>Continue Browsing</div>
              </a>
            </div>

            <div>Price</div>
            <div className={styles.headersCol3}>Quantity</div>
            <div className={styles.headersCol4}>Total</div>
          </div>

          {
            <div className={styles.cartContainer}>
              {cartItems !== null && cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className={styles.products}>
                    <div className={styles.productImgContainer}>
                      <div>
                        {item.image !== null ? (
                          <img
                            src={`data:image/jpeg;base64, ${item.image}`}
                            alt="Loading"
                            className={styles.productImg}
                            style={
                              item.image === null ? { display: "none" } : {}
                            }
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

                      <div className={styles.productTitle}>
                        {item.title}
                        {
                          <button
                            className={styles.clearItemButton}
                            onClick={() => clearItem(item.id)}
                          >
                            Remove
                          </button>
                        }
                      </div>
                    </div>

                    <div>{item.price.toFixed(2)}</div>

                    <div className={styles.headersCol3}>
                      <div className={styles.cartItemsQuantity}>
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
                          <label className={styles.visuallyHidden}>
                            Quantity
                          </label>
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
                    </div>

                    <div className={styles.headersCol4}>
                      ${(item.quantity * item.price).toFixed(2)}
                    </div>
                  </div>
                ))
              ) : (
                <div className={`${styles.empty}`}>
                  <p>Your cart is empty.</p>
                </div>
              )}
            </div>
          }
        </div>
        <div className={styles.orderSummaryContainer}>
          <div className={styles.cartSummary}>
            <h2>Summary</h2>
            <div className={styles.summaryRow}>
              Subtotal
              <div>${subtotal.toFixed(2)}</div>
            </div>
            <div className={styles.summaryRow}>
              Estimated Shipping & Handling
              <div>${shippingCost.toFixed(2)}</div>
            </div>
            <div className={styles.summaryRow}>
              Estimated Tax
              <div>—</div>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              Total
              <div>${(subtotal + shippingCost).toFixed(2)}</div>
            </div>
            <div className={styles.checkoutButtonContainer}>
              <button
                className={styles.checkoutButton}
                onClick={checkoutButton}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
