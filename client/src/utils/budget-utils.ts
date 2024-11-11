import { API_BASE_URL } from "./../constants/constants"
import { Budget } from "../types/types";

// function to get budget from the backend. Method : GET
export const fetchBudget = async () : Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`);
    if (!response.ok) {
        throw new Error("failted to fetch budget");
    }

    const jsonResponse = await response.json();
    console.log('data in fetchbBudget client function', jsonResponse)
    return jsonResponse.data // return budget number
}