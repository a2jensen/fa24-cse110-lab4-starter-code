import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
const Budget = () => {
  const { budget, setBudget  } = useContext(AppContext);

  // update budget

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>Budget: {budget.total}</div>
    </div>
  );
};

export default Budget;
