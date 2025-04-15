package com.example.backend;

import jakarta.persistence.*;

@Entity
public class TickerSymbols {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String symbol;

    @ManyToOne
    @JoinColumn(name = "portfolio_id", nullable = false)
    private Portfolio portfolio;

    // Getters
    public Long getId() {
        return id;
    }

    public String getSymbol() {
        return symbol;
    }

    public Portfolio getPortfolio() {
        return portfolio;
    }

    // Setters
    public void setId(long id) {
        this.id = id;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }

}
