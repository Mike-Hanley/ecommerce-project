package com.lightningtasks.microtasksapp.controller;

import com.lightningtasks.microtasksapp.model.Task;
import com.lightningtasks.microtasksapp.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<Task>> findAll() {
        return ResponseEntity.ok(taskService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> findById(@PathVariable Long id) {
        Task task = taskService.findById(id);
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(task);
    }

    @PostMapping
    public ResponseEntity<Task> save(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.save(task));
    }

    @PutMapping
    public ResponseEntity<Task> update(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.save(task));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        taskService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
