import React, { useState } from 'react';
import { useMainContext } from '../MainContext';
import styles from './Quantity.module.css';

const Quantity = () => {
  const { qty, setQty } = useMainContext();
  const increment = () => {
    setQty((prevValue) => ++prevValue);
  };

  const decrement = () => {
    setQty((prevValue) => (prevValue > 0 ? --prevValue : 0));
  };

  return (
    <div className={styles.quantityInputContainer}>
      <p>Qty</p>
      <div className={styles.inputContainer}>
        <button className={styles.quantityModifierLeft} onClick={decrement}>
          &mdash;
        </button>
        <input className={styles.quantityInput} type="text" value={qty} readOnly />
        <button className={styles.quantityModifierRight} onClick={increment}>
          &#xff0b;
        </button>
      </div>
    </div>
  );
};

export default Quantity;