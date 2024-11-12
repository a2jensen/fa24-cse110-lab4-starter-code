import { API_BASE_URL } from "./../constants/constants"
import { Expense } from "../types/types";

// Function to create an expense in the backend. Method: POST
export const createExpense = async (expense: Expense): Promise<Expense> => {
	const response = await fetch(`${API_BASE_URL}/expenses`, {
    	method: "POST",
    	headers: {
        	"Content-Type": "application/json",
    	},
    	body: JSON.stringify(expense),
	});
	if (!response.ok) {
    	throw new Error("Failed to create expense");
	}
	return response.json();
};

// Function to delete an expense in the backend. Method: DELETE
export const deleteExpense = async (id: string): Promise<void> => {
    console.log(`attempting to delete expense with ID ${id}`)
	const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    	method: "DELETE",
	});
	if (!response.ok) {
        const errorData = await response.json();
    	console.error("Failed to delete expense", errorData);
        throw new Error("Failed to delete expense")
	}
    console.log("expense successfully deleted....")
};

// Function to get all expenses from the backend. Method: GET
export const fetchExpenses = async (): Promise<Expense[]> => {
	const response = await fetch(`${API_BASE_URL}/expenses`, {
		method : 'GET'
	});
	if (!response.ok) {
    	throw new Error('Failed to fetch expenses');
	}

	// Parsing the response to get the data
	let expenseList = response.json().then((jsonResponse) => {
    	console.log("data in fetchExpenses", jsonResponse);
    	return jsonResponse.data;
	});

	console.log("response in fetchExpenses", expenseList);
	return expenseList;
};