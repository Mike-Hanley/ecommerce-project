import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import styles from './SearchBar.module.css';

const SearchBar = ({ fetchData, setResult, suggestionKey }) => {
  const [value, setValue] = useState(''); //this is the value of the search bar
  const [suggestions, setSuggestions] = useState([]); // this is where the search suggestions get stored
  const [hideSuggestions, setHideSuggestions] = useState(true);

  const findResult = (value) => {
    setResult(
      suggestions.find((suggestion) => suggestion[suggestionKey] === value)
    );
  };

  useDebounce(
    async () => {
      try {
        const suggestions = await fetchData(value);

        setSuggestions(suggestions || []);
      } catch (error) {
        console.log(error);
      }
    },
    1000,
    [value]
  );

  const handleFocus = () => {
    setHideSuggestions(false)
  };

  const handleBlur = () => {
    setTimeout(() => {
      setHideSuggestions(true);
    }, 200);
  };

  const handleSearchInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className={styles['container']}>
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="search"
          className={styles['textbox']}
          placeholder="Search our store"
          value={value}
          onChange={handleSearchInputChange}
        />
        <div
          className={`${styles.suggestions} ${
            hideSuggestions && styles.hidden
          }`}
        >
          {suggestions.map((suggestion) => (
            <div
              className={styles.suggestion}
              onClick={() => findResult(suggestion[suggestionKey])}
            >
              {suggestion[suggestionKey]}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchBar;