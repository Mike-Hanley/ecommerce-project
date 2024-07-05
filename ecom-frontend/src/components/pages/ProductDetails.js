import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useMainContext } from "../../MainContext";
import styles from "./ProductDetails.module.css";
import api from "../../utils/ApiConstants";
import { encode } from "base64-arraybuffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloseButton } from "@chakra-ui/close-button";
import ShoppingCartButton from "../ShoppingCartButton";
import { v4 as uuidv4 } from "uuid";
import Quanity from "../Quantity";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
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
  const [detailProduct, setDetailProduct] = useState(0);
  const [page, setPage] = useState(
    window.location.pathname.match(/\/(.+?)\/.*$/)[1]
  );

  const dismissAll = () => toast.dismiss();
  const toggleShowCart = () => {
    setShowCart(!showCart);
  };

  const handleChange = (e) => {
    const newValue = Number(e.target.value);

    if (newValue >= 1) {
      setQty(newValue);
    } else {
      setQty(1);
    }
  };

  const increment = () => {
    setQty(qty + 1);
  };

  const decrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const notify = () => {
    const newQty = curQty + qty;

    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
    console.log(storedCartItems);
    /* let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; */

    // Check if the item is already in the cart
    const existingItemIndex = storedCartItems.findIndex(
      (i) => i.id === product.id
    );
    console.log(existingItemIndex);
    if (existingItemIndex === -1) {
      // If the item is not in the cart, add it with the quantity selected
      cartItems.push({ ...product, quantity: newQty });
    } else {
      // If the item is already in the cart, update its quantity
      cartItems[existingItemIndex].quantity += qty;
    }

    // Save updated cartItems array in local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Update the cartItems state with the new array
    setCartItems(cartItems);

    console.log(cartItems);

    const dismiss = () => toast.dismiss(toastId);

    let toastId = toast(
      <div className={styles.toastMiniCart}>
        <div className={styles.topHead}>
          <div className={styles.cartTitleText}>JUST ADDED TO YOUR CART</div>
          <div className={styles.closeIcon}>
            <CloseButton
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                dismiss();
              }}
            />
          </div>
        </div>
        <div className={styles.productImgContainer}>
          <img
            src={`data:image/jpeg;base64, ${imgData}`}
            alt="Loading"
            className={styles.imgCart}
            style={imgData ? {} : { display: "none" }}
          />
          <div className={styles.cartProductText}>{product.title}</div>

          <div>
            QTY:{" "}
            {existingItemIndex === -1
              ? qty
              : cartItems[existingItemIndex].quantity}
          </div>
        </div>

        <div className={styles.cartViewCartButton}>
          <button
            className="viewCartButton"
            onClick={(e) => {
              e.preventDefault();
              toggleShowCart();
              dismissAll();
            }}
          >
            VIEW CART
          </button>
        </div>
        <div>
          <button
            className="continueShoppingButton"
            onClick={(e) => {
              e.preventDefault();
              dismiss();
              dismissAll();
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>,
      {
        closeButton: false,
      }
    );
  };

  function productName(str) {
    const regex = /-[\d-]+$/;
    return str
      .replace(regex, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const regex = /.*-/;
        const parseID = id.replace(regex, "");
        const response = await axios.get(`${api}/api/products/${parseID}`);

        setImgData(response.data.image);

        setImageLoadingError(false);
      } catch (error) {
        console.error(error);
        setImageLoadingError(true);
      }
    };

    fetchData();
  }, [id, setImageLoadingError, imgData, setImgData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const regex = /.*-/;
        const parseID = id.replace(regex, "");
        const res = await axios.get(
          `${api}/api/products/${parseID}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error(`Error fetching product data: ${error}`);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const storedCount = JSON.parse(localStorage.getItem("cartItems"));

    let prodIndex =
      product && storedCount
        ? storedCount.findIndex((obj) => obj.title === product.title)
        : null;

    if (prodIndex !== null && prodIndex !== -1) {
      setCurQty(storedCount[prodIndex].quantity);
    }
  }, [product, setCurQty]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, [setCartItems]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.content}>
      <div className={`${styles.pageWidth} ${styles.pad}`}>
        <span>
          <a href="/" className={styles.link}>
            Home
          </a>
          <span> / </span>
          <a href={`/${page}`} className={styles.link}>
            {page}
          </a>
          <span> / </span>
          <span
            style={{
              fontSize: "18px",
            }}
          >
            {productName(id)}
          </span>
        </span>
      </div>

      <div className={styles.productDetail}>
        <div>
          <ToastContainer autoClose={false} style={{ width: "380px" }} />
        </div>
        <div className={styles.pageWidth}>
          <div
            className={`${styles.grid} ${styles.gridCols1} ${styles.gap3} ${styles.gridCols2}`}
          >
            <div>
              <div
                className={`${styles.productCurImage} ${styles.justifyCenter} ${styles.itemsCenter} ${styles.flex}`}
              >
                {imageLoadingError ? (
                  <img
                    src="https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg"
                    alt="Loading Error"
                    className={styles.img}
                    style={imgData ? { display: "none" } : {}}
                  />
                ) : (
                  <img
                    src="https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp"
                    alt="Loading"
                    className={styles.img}
                    style={imgData ? { display: "none" } : {}}
                  />
                )}
                <img
                  src={`data:image/jpeg;base64, ${imgData}`}
                  alt="Loading"
                  className={styles.img}
                  style={imgData ? {} : { display: "none" }}
                />
              </div>
            </div>

            <div className={styles.productDetailsSide}>
              <div
                className={`${styles.flex} ${styles.flexCol} ${styles.gap1}`}
              >
                <h1 className={styles.productSingleName}>{product.title}</h1>
                <h2 className={styles.productCategoryText}>{page} Shoes</h2>
                <h4>
                  <span>${product.price}</span>
                </h4>

                <div className={styles.shoeSizeTextContainer}>
                  <label className={styles.shoeSizeText}>
                    Select US {page}
                    {page !== "kids" ? "'S" : ""} Size
                  </label>
                  <div className={styles.shoeSize}>
                    <button
                      className={`${styles.buttonLabels} ${styles.buttonSize}`}
                    >
                      <span>6.5</span>
                    </button>
                    <button
                      className={`${styles.buttonLabels} ${styles.buttonSize}`}
                    >
                      <span>7</span>
                    </button>
                    <button
                      className={`${styles.buttonLabels} ${styles.buttonSize}`}
                    >
                      <span>7.5</span>
                    </button>
                    <button
                      className={`${styles.buttonLabels} ${styles.buttonSize}`}
                    >
                      <span>8</span>
                    </button>
                    <button
                      className={`${styles.buttonLabels} ${styles.buttonSize}`}
                    >
                      <span>8.5</span>
                    </button>
                    <button
                      className={`${styles.buttonLabels} ${styles.buttonSize}`}
                    >
                      <span>9</span>
                    </button>
                    <button
                      className={`${styles.buttonLabels} ${styles.buttonSize}`}
                    >
                      <span>9.5</span>
                    </button>
                    <button
                      className={`${styles.buttonLabels} ${styles.buttonSize}`}
                    >
                      <span>10</span>
                    </button>
                    <button
                      className={`${styles.buttonLabels} ${styles.buttonSize}`}
                    >
                      <span>10.5</span>
                    </button>
                    <button
                      className={`${styles.buttonLabels} ${styles.buttonSize}`}
                    >
                      <span>11</span>
                    </button>
                    <button
                      className={`${styles.buttonLabels} ${styles.buttonSize}`}
                    >
                      <span>11.5</span>
                    </button>
                    <button
                      className={`${styles.buttonLabels} ${styles.buttonSize}`}
                    >
                      <span>12</span>
                    </button>
                    <button
                      className={`${styles.buttonLabels} ${styles.buttonSize}`}
                    >
                      <span>12.5</span>
                    </button>
                    <button
                      className={`${styles.buttonLabels} ${styles.buttonSize}`}
                    >
                      <span>13</span>
                    </button>
                    <button
                      className={`${styles.buttonLabels} ${styles.buttonSize}`}
                    >
                      <span>14</span>
                    </button>
                    <button
                      className={`${styles.buttonLabels} ${styles.buttonSize}`}
                    >
                      <span>15</span>
                    </button>
                  </div>
                </div>
                <div className={`${styles.addToCartContainer}`}>
                  <div className={styles.quantityInputContainer}>
                    <div className={styles.inputContainer}>
                      <button
                        className={styles.quantityModifierLeft}
                        onClick={decrement}
                      >
                        &mdash;
                      </button>
                      <input
                        className={styles.quantityInput}
                        type="number"
                        value={qty}
                        onChange={handleChange}
                        min={1}
                        step={1}
                      />
                      <button
                        className={styles.quantityModifierRight}
                        onClick={increment}
                      >
                        &#xff0b;
                      </button>
                      <div></div>
                    </div>
                  </div>
                  <button
                    className={`${styles.addToCartButton}`}
                    onClick={() => {
                      setCurQty(curQty + qty);
                      notify();
                      const storedCartItems =
                        JSON.parse(localStorage.getItem("cartItems")) || [];
                      setCartItems(storedCartItems);
                    }}
                  >
                    <span className={`${styles.addToCartButtonLabel}`}>
                      ADD TO CART
                    </span>
                  </button>
                </div>
              </div>
              <div className={`${styles.productDescriptionText}`}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum feugiat mi eget elit elementum, id pulvinar tellus
                  eleifend.
                </p>
                <p>
                  Integer porttitor elit id euismod elementum. Nulla vel
                  molestie massa, eget iaculis elit. Quisque a tortor vel lectus
                  ultricies pretium quis non purus. Pellentesque molestie leo
                  eget rutrum tristique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
