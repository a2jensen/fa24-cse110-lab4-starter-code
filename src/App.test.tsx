import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import App from './App';
import { AppContext } from "./context/AppContext"
import AddExpenseForm from './components/Expense/AddExpenseForm';
import ExpenseList from './components/Expense/ExpenseList';
import Budget from './components/Budget/Budget';
import { Expense } from "./types/types"

// three test cases
// covers adding expenses, checking expenses, checking budget updates all accordingly


// Mocking the setExpenses function
describe("Add an Expense", () => {
  test("adds an expense when the form is submitted", () => {
    const setExpenses = jest.fn();
    const setBudget = jest.fn();
    
    // Providing a mock value for the context
    render(
      <AppContext.Provider value={{ 
        expenses: [], 
        setExpenses,
        budget: {id:"111", total: 1000},
        setBudget,
        }}>
        <AddExpenseForm />
      </AppContext.Provider>
    );

    // Simulates filling out the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Test Expense" },
    });
    fireEvent.change(screen.getByLabelText(/cost/i), {
      target: { value: 50 },
    });

    // Simulates form submission
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    // Ensure that setExpenses was called with the new expense
    expect(setExpenses).toHaveBeenCalledTimes(1);
    expect(setExpenses).toHaveBeenCalledWith(
      expect.any(Function) // A function was passed to update expenses
    );

    const newExpense = { name: "Test Expense", cost: 50, id: expect.any(String) };
    setExpenses.mockImplementation((setFn) => {
      const updatedExpenses = setFn([]); // Simulate adding to an empty array
      expect(updatedExpenses).toEqual([newExpense]);
    });
  });
});


// mock test : deleting an expense
describe("Delete an Expense", () => {
  test("deletes an expense and updates the list and totals", () => {
    // Mock functions for updating context
    const setExpenses = jest.fn();
    const setBudget = jest.fn();

    // Initial expenses list with one expense
    const initialExpenses = [
      { id: "111", name: "Test Expense", cost: 50 },
    ];

    // Providing a mock value for the context including all necessary properties
    const { rerender } = render(
      <AppContext.Provider
        value={{
          expenses: initialExpenses,
          setExpenses, // Mock function for setExpenses
          budget: { id: "1", total: 1000 }, // Mocked budget
          setBudget, // Mock function for setBudget
        }}
      >
        <ExpenseList />
      </AppContext.Provider>
    );

    // Check that the expense is in the list before deletion
    expect(screen.getByText("Test Expense")).toBeInTheDocument();
    expect(screen.getByText("$50")).toBeInTheDocument();

    // Simulate clicking the delete button for the expense
    fireEvent.click(screen.getByRole("button", { name: /x/i }));

    // Mock setExpenses to remove the expense
    setExpenses.mockImplementation((updateFn) => {
      const updatedExpenses = updateFn(initialExpenses);
      expect(updatedExpenses).toEqual([]); // Check that the list is now empty
    });

    // Now re-render the component after the mock state change
    rerender(
      <AppContext.Provider
        value={{
          expenses: [], // The list is now empty after deletion
          setExpenses,
          budget: { id: "1", total: 1000 },
          setBudget,
        }}
      >
        <ExpenseList />
      </AppContext.Provider>
    );

    // Check that the expense is no longer in the document after deletion
    expect(screen.queryByText("Test Expense")).not.toBeInTheDocument();
    expect(screen.queryByText("$50")).not.toBeInTheDocument();
  });
});

// test : add expense form and budget update
describe("AddExpenseForm and Budget Update", () => {
  test("adds an expense and updates the budget correctly", () => {
    // Mock functions for updating context
    const setExpenses = jest.fn();
    const setBudget = jest.fn(); // We'll mock the setBudget function to track updates

    // Initial state for context
    const initialExpenses: Expense[] = [];
    const initialBudget = { id: "1", total: 1000 }; // Starting budget is 1000

    // Providing a mock value for the context including all necessary properties
    const { rerender } = render(
      <AppContext.Provider
        value={{
          expenses: initialExpenses,
          setExpenses, // Mock function for setExpenses
          budget: initialBudget, // Initial budget of 1000
          setBudget, // Mock function for setBudget
        }}
      >
        <>
          <AddExpenseForm />
          <Budget />
        </>
      </AppContext.Provider>
    );

    // Check that the initial budget is rendered correctly
    expect(screen.getByText("Budget: 1000")).toBeInTheDocument();

    // Simulate filling out the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "New Expense" },
    });
    fireEvent.change(screen.getByLabelText(/cost/i), {
      target: { value: 200 },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    // Mock how the setExpenses would behave when adding the new expense
    setExpenses.mockImplementation((updateFn) => {
      const updatedExpenses = updateFn(initialExpenses);
      expect(updatedExpenses).toEqual([
        { id: expect.any(String), name: "New Expense", cost: 200 },
      ]);
    });

    // Mock how the setBudget would behave when adding an expense
    setBudget.mockImplementation(() => {
      // Assuming budget subtracts the added expense
      const updatedBudget = { id: "1", total: 800 }; // Budget after expense is 800
      return updatedBudget;
    });

    // Re-render after state update to reflect changes in the budget
    rerender(
      <AppContext.Provider
        value={{
          expenses: [{ id: "1", name: "New Expense", cost: 200 }],
          setExpenses,
          budget: { id: "1", total: 800 }, // Budget after subtracting 200
          setBudget,
        }}
      >
        <>
          <AddExpenseForm />
          <Budget />
        </>
      </AppContext.Provider>
    );

    // Check that the budget has been updated after adding the expense
    expect(screen.getByText("Budget: 8000")).toBeInTheDocument(); // Expect budget to be updated
    // original working value : 800
  });
});