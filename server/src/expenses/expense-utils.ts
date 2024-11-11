import { Expense } from "../types";
import { Request, Response } from "express";

export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    const { id, cost, description } = req.body;

    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const newExpense: Expense = {
        id: id,
        description,
        cost,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
}

export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
    // TO DO: Implement deleteExpense function
    const { id } = req.params
    console.log("Received ID for deletion FROM BACKEND:", id);  // Check if this logs correctly

    if ( !id ){
        return res.status(400).send({ error: "Missing required fields" });
    }

    const initialLength = expenses.length;
    // filter out specified expense
    const updatedExpenses = expenses.filter(expense => expense.id !== id)

    if (initialLength === updatedExpenses.length) {
        console.log("Error: expense not found")
        return res.status(404).send({error : "Expense not found"})
    } 
    // we want to then update expenses by reference
    expenses.length = 0
    expenses.push(...updatedExpenses)
    return res.status(200).send({message : 'Expense succesfully deleted', expenses})
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}