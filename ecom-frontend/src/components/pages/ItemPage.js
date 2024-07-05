import React, { useState, useEffect } from "react";
import styles from "./ItemPage.module.css";
import api from "../../utils/ApiConstants";
import axios from "axios";
import ProductCard from "../productCard/ProductCard";
import Pagination from "../pagination/Pagination";
import ItemFilter from "../ItemFilter";
import { useMainContext } from "../../MainContext";

const ItemPage = () => {
  const {
    products,
    setProducts,
    item,
    setItem,
    checkedItems,
    setCheckedItems,
  } = useMainContext();
  const [loading, setLoading] = useState();
  const [page, setPage] = useState(window.location.pathname.slice(1));
  const [currentPage, setCurrentPage] = useState(1); // Start on page 1

  const [updatedProductList, setUpdatedProductList] = useState([]);

  const productsPerPage = 9; // Number of cards to display on a page
  const indexOfLastProduct = currentPage * productsPerPage; // Last product on page
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // First product on page

  // Products on the page
  const currentProducts = updatedProductList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const priceFilterLabels = [
    "$0 - $25",
    "$25 - $50",
    "$50 - $100",
    "$100 - $150",
  ];
  const brandFilterLabels = ["Nike", "Adidas", "Sketchers", "Reebok"];

  const handleSort = (event) => {
    const selectedOption = event.target.value;
    let sortedProducts = [...updatedProductList];

    switch (selectedOption) {
      case "price":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "name":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        sortedProducts.sort((a, b) => a.id - b.id);
    }

    setUpdatedProductList(sortedProducts);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${api}/api/products`);
        const filteredProducts = res.data.filter(product => product.category === page);
        setProducts(filteredProducts);
        setUpdatedProductList(filteredProducts);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [page, setProducts]);

  /**
   * finds specific product information by id
   * @param {int} id id of product
   */
  const findProduct = (id) => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${api}/api/products/${id}`);
        setItem(res.data);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };

  useEffect(() => {
    if (item) {
      let title = item.title;
      const updatedTitle = title.replace(/\s+/g, "-") + "-" + item.id;
      window.location.href = `/${page}/${updatedTitle}`;
    }
  }, [item, page]);

  useEffect(() => {
    console.log(checkedItems[0]);
    if (checkedItems.length > 0 && checkedItems[0].includes("$")) {
      const matches = checkedItems[0].match(/\$(\d+)/g);
      const lowerNumber = Number(matches[0].replace("$", ""));
      const higherNumber = Number(matches[1].replace("$", ""));
      setUpdatedProductList(
        products.filter(
          (item) => item.price >= lowerNumber && item.price <= higherNumber
        )
      );
    } else if (checkedItems.length > 0 && checkedItems[0].includes("Brand")) {
      const matches = checkedItems[0].match(/([^-\n]+)$/);
      console.log(matches[0]);
      setUpdatedProductList(
        products.filter(
          (item) =>
            item.title.includes(matches[0].toLowerCase()) ||
            item.title.includes(matches[0])
        )
      );
    } else {
      setUpdatedProductList(products);
    }
  }, [checkedItems, products]);

  return (
    <main className={styles.content}>
      <div className={`${styles.pageWidth} ${styles.pad}`}>
        <span>
          <a href="/" class="text-interactive" className={styles.link}>
            Home
          </a>
          <span>/</span>
        </span>
        <span> {page}</span>
      </div>
      <div className={styles.pageWidth}>
        <div className={styles.header}>
          <div className={styles.txtContainer}>
            <h1 className={styles.categoryName}>{page}</h1>
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
              <ItemFilter title={"Price"} labels={priceFilterLabels} />
            </div>
            <div className={styles.priceFilter}>
              <ItemFilter title={"Brand"} labels={brandFilterLabels} />
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
                    <select
                      className={styles.formField}
                      placeholder="Default"
                      onChange={handleSort}
                    >
                      <option selected="" value="">
                        Default
                      </option>
                      <option value="price">Price</option>
                      <option value="name">Name</option>
                    </select>
                    <div className={styles.fieldBorder}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.productCardContainer}>
            <div className={styles.cards}>
              {currentProducts.map((product) => (
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
            <div className={styles.productsPagination}>
              {updatedProductList.length ? (
                <Pagination
                  firstProduct={indexOfFirstProduct}
                  lastProduct={indexOfLastProduct}
                  itemsPerPage={productsPerPage}
                  totalItems={products}
                  currentPage={currentPage}
                  setPage={setCurrentPage}
                />
              ) : (
                ""
              )}
              <span class="product-count italic block mt-2">
                {updatedProductList.length} products
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ItemPage;
