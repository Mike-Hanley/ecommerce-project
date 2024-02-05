package com.lightningtasks.microtasksapp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.lightningtasks.microtasksapp.model.UserTask;

@Repository
public interface UserTaskRepository extends JpaRepository<UserTask, Long> {
}