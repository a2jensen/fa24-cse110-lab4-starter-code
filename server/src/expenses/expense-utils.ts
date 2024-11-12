import { Expense } from "../types";
import { Request, Response } from "express";
import { Database } from "sqlite";

export async function createExpenseServer(req: Request, res: Response, db: Database) {
    try {
        // Type casting the request body to the expected format.
        const { id, cost, description } = req.body as { id: string, cost: number, description: string };
 
        if (!description || !id || !cost) {
            return res.status(400).send({ error: "Missing required fields" });
        }
 
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
        res.status(201).send({ id, description, cost });
 
    } catch (error) {
 
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 
 }
 

export async function deleteExpense(req: Request, res: Response, db : Database) {
   try {
        // Type casting the request body to the expected format.
        const { id  } = req.params;
        if (!id ) {
            return res.status(400).send({error : "Missing required fields" });
        }

        const findExpense = await db.get('SELECT description FROM expenses WHERE id=? ', [id])

        if (!findExpense) {
            return res.status(400).send({error: "Could not find the expense"})
        }

        const deleteAction = await db.run('DELETE FROM expenses where id = ?', [id])
        if (deleteAction.changes === 0) {
            return res.status(400).send({error: "Failed delete action for the specified expense"})
        }

        return res.status(200).send({message: 'Expense deleted : ', id})

   } catch (error : any) {
        return res.status(500).send({error: `Expenses could not be deleted, + ${error}`})
   }
}

export async function getExpenses(req: Request, res: Response, db : Database) {
    try {
        const expenses = await db.all("SELECT * FROM expenses"); // execute SELECT query to fetch all expenses

        // send fetched expenses to the client
        res.status(200).send({expenses})
    } catch (error : any) {
        return res.status(500).send({ error: `Expenses could not be fetched, + ${error}` });
    }
}

