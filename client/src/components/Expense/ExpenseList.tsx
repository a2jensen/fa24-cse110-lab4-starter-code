import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import { Expense } from "../../types/types";
import { loadavg } from "os";
import { fetchExpenses } from "../../utils/expense-utils";

const ExpenseList = () => {
  const { expenses, setExpenses } = useContext(AppContext);

  console.log("use effect on ExpenseList abt to happen")
  useEffect (() => {
    console.log("within use effect, about to call loadExpenses")
    loadExpenses();
  }, [])
  console.log('LOADED EXPENSES CALLED', expenses)

  // function to load expenses and handle errors
  const loadExpenses = async () => {
    try {
      const expenseList = await fetchExpenses();
      setExpenses(expenseList);
    } catch (err : any ) {
      console.log(err.message)
    }
  }
  return (
    <ul className="list-group">
      {expenses.map((expense: Expense) => (
        <ExpenseItem 
          id={expense.id} 
          description={expense.description} 
          cost={expense.cost} 
        />
      ))}
    </ul>
  );
};

export default ExpenseList;
