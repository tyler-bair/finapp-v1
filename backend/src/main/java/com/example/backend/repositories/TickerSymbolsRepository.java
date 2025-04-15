package com.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.example.backend.TickerSymbols;

@Repository
public interface TickerSymbolsRepository extends JpaRepository<TickerSymbols, Long> {
    List<TickerSymbols> findByPortfolioId(Long portfolioId);
}
