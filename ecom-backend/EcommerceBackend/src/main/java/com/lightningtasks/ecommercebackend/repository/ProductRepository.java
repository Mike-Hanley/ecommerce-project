package com.lightningtasks.ecommercebackend.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lightningtasks.ecommercebackend.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findById(Long id);
    List<Product> findByTitle(String title);
    List<Product> findByCategory(String category);
    List<Product> findByStockQuantityLessThan(Integer quantity);
}
