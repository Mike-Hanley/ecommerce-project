package com.lightningtasks.microtasksapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lightningtasks.microtasksapp.model.Cart;
import com.lightningtasks.microtasksapp.model.Product;
import com.lightningtasks.microtasksapp.model.User;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUser(User user);
    List<Cart> findByProduct(Product product);
}
