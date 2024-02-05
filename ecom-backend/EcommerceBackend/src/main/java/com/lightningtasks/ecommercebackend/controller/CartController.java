package com.lightningtasks.ecommercebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lightningtasks.ecommercebackend.model.Cart;
import com.lightningtasks.ecommercebackend.model.Order;
import com.lightningtasks.ecommercebackend.service.CartService;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping
    public ResponseEntity<Cart> save(@RequestBody Cart cart) {
        return ResponseEntity.ok(cartService.save(cart));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Cart> findById(@PathVariable Long id) {
        Cart cart = cartService.findById(id);
        if (cart == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/{cartId}")
    public ResponseEntity<Cart> update(@PathVariable Long cartId, @RequestBody Cart updatedCart) {
    Cart existingCart = cartService.findById(cartId);
    if (existingCart == null) {
        return ResponseEntity.notFound().build();
    }
    // Update the fields of the existingCart with values from updatedCart
    if (updatedCart.getQuantity() != null && !updatedCart.getQuantity().equals(existingCart.getQuantity())) {
        existingCart.setQuantity(updatedCart.getQuantity());
    }

    // Optionally, update user and product if they've changed
    // This is less common for cart items, but I'm including it for completeness
    //if (updatedCart.getUser() != null && !updatedCart.getUser().equals(existingCart.getUser())) {
    //    existingCart.setUser(updatedCart.getUser());
    //}
    //if (updatedCart.getProduct() != null && !updatedCart.getProduct().equals(existingCart.getProduct())) {
    //    existingCart.setProduct(updatedCart.getProduct());
    //}
    return ResponseEntity.ok(cartService.save(existingCart));
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<Void> deleteById(@PathVariable Long cartId) {
    if (!cartService.existsById(cartId)) {
        return ResponseEntity.notFound().build();
    }
    cartService.deleteById(cartId);
    return ResponseEntity.noContent().build();
    }
}
