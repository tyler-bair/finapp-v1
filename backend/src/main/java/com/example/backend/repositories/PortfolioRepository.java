package com.example.backend.repositories;

import com.example.backend.Portfolio;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    // Used to find if portfolio name already exists
    // Can be used in future to search for portfolios
    Optional<Portfolio> findByName(String name);
}
