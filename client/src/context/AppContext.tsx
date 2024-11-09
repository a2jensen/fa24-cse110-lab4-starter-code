import React, { createContext, useState } from "react";
import { Expense, Budget } from "../types/types";

// Exercise: Create add budget to the context

interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budget: Budget;
  setBudget: React.Dispatch<React.SetStateAction<Budget>>

}

const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => {},
  budget: { id: '1', total: 10000},
  setBudget: () => {}
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [budget, setBudget] = useState<Budget>(initialState.budget)

  return (
    <AppContext.Provider
      value={{
        expenses: expenses,
        setExpenses: setExpenses,
        budget: budget,
        setBudget: setBudget,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
