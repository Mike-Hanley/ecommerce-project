import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../../utils/ApiConstants';
import styles from './ProductCard.module.css';

/**
 * Returns a product card component
 */
const ProductCard = ({
  name, description, price, demographic, category, type,
  view, id, imageLoadingError, setImageLoadingError
}) => {
  const details = `${demographic} ${category} ${type}`;

  const [formattedPrice, setFormattedPrice] = useState(0);
  const [isLongName, setIsLongName] = useState(false);
  const [img, setImg] = useState();

  useEffect(() => {
    setFormattedPrice(price.toFixed(2));
  }, [price, setFormattedPrice]);
/*
  useEffect(() => {
    if (name.length >= 38) {
      setIsLongName(true);
    } else {
      setIsLongName(false);
    }
  }, [name.length]);
*/
  useEffect(() => {
    axios.post(`${api}/images`, {
      demographic,
      type
    })
      .then((response) => {
        setImg(response.data);
        setImageLoadingError(false);
      })
      .catch(() => setImageLoadingError(true));
  }, [demographic, img, type, setImageLoadingError]);

  return (
    <div className={styles.card}>
      {imageLoadingError ? (
        <img
          src="https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg"
          alt="Loading Error"
          className={styles.img}
          style={img ? { display: 'none' } : {}}
        />
      )
        : (
          <img
            src="https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp"
            alt="Loading"
            className={styles.img}
            style={img ? { display: 'none' } : {}}
          />

        )}
      <img src={img} alt="Loading" className={styles.img} style={img ? {} : { display: 'none' }} />
      <div className={styles.container}>
        <p className={isLongName ? styles.longProductName : styles.productName}>{name}</p>
        <p className={styles.description}>{description}</p>
        <p>
          $
          {formattedPrice}
        </p>
        <div className={styles.demographics}>
          <p>
            {details}
          </p>
        </div>
        <button className={styles.viewButton} type="button" onClick={() => { view(id); }}>View</button>
      </div>
    </div>
  );
};

export default ProductCard;
