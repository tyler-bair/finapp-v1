import axios from "axios";
import { PortfolioT } from "../types/GlobalTypes";

const BASE_URL = 'http://localhost:8080/api/portfolios';

export const getPortfolios = async (): Promise<PortfolioT[]> => {
    try {
        const response = await axios.get<PortfolioT[]>(BASE_URL);
        return response.data;
    } catch (e) {
        console.log("Error fetching portfolio: ", e);
        throw e;
    }
}

export const addPortfolio = async (name: string): Promise<PortfolioT | 409> => {
    try {
        const newPortfolio = { name: name.toUpperCase() };
        const response = await axios.post<PortfolioT>(BASE_URL, newPortfolio);
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

export const deletePortfolio =  async (id: number): Promise<void> => {
    try {
        await axios.delete(BASE_URL + `/${id}`);
    } catch (e) {
        console.log("Error deleting portfolio: ", e);
        throw e;
    }
}