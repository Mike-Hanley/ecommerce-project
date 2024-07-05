import { React, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../utils/ApiConstants";
import { logout } from "../utils/auth";
import { useMainContext } from "../MainContext";
import styles from "./Home.module.css";
import banner from "../utils/image3.png";
import kids from "../utils/kids.png";
import womens from "../utils/womens.png";
import mens from "../utils/mens.png";
import ProductCard from "../components/productCard/ProductCard";


const Home = () => {
  const navigate = useNavigate();
  const { isSignedIn, signin, signout, username, item, setItem } =
    useMainContext();
  const [updatedProductList, setUpdatedProductList] = useState([]);

  /**
   * finds specific product information by id
   * @param {int} id id of product
   */
  const findProduct = useCallback(
    (id) => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${api}/api/products/${id}`);
          setItem(res.data);
        } catch (error) {
          console.error(`Error fetching data: ${error}`);
        }
      };
      fetchData();
    },
    [setItem]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${api}/api/products`);
        const limitedList = res.data.slice(0, 4);
        setUpdatedProductList(limitedList);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (item) {
      let title = item.title;
      const updatedTitle = title.replace(/\s+/g, "-") + "-" + item.id;
      window.location.href = `/${item.category}/${updatedTitle}`;
    }
  }, [item]);

  return (
    <div>
      <div className={`${styles.mainBanner}`}>
        <div className={styles.discountTxtContainer}>
          <h2 className={styles.discountTxt}>
            20% Discount For All Orders Over $199
          </h2>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            <div>
              <img className={styles.categories} alt="kids" src={kids} />
            </div>
            <h3 className={styles.heading}>Kids shoes collection</h3>
            <div className={styles.txt}>
              <p>
                Constructed from luxury nylons, leathers, and custom hardware,
                featuring sport details such as hidden breathing vents,
                waterproof + antimicrobial linings, and more.
              </p>
            </div>
            <a href="/kids" className={styles.buttonPrimary}>
              <span>Shop Kids</span>
            </a>
          </div>
          <div className={styles.gridItem}>
            <img className={styles.categories} alt="womens" src={womens} />
            <h3 className={styles.heading}>Women shoes collection</h3>
            <div className={styles.txt}>
              <p>
                Constructed from luxury nylons, leathers, and custom hardware,
                featuring sport details such as hidden breathing vents,
                waterproof + antimicrobial linings, and more.
              </p>
            </div>
            <a href="/women" className={styles.buttonPrimary}>
              <span>Shop Women</span>
            </a>
          </div>
          <div className={styles.gridItem}>
            <img className={styles.categories} alt="mens" src={mens} />
            <h3 className={styles.heading}>Men shoes collection</h3>
            <div className={styles.txt}>
              <p>
                Constructed from luxury nylons, leathers, and custom hardware,
                featuring sport details such as hidden breathing vents,
                waterproof + antimicrobial linings, and more.
              </p>
            </div>
            <a href="/men" className={styles.buttonPrimary}>
              <span>Shop men</span>
            </a>
          </div>
        </div>
      </div>
      <div>
        <h2 className={styles.productHeaderTxt}>FEATURED PRODUCTS</h2>
      </div>

      <div className={styles.container}>
        <div className={styles.gridContainer2}>
          {updatedProductList.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.title}
              price={product.price}
              demographic={product.demographic}
              category={product.category}
              type={product.type}
              id={product.id}
              view={findProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
