import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext'  
import Budget from './Budget';
import { updatedBudget } from '../../utils/budget-utils';

const EditBudget = () => {
    // consuming budget from app context
    const { budget, setBudget } = useContext(AppContext)

    // state of budget within the component
    let [ budgetTotal, setBudgetTotal] = useState<number>(budget.total);

    // on change function
    const onChange = (budgetChange: React.ChangeEvent<HTMLInputElement>) => {
        // creating object
        const {name, value} = budgetChange.target

        setBudgetTotal(Number(value))
    }

    // on submit function
    const onSubmit = async (budgetConfirm : React.FormEvent<HTMLFormElement>) => {
        budgetConfirm.preventDefault(); // prevent form reload

        // creates new budget
        const newBudget = {
            id: Math.random().toString(36).substr(2,9),
            total: budgetTotal
        }
        // update it client side
        // replace current expense with updated
        setBudget(newBudget)

        // update state to the new updated budget
        setBudgetTotal(budgetTotal);

        try {
            console.log("about to update budget")
            await updatedBudget(budgetTotal)
        } catch {
            console.error("failed to update budget")
        }

    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <div className='row'>
                <div className="col-sm">
                    <label htmlFor="name">Edit Budget</label>
                    <input
                        required
                        type="number"
                        id="budget"
                        name="budget"
                        value={budgetTotal}
                        onChange={onChange}
                    >
                    </input>
                </div>
                <div className='col-sm'>
                    <button type="submit" className='btn btn-primary mt-3'>
                        Save
                    </button>
                </div>
            </div>
        </form>
    )
}

export default EditBudget;