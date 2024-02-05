package com.lightningtasks.ecommercebackend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lightningtasks.ecommercebackend.model.UserTask;

@Repository
public interface UserTaskRepository extends JpaRepository<UserTask, Long> {
}