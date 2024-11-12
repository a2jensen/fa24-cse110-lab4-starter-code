import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {

    // get new budget amount from body and update current budge amount
    const newBudget = body.amount
    budget.amount = newBudget

    // send updated budget as reponse to client side
    res.status(200).send({"data": newBudget})

}
