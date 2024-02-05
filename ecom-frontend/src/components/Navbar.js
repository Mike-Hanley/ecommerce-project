import { useState } from 'react';
import styles from './Navbar.module.css';
import axios from 'axios';
import Result from '../components/Result';
import SearchBar from './SearchBar';
import ShoppingCartButton from './ShoppingCartButton';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SearchIcon from '@mui/icons-material/Search';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import CloseIcon from '@mui/icons-material/Close';

function Navbar() {
  // adding the states 
  const [isActive, setIsActive] = useState(false);
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [result, setResult] = useState(null);

  //add the active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const toggleSearch = () => {
    setSearchBarActive(!searchBarActive);
  };

  //clean up function to remove the active class
  const removeActive = () => {
    setIsActive(false)
  }

  const removeSearchActive = () => {
    setSearchBarActive(false)
  }
  

  //https://dummyjson.com/products/search?q=${value}&limit=10
  //http://localhost:8080/api/products

  const fetchData = async (value) => {
    const { data } = await axios.get(
      `https://dummyjson.com/products/search?q=${value}&limit=10`
    );
  
    return data.products;
  };

  return (
    <div className={`${styles.pageContainer}`}>
      <div className={`${styles.pageWidth}`} style={{height:'78px'}}>
        <header id="SiteHeader" className={`${styles.siteHeader}`}>
          <div className={`${styles.pageWidth}`}>
            <div className={`${styles.navbar}`}>

          {/* logo */}
          <a href='/' className={`${styles.logo}`}><LogoDevIcon/></a>

          <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
            <li onClick={removeActive}>
              <a href='/' className={`${styles.navLink}`}>Home</a>
            </li>
            <li onClick={removeActive}>
              <a href='/' className={`${styles.navLink}`}>Catalog</a>
            </li>
            <li onClick={removeActive}>
              <a href='/' className={`${styles.navLink}`}>Shop All</a>
            </li>
            <li onClick={removeActive}>
              <a href='/' className={`${styles.navLink}`}>Contact</a>
            </li>
          </ul>
          
          <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`}  onClick={toggleActiveClass}>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
          </div>
          <div className={`${styles.icons}`}>
            <div className={`${styles.account}`}>
            <a href='/login'> <PermIdentityIcon/> </a>  
            </div>   
            <div className={`${styles.search}`} onClick={toggleSearch}>
              <SearchIcon/>  
            </div>  
            <div className={`${styles.cartIcon}`}>
               <ShoppingCartButton/> 
            </div>

          </div>
          
        </div>


          
        
        <div className={`${styles.searchContainer} ${searchBarActive ? styles.active : ''}`} >
             <div className={`${styles.siteHeaderSearch}`}>
              <div className={`${styles.pageWidth}`}>
                <form className={`${styles.siteHeaderSearchForm}`}>
                <button className={`${styles.icon}`}>
                <SearchIcon/>  
                </button>  
                  <SearchBar
                  className={`${styles.icon}`}
          fetchData={fetchData}
          setResult={setResult}
          suggestionKey="title"
        />
        <button className={`${styles.icon}`}>
          <CloseIcon
          onClick={(e) => {
            e.preventDefault();
            removeSearchActive();
            }} />  
        </button>
           
              
          </form>
          
        
        
        
              </div>
             </div>       
          </div>

        </div>

      </header>
      {result && <Result {...result} />}
      </div> 
    </div>
  );
}

export default Navbar;