import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';
import { useMainContext } from '../MainContext';
import styles from './Home.module.css';
import banner from '../utils/image3.png';
import kids from '../utils/kids.png';
import womens from '../utils/womens.png';
import mens from '../utils/mens.png';

const Home = () => {
  const navigate = useNavigate();
  const { isSignedIn, signin, signout, username } = useMainContext();



  return (
    <div>
      <div className={`${styles.mainBanner}`}>
      <img className={styles.banner} alt="banner" src={banner} />
      <div className={styles.discountTxtContainer}>
        <h2 className={styles.discountTxt}>Discount 20% For All Orders Over $199</h2>
      </div>
      </div>
      <div className={styles.container}>
  <div className={styles.gridContainer}>
    <div className={styles.gridItem}>
      <div>
        <img className={styles.categories} alt="kids" src={kids} /> 
      </div>
      <h3 className={styles.heading}>Men shoes collection</h3>
      <div className={styles.txt}><p>Constructed from luxury nylons, leathers, and custom hardware, featuring sport details such as hidden breathing vents, waterproof + antimicrobial linings, and more.</p></div>
      <a href="/kids" className={styles.buttonPrimary}>
        <span>
          Shop Kids
          </span>
          </a>
    </div>
    <div className={styles.gridItem}>
    <img className={styles.categories} alt="womens" src={womens} />
    <h3 className={styles.heading}>Women shoes collection</h3>
      <div className={styles.txt}><p>Constructed from luxury nylons, leathers, and custom hardware, featuring sport details such as hidden breathing vents, waterproof + antimicrobial linings, and more.</p></div>
      <a href="/women" className={styles.buttonPrimary}>
        <span>
          Shop Women
          </span>
          </a>
    </div>
    <div className={styles.gridItem}>
    <img className={styles.categories} alt="mens" src={mens} />
    <h3 className={styles.heading}>Men shoes collection</h3>
      <div className={styles.txt}><p>Constructed from luxury nylons, leathers, and custom hardware, featuring sport details such as hidden breathing vents, waterproof + antimicrobial linings, and more.</p></div>
      <a href="/men" className={styles.buttonPrimary}>
        <span>
          Shop men
          </span>
          </a>
    </div>
  </div>
</div><div className={styles.productHeaderTxt}>
  <h1>FEATURED PRODUCTS</h1>
</div>
      
      <div className={styles.container}>
  <div className={styles.gridContainer2}>
    <div className={styles.gridItem}>
      <div>
        <img className={styles.categories} alt="kids" src={kids} /> 
      </div>
      <h3 className={styles.heading}>Men shoes collection</h3>
      <div className={styles.txt}><p>
        Constructed from luxury nylons, leathers, and custom hardware, featuring sport details such as hidden breathing vents, waterproof + antimicrobial linings, and more.
        </p></div>
    </div>
    <div className={styles.gridItem}>
    <img className={styles.categories} alt="womens" src={womens} />
    <h3 className={styles.heading}>Women shoes collection</h3>
      <div className={styles.txt}><p>
        Constructed from luxury nylons, leathers, and custom hardware, featuring sport details such as hidden breathing vents, waterproof + antimicrobial linings, and more.
        </p></div>
    </div>
    <div className={styles.gridItem}>
    <img className={styles.categories} alt="mens" src={mens} />
    <h3 className={styles.heading}>Men shoes collection</h3>
      <div className={styles.txt}><p>
        Constructed from luxury nylons, leathers, and custom hardware, featuring sport details such as hidden breathing vents, waterproof + antimicrobial linings, and more.
        </p></div>
    </div>
    <div className={styles.gridItem}>
    <img className={styles.categories} alt="mens" src={mens} />
    <h3 className={styles.heading}>Men shoes collection</h3>
      <div className={styles.txt}><p>
        Constructed from luxury nylons, leathers, and custom hardware, featuring sport details such as hidden breathing vents, waterproof + antimicrobial linings, and more.
        </p></div>
    </div>
  </div>
</div>
      
    </div>
  );
};

export default Home;