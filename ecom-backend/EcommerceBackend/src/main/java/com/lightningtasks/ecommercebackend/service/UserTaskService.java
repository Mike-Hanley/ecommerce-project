package com.lightningtasks.ecommercebackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lightningtasks.ecommercebackend.model.UserTask;
import com.lightningtasks.ecommercebackend.repository.UserTaskRepository;

import java.util.List;

@Service
public class UserTaskService {

    @Autowired
    private UserTaskRepository userTaskRepository;

    public List<UserTask> findAll() {
        return userTaskRepository.findAll();
    }

    public UserTask findById(Long id) {
        return userTaskRepository.findById(id).orElse(null);
    }

    public UserTask save(UserTask userTask) {
        return userTaskRepository.save(userTask);
    }

    public void deleteById(Long id) {
        userTaskRepository.deleteById(id);
    }
}

