package com.lightningtasks.ecommercebackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lightningtasks.ecommercebackend.model.Cart;
import com.lightningtasks.ecommercebackend.model.Product;
import com.lightningtasks.ecommercebackend.model.User;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUser(User user);
    List<Cart> findByProduct(Product product);
}
