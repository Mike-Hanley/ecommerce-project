import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import RegisterForm from "./components/RegisterForm";
import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Protected from "./components/Protected";
import { useMainContext } from "./MainContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ShoppingCart from "./components/ShoppingCart";
import styles from "./App.module.css";
import ItemPage from "./components/pages/ItemPage";
import ProductDetails from "./components/pages/ProductDetails";
import ShoppingCartPage from "./components/pages/ShoppingCartPage";
import Footer from "./components/Footer";

function App() {
  const { isSignedIn, username, showCart } =
    useMainContext();

  return (
    <Router>
      <div className={`${styles.app}`}>
        <ShoppingCart />
        <main
          className={`${styles.content} ${
            showCart ? styles.cartBackgroundOpacity : ""
          }`}
        >
          <div className={`${showCart ? styles.overlayOpen : ""}`}></div>
          <Navbar />

          {isSignedIn ? (
            <h2 style={{ textAlign: "center" }}>
              Welcome to Dune, {username}!
            </h2>
          ) : (
            <></>
          )}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/men" element={<ItemPage />} />
            <Route path="/men/:id" element={<ProductDetails />} />
            <Route path="/women" element={<ItemPage />} />
            <Route path="/women/:id" element={<ProductDetails />} />
            <Route path="/kids" element={<ItemPage />} />
            <Route path="/kids/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<ShoppingCartPage />} />
            {isSignedIn && (
              <Route
                path="/dashboard"
                element={
                  <Protected isSignedIn={isSignedIn}>
                    <Dashboard />
                  </Protected>
                }
              />
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <div className={styles.footer}>
            <Footer />
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
