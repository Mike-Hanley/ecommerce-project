package com.lightningtasks.microtasksapp.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lightningtasks.microtasksapp.model.Order;
import com.lightningtasks.microtasksapp.model.User;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    List<Order> findByOrderDateBetween(Date startDate, Date endDate);
    // Assuming you have an OrderStatus enum or similar
    //List<Order> findByStatus(OrderStatus status);
}
