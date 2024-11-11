import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import { fetchBudget } from "../../utils/budget-utils";

const BudgetComponent = () => {
  const { budget, setBudget  } = useContext(AppContext);

  // fetch budget on component mount
  useEffect (() => {
    console.log('useEffect activated')
    loadBudget();
  }, [])

  // function to load budget and handle any errors
  const loadBudget = async () => {
    try {
      console.log("about to fetch budget")
      const budget = await fetchBudget();
      setBudget({total : budget});
      console.log("setBudget", budget)
    } catch ( err: any){
      console.log(err.message)
    }
  }

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>Budget: {budget.total}</div>
    </div>
  );
};

export default BudgetComponent;
