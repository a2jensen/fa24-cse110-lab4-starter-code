import { API_BASE_URL } from "./../constants/constants"
import { Budget } from "../types/types";

// function to get budget from the backend. Method : GET
export const fetchBudget = async () : Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json"
        },
    });
    if (!response.ok) {
        throw new Error("failted to fetch budget");
    }

    const jsonResponse = await response.json();
    console.log('data in fetchbBudget client function', jsonResponse)
    return jsonResponse.data // return budget number
}

export const updatedBudget = async (budget: number) : Promise<number> => {
    console.log ("current amount before update", budget )
    const response = await fetch(`${API_BASE_URL}/budget`, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({amount : budget}) // send budget in req body
    })
    if (!response.ok) {
        throw new Error("failted to update budget")
    }

    const updatedBudget = await response.json();
    console.log("new budget", updatedBudget)

    return updatedBudget.data // return updated budget amount
};