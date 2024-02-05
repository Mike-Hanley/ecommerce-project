import React, { useState,useEffect } from "react";
import styles from "./MensPage.module.css";
import api from '../utils/ApiConstants';
import axios from 'axios';
import ProductCard from "./productCard/ProductCard";
import Pagination from './pagination/Pagination';

const MensPage = () => {

  const [products, setProducts] = useState([]);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState();
  const [currentPage, setCurrentPage] = useState(1); // Start on page 1

  const productsPerPage = 9; // Number of cards to display on a page
  const indexOfLastProduct = currentPage * productsPerPage; // Last product on page
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // First product on page

  // Products on the page
  const currentProducts = products
    .slice(indexOfFirstProduct, indexOfLastProduct);

  /**
   * Sets breadcrumb at rendering and performs get request to the API for search results
   */
  
  /*
  useEffect(() => {

    let paramString = '';

    for (let i = 1; i < demographics.length; i += 1) {
      if (i === 1) {
        paramString = `${paramString}demographic=${demographics[i]}`;
        setPath((prevPath) => ([...prevPath, demographics[i]]));
      } else if (i === 2) {
        paramString = `${paramString}&category=${demographics[i]}`;
        setPath((prevPath) => ([...prevPath, demographics[i]]));
      } else {
        paramString = `${paramString}&type=${demographics[i]}`;
        setPath((prevPath) => ([...prevPath, demographics[i]]));
      }
    }
/${paramString}
   
    const fetchData = async () => {
      setLoading(true); 
      await axios({
        method: 'get',
        url: `${api}/api/products`,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          mode: 'cors'
        }
      }).then((res) => {
        let list = [];
        for (let i = 0; i < res.data.results.length; i += 1) {
          list = list.concat(res.data.results[i]);
        }
        setProducts(list);
        console.log(list);
      }).finally(() => {
        setCurrentPage(1); // On render, set current page to 1 
        setLoading(false);
      });
    };

    fetchData(); 
  }, []);
 */

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${api}/api/products`);
        let list = [];
        
        for (let i = 0; i < res.data.length; i += 1) {
          list = list.concat(res.data[i]);
        }
        setProducts(list);
        
        console.log(list);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      } finally {
        /* setCurrentPage(1); // On render, set current page to 1 */
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  /**
   * finds specific product information by id
   * @param {int} id id of product
   */
  const findProduct = (id) => {
    
    const fetchData = async () => {
      try {
        const res = await axios.get(`${api}/api/products/${id}`);
        setItem(res.data);
        console.log(res.data);
        
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      } finally {
        /* setCurrentPage(1); // On render, set current page to 1 */
        setLoading(false);
        console.log(item);
      }
      
    };

    fetchData();
  };

  useEffect(() => {
    if (item) {
      console.log(item);
      window.location.href = `/products/${item.id}`;
    }
  }, [item]);



  return (
    <main className={styles.content}>
      <div className={`${styles.pageWidth} ${styles.pad}`}>
        <span>
          <a href="/" class="text-interactive">
            Home
          </a>
          <span> / </span>
        </span>
        <span>Men</span>
      </div>
      <div className={styles.pageWidth}>
        <div className={styles.header}>
          <div className={styles.txtContainer}>
            <h1 className={styles.categoryName}>Men</h1>
          </div>
        </div>
      </div>
      <div className={`${styles.pageWidth} ${styles.gridContainer}`}>
        <div className={styles.gridColumn1}>
          <div className={styles.productFilter}>
            <div className={styles.filterHeading}>
              <span>SHOP BY</span>
            </div>
            <div className={styles.priceFilter}>
              <div>Price</div>
              <div className={styles.rangeSlider}>
                <input
                  type="range"
                  class="min"
                  min="169"
                  max="802"
                  value="169"
                />
                <div className={`${styles.tooltip} ${styles.min}`}>
                  <div className={styles.push}></div>
                  <output>$169.00</output>
                </div>
                <input
                  type="range"
                  class="max"
                  min="169"
                  max="802"
                  value="802"
                />
                <div className={`${styles.tooltip} ${styles.max}`}>
                  <div className={styles.push2}></div>
                  <output>$802.00</output>
                </div>
              </div>
            </div>
            <div className={styles.attrFilter}>
              <div className={styles.filterItemTitle}>
                <span class="font-medium">Color</span>
              </div>
              <ul class="filter-option-list">
                <li class="mt-05 mr-05">
                  <a href="#" class="flex justify-start items-center">
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g fill="#212121" fill-rule="nonzero">
                          <path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z"></path>
                        </g>
                      </g>
                    </svg>
                    <span class="filter-option">White</span>
                  </a>
                </li>
                <li class="mt-05 mr-05">
                  <a href="#" class="flex justify-start items-center">
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g fill="#212121" fill-rule="nonzero">
                          <path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z"></path>
                        </g>
                      </g>
                    </svg>
                    <span class="filter-option">Black</span>
                  </a>
                </li>
                <li class="mt-05 mr-05">
                  <a href="#" class="flex justify-start items-center">
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g fill="#212121" fill-rule="nonzero">
                          <path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z"></path>
                        </g>
                      </g>
                    </svg>
                    <span class="filter-option">Grey</span>
                  </a>
                </li>
                <li class="mt-05 mr-05">
                  <a href="#" class="flex justify-start items-center">
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g fill="#212121" fill-rule="nonzero">
                          <path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z"></path>
                        </g>
                      </g>
                    </svg>
                    <span class="filter-option">Blue</span>
                  </a>
                </li>
                <li class="mt-05 mr-05">
                  <a href="#" class="flex justify-start items-center">
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g fill="#212121" fill-rule="nonzero">
                          <path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z"></path>
                        </g>
                      </g>
                    </svg>
                    <span class="filter-option">Brown</span>
                  </a>
                </li>
                <li class="mt-05 mr-05">
                  <a href="#" class="flex justify-start items-center">
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g fill="#212121" fill-rule="nonzero">
                          <path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z"></path>
                        </g>
                      </g>
                    </svg>
                    <span class="filter-option">Green</span>
                  </a>
                </li>
                <li class="mt-05 mr-05">
                  <a href="#" class="flex justify-start items-center">
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g fill="#212121" fill-rule="nonzero">
                          <path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z"></path>
                        </g>
                      </g>
                    </svg>
                    <span class="filter-option">Pink</span>
                  </a>
                </li>
                <li class="mt-05 mr-05">
                  <a href="#" class="flex justify-start items-center">
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g fill="#212121" fill-rule="nonzero">
                          <path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z"></path>
                        </g>
                      </g>
                    </svg>
                    <span class="filter-option">Red</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.attrFilter}>
              <div className={styles.filterItemTitle}>
                <span class="font-medium">Size</span>
              </div>
              <ul class="filter-option-list">
                <li class="mt-05 mr-05">
                  <a href="#" class="flex justify-start items-center">
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g fill="#212121" fill-rule="nonzero">
                          <path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z"></path>
                        </g>
                      </g>
                    </svg>
                    <span class="filter-option">L</span>
                  </a>
                </li>
                <li class="mt-05 mr-05">
                  <a href="#" class="flex justify-start items-center">
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g fill="#212121" fill-rule="nonzero">
                          <path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z"></path>
                        </g>
                      </g>
                    </svg>
                    <span class="filter-option">XL</span>
                  </a>
                </li>
                <li class="mt-05 mr-05">
                  <a href="#" class="flex justify-start items-center">
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g fill="#212121" fill-rule="nonzero">
                          <path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z"></path>
                        </g>
                      </g>
                    </svg>
                    <span class="filter-option">M</span>
                  </a>
                </li>
                <li class="mt-05 mr-05">
                  <a href="#" class="flex justify-start items-center">
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g fill="#212121" fill-rule="nonzero">
                          <path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z"></path>
                        </g>
                      </g>
                    </svg>
                    <span class="filter-option">S</span>
                  </a>
                </li>
                <li class="mt-05 mr-05">
                  <a href="#" class="flex justify-start items-center">
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g fill="#212121" fill-rule="nonzero">
                          <path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z"></path>
                        </g>
                      </g>
                    </svg>
                    <span class="filter-option">X</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.attrFilter}>
              <div className={styles.filterItemTitle}>
                <span class="font-medium">Brand</span>
              </div>
              <ul class="filter-option-list">
                <li class="mt-05 mr-05">
                  <a href="#" class="flex justify-start items-center">
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g fill="#212121" fill-rule="nonzero">
                          <path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z"></path>
                        </g>
                      </g>
                    </svg>
                    <span class="filter-option">Converse</span>
                  </a>
                </li>
                <li class="mt-05 mr-05">
                  <a href="#" class="flex justify-start items-center">
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g fill="#212121" fill-rule="nonzero">
                          <path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z"></path>
                        </g>
                      </g>
                    </svg>
                    <span class="filter-option">Nike</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.gridColumn3}>

          <div className={styles.productSorting}>
            <div className={styles.productSortingInner}>
              <div>
                <span>Sort By</span>
              </div>
              <div className={styles.sortContainer}>
                <div class="form-field-container dropdown null">
                  <div className={styles.fieldWrapper}>
                    <select className={styles.formField} placeholder="Default">
                      <option selected="" value="">
                        Default
                      </option>
                      <option value="price">Price</option>
                      <option value="name">Name</option>
                    </select>
                    <div className={styles.fieldBorder}></div>
                    <div className={styles.fieldSuffix}>
                      <svg
                        viewBox="0 0 20 20"
                        width="1rem"
                        height="1.25rem"
                        focusable="false"
                        aria-hidden="true"
                      >
                        <path d="m10 16-4-4h8l-4 4zm0-12 4 4H6l4-4z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sort-direction self-center">
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-arrow-down"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div>
          <Pagination
                    firstProduct={indexOfFirstProduct}
                    lastProduct={indexOfLastProduct}
                    itemsPerPage={productsPerPage}
                    totalItems={products}
                    currentPage={currentPage}
                    setPage={setCurrentPage}
                  />
            <div className={styles.cards}>
                    {currentProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        demographic={product.demographic}
                        category={product.category}
                        type={product.type}
                        id={product.id}
                        view={findProduct}
                       /* imageLoadingError={imageLoadingError}
                        setImageLoadingError={setImageLoadingError} */
                      />
                    ))}
                  </div>
                  <div className="mt-3 mb-5">
                    <Pagination
                      firstProduct={indexOfFirstProduct}
                      lastProduct={indexOfLastProduct}
                      itemsPerPage={productsPerPage}
                      totalItems={products}
                      currentPage={currentPage}
                      setPage={setCurrentPage}
                    />
                  </div>
            
            <span class="product-count italic block mt-2">8 products</span>
          </div>
          <div className={styles.productsPagination}></div>
        </div>
      </div>
    </main>
  );
};

export default MensPage;
