import { Expense } from "../../types/types";
import React, {useContext} from 'react';
import { AppContext } from "../../context/AppContext";
import { deleteExpense } from "../../utils/expense-utils";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const {expenses, setExpenses} = useContext(AppContext)


  const handleDeleteExpense = async (currentExpense: Expense) => {
    // Remove the expense by filtering out the one with matching ID (on the UI side)
    console.log('starting delete expense function')
    const idDelete = currentExpense.id
    setExpenses((prevExpenses) => prevExpenses.filter(item => item.id !== idDelete))
    console.log('got through setExpenses line')
    // function call to delete expense server side
    try {
      console.log('about to request a delete in backend')
      await deleteExpense(idDelete);
      console.log('delete expense went through')
    } catch(error) {
      console.error("Failed to delete expense", error);
    } 
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.description}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
