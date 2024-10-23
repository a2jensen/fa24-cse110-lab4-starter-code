import React, { useState , useContext} from "react";
import { AppContext } from "../../context/AppContext";
const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses} = useContext(AppContext)

  // Exercise: Create name and cost to state variables
  let [name, setName] = useState<string>("")
  let [cost, setCost] = useState<string | number>("");

  // onChange function, creates an event object containing name and value, then updates it on either cost/name getting edited
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // creating object => name is cost, name, value => updated version
    const {name, value} = event.target;

    if (name === 'name'){
      setName(value); // update the 'name' state
    } else if (name === "cost") {
      let updatedValue = Number(value)
      setCost(updatedValue) // update the 'cost' state
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

     // ensures that cost is a number
    let expenseCost = 0
    if (cost !== "") {
      expenseCost = Number(cost)
    }

    // creates a new expense object
    const newExpense = {
      id: Math.random().toString(36).substr(2,9),
      name: name,
      cost: expenseCost
    }
    
    // add new expense to the existing expenses array
    // prevExpenses = expenses
    // ...prevExpenses, creating a copy of expenses
    // updates it by adding newExpense
    setExpenses((prevExpenses) => [...prevExpenses, newExpense])

    // clears the form fields
    setName("")
    setCost("")
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            className="form-control"
            id="cost"
            name="cost"
            value={cost}
            onChange={onChange}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
