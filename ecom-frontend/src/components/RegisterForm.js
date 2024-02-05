import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [role, setRole] = useState('USER');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/auth/register', {
        username,
        password,
        roles: [role],
      });

      console.log('User registered successfully');
      navigate('/'); // Redirect to login page on successful registration
    } catch (error) {
      console.error(error); // Log the error for better diagnosis
      setErrorMessage('Failed to register user');
    }
  };

  return (
    <>
   <div className={`${styles.RegisterFormPage}`}>
     <div className={`${styles.pageContent} ${styles.pageWidth}`}>
       <div className={`${styles.grid}`}>
         <div className={`${styles.gridItem}`}>
<header className={`${styles.sectionHeader}`}>
           <h1 className={`${styles.headerTitle}`} style={{fontSize:'35px'}}>Create Account</h1>
         </header>

         <div className={`${styles.registerForm}`}>

         <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="role">Role:</label>
        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
        <p>
         <button className={`${styles.btn}`} type="submit">Register</button>
        </p>
    </form>
     {errorMessage && <p>{errorMessage}</p>}
         </div>
        
         </div>
    
       </div>
       
     </div>
     
   </div>
    </>
    
  );
};

export default RegisterForm;
