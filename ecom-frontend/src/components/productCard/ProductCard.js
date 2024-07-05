import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../utils/ApiConstants";
import styles from "./ProductCard.module.css";
import { encode } from "base64-arraybuffer";

/**
 * Returns a product card component
 */
const ProductCard = ({
  name,
  description,
  price,
  demographic,
  category,
  type,
  view,
  id,
  imageLoadingError,
  setImageLoadingError,
}) => {
  const details = `${demographic} ${category} ${type}`;

  const [formattedPrice, setFormattedPrice] = useState(0);
  const [isLongName, setIsLongName] = useState(false);
  const [imgData, setImgData] = useState();

  useEffect(() => {
    setFormattedPrice(price.toFixed(2));
  }, [price, setFormattedPrice]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/api/products/${id}`, {
          demographic,
          type,
        });

        setImgData(response.data.image);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [demographic, type, id, setImageLoadingError, imgData]);

  return (
    <div className={styles.card}>
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
      <button
        className={styles.viewProductImage}
        type="button"
        onClick={() => {
          view(id);
        }}
      >
        <img
          src={`data:image/jpeg;base64, ${imgData}`}
          alt="Loading"
          className={styles.img}
          style={imgData ? {} : { display: "none" }}
        />
      </button>
      <div className={styles.container}>
        <button
          className={styles.viewButton}
          type="button"
          onClick={() => {
            view(id);
          }}
        >
          <p className={styles.description}>{description}</p>
        </button>
        <p>${formattedPrice}</p>
      </div>
    </div>
  );
};

export default ProductCard;
