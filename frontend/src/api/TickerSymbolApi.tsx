import axios from "axios";
import { TickerSymbolT } from "../types/GlobalTypes";

const BASE_URL = 'http://localhost:8080/api/tickerSymbols'

export const getTickerSymbols = async (portfolioId: number): Promise<TickerSymbolT[]> => {
    try {
        const response = await axios.get<TickerSymbolT[]>(BASE_URL + `/portfolio/${portfolioId}`);
        return response.data;
    } catch (e) {
        console.log("Error fetching portfolios: ", e);
        throw e;
    }
}

export const addTickerSymbol = async (symbol: string, portfolioId: number): Promise<TickerSymbolT | 409> => {
    try {
        const newTicker = {
            symbol: symbol.toUpperCase(),
            portfolioId,
        };
        const response = await axios.post<TickerSymbolT>(BASE_URL, newTicker);
        return response.data;
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 409) {
                return 409;
            }
        }        
        throw e;
    }
}

export const deleteTickerSymbol = async (id: number): Promise<void> => {
    try {
        await axios.delete(BASE_URL + `/${id}`);
    } catch (e) {
        console.log("Error deleting ticker symbol: ", e);
        throw e;
    }
}
