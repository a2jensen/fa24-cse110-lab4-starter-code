import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses, budget, setBudget } = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const alertType = totalExpenses > budget.total ? "alert-danger" : "alert-success";

  // Exercise: Create an alert when Remaining is less than 0.
  const sendAlert = () => {
    if (budget.total - totalExpenses < 0) {
      window.alert("Warning you have exceeded your budget....")
    }

    // run alert check after calculating 
  }
  // runs alert check after calculating the total exepnses
  useEffect(() => {
    sendAlert()
  }, [totalExpenses])// useEffect runs whenever totalExpenses changes..

  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${budget.total - totalExpenses}</span>
    </div>
  );
};

export default Remaining;
