package com.lightningtasks.microtasksapp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.lightningtasks.microtasksapp.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
