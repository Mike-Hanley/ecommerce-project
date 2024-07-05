package com.lightningtasks.ecommercebackend.model;
import jakarta.persistence.*;

import java.util.Base64;
import java.util.Set;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column
    private String description;

    @Column(nullable = false)
    private Double price;

    @Column
    private String imageUrl;

    
    @Column
    private byte[] imageData;

    @Column
    private String category;

    @Column(nullable = false)
    private Integer stockQuantity;

    @ManyToMany(mappedBy = "products")
    private Set<Order> orders;

    // Convert byte[] to Base64 encoded string
   /* String base64Image = Base64.getEncoder().encodeToString(imageData);*/ 

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public byte[] getImage() {
        return imageData;
    }

    public void setImage(byte[] imageData) {
        this.imageData = imageData;
    }
/* 
    public String getBase64Image() {
        if (base64Image == null) {
            base64Image = Base64.getEncoder().encodeToString(imageData);
        }
        return base64Image;
    }
    
    public void setBase64Image(String base64Image) {
        this.base64Image = base64Image;
    }
*/
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    } 


    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setInventory(Integer stockQuantity) {
        this.stockQuantity= stockQuantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return id != null && id.equals(product.id);
    }

    @Override
    public int hashCode() {
        return 31;
    }
    
    }
