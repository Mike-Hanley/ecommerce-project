import { React, useState } from "react";
import styles from "./ItemFilter.module.css";
import { useMainContext } from "../../src/MainContext";

const ItemFilter = ({ title, labels }) => {
  const { checkedItems, setCheckedItems } = useMainContext();

  return (
    <div>
      <span className={styles.collapsibleTrigger}>{title}</span>
      <div className={styles.filterGroupOuter}>
        <div className={styles.filterGroupContent}>
          <div className={styles.filterGroup}>
            {labels.map((label) => (
              <FilterLabel
                key={label}
                label={label}
                id={`filter-checkbox-${title}-${label}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterLabel = ({ label, id }) => {
  const { checkedItems, setCheckedItems } = useMainContext();

  const onCheckboxChange = (event) => {
    if (checkedItems.includes(id)) {
      setCheckedItems([]);
    } else {
      setCheckedItems([id]);
    }
  };

  return (
    <div>
      <button
        className={styles.filterItem}
        onClick={() => {
          checkedItems.includes(id)
            ? setCheckedItems([])
            : setCheckedItems([id]);
        }}
      >
        <input
          type="checkbox"
          id={id}
          checked={checkedItems.includes(id)}
          onChange={onCheckboxChange}
        />

        <span className={styles.itemLabel}>{label}</span>
      </button>
    </div>
  );
};

export default ItemFilter;
