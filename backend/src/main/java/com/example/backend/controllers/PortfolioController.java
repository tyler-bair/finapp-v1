package com.example.backend.controllers;

import com.example.backend.Portfolio;
import com.example.backend.repositories.PortfolioRepository;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/portfolios")
public class PortfolioController {
    
    private final PortfolioRepository repo;

    public PortfolioController(PortfolioRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Portfolio> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Portfolio create(@RequestBody Portfolio portfolio) {
        return repo.save(portfolio);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        try {
            repo.deleteById(id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Portfolio not found: " + e);
        }
    }
}
