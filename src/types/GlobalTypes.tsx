export interface PortfolioT {
    id: number;
    name: string;
}

export interface TickerSymbolT {
    id: number;
    symbol: string;
    portfolioId: number;
}