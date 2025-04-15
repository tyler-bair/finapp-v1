package com.example.backend.controllers;

import com.example.backend.TickerSymbols;
import com.example.backend.Portfolio;
import com.example.backend.requests.TickerSymbolRequest;
import com.example.backend.repositories.PortfolioRepository;
import com.example.backend.repositories.TickerSymbolsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/tickerSymbols")
public class TickerSymbolsController {

    private final TickerSymbolsRepository tickerSymbolsRepository;
    private final PortfolioRepository portfolioRepository;

    public TickerSymbolsController(TickerSymbolsRepository tickerSymbolsRepository,
                                   PortfolioRepository portfolioRepository) {
        this.tickerSymbolsRepository = tickerSymbolsRepository;
        this.portfolioRepository = portfolioRepository;
    }

    // Get all ticker symbols for a specific portfolio
    @GetMapping("/portfolio/{id}")
    public List<TickerSymbols> getTickerSymbolsByPortfolioId(@PathVariable Long id) {
        return tickerSymbolsRepository.findByPortfolioId(id);
    }

    // Add a new ticker symbol to a portfolio
    @PostMapping
    public TickerSymbols addTickerSymbol(@RequestBody TickerSymbolRequest request) {
        Portfolio portfolio = portfolioRepository.findById(request.portfolioId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Portfolio not found"));

        TickerSymbols tickerSymbol = new TickerSymbols();
        tickerSymbol.setSymbol(request.symbol);
        tickerSymbol.setPortfolio(portfolio);

        return tickerSymbolsRepository.save(tickerSymbol);
    }

    // Delete a ticker symbol by its ID
    @DeleteMapping("/{id}")
    public void deleteTickerSymbol(@PathVariable Long id) {
        tickerSymbolsRepository.deleteById(id);
    }
}
