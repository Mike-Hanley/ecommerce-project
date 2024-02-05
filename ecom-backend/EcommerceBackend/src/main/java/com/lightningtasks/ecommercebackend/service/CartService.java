package com.lightningtasks.ecommercebackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lightningtasks.ecommercebackend.model.Cart;
import com.lightningtasks.ecommercebackend.repository.CartRepository;

@Service
public class CartService {
    
    @Autowired
    private CartRepository cartRepository;

    public boolean existsById(Long cartId) {
        return cartRepository.existsById(cartId);
    }

    public Cart save(Cart cart) {
        return cartRepository.save(cart);
    }

    public Cart findById(Long id) {
        return cartRepository.findById(id).orElse(null);
    }

    public List<Cart> findAll() {
        return cartRepository.findAll();
    }

    public void deleteById(Long id) {
        cartRepository.deleteById(id);
    }
}
