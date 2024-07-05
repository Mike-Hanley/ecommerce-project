import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMainContext } from "../MainContext";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { isSignedIn, signin, signout } = useMainContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/login", {
        username,
        password,
      });

      console.log(response.data.username); // Add this line

      localStorage.setItem("token", response.data.token);
      signin(response.data.username);
      // props.onLoginSuccess(); // You can handle a successful login in the parent component
      navigate("/dashboard");
    } catch (error) {
      console.error(error); // Log the error for better diagnosis
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className={`${styles.loginPage}`}>
      <div className={`${styles.pageContent} ${styles.pageWidth}`}>
        <div className={`${styles.grid}`}>
          <div className={`${styles.gridItem}`}>
            <header className={`${styles.sectionHeader}`}>
              <h1
                className={`${styles.headerTitle}`}
                style={{ fontSize: "35px" }}
              >
                Login
              </h1>
            </header>

            <div className={`${styles.customerLoginForm}`}>
              <form onSubmit={handleSubmit}>
                <input
                  placeholder="Email"
                  className={styles.customerEmail}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />

                <input
                  placeholder="Password"
                  className={styles.customerPassword}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <p>
                  <input
                    type="submit"
                    value="Sign In"
                    className={`${styles.btn}`}
                  ></input>
                </p>
              </form>
              {errorMessage && <p>{errorMessage}</p>}
              <div className={styles.registerBtn}>
                <p>
                  Don't have an account?{" "}
                  <Link to="/register" className="register-link">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
