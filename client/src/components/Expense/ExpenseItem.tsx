import { Expense } from "../../types/types";
import React, {useContext} from 'react';
import { AppContext } from "../../context/AppContext";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const {expenses, setExpenses} = useContext(AppContext)


  const handleDeleteExpense = (currentExpense: Expense) => {
    // Remove the expense by filtering out the one with matching ID
    const idDelete = currentExpense.id
    setExpenses((prevExpenses) => prevExpenses.filter(item => item.id !== idDelete))
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.name}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
