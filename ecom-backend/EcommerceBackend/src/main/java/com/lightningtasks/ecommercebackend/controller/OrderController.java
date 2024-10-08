package com.lightningtasks.ecommercebackend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lightningtasks.ecommercebackend.model.Order;
import com.lightningtasks.ecommercebackend.model.Product;
import com.lightningtasks.ecommercebackend.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    
    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> save(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.save(order));
    }

    //admin specific
    @GetMapping
    public ResponseEntity<List<Order>> findAll() {
        return ResponseEntity.ok(orderService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> findById(@PathVariable Long id) {
        Order order = orderService.findById(id);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }

    @PutMapping
    public ResponseEntity<Order> update(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.save(order));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        orderService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
