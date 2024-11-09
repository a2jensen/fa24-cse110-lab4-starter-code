# Test Cases for Lab 4

## Test: Add Expense Form
### Description of test
This test checks if a new expense can be added via the form and ensures that the expense is added to the list of expenses.

### Steps
1. Render `AddExpenseForm` and `ExpenseList` components.
2. Simulate filling out the form fields for a new expense.
3. Submit the form action
4. Check that the new expense is added to the list.
5. Verify that the `setExpenses` function is called correctly with the updated expense.

---

## Test: Delete an Expense
### Description of test
This test verifies that an expense is successfully removed from the list and that the expense list is updated correctly after deletion.

### Steps
1. Render the `ExpenseList` with an initial list of expenses.
2. Simulate clicking the delete button for an existing expense.
3. Ensure that the `setExpenses` function is called with the correct updated list
4. Verify that the deleted expense is no longer in the list.

---

## Test: Update Budget After Adding Expense
### Description of test
This test ensures that when an expense is added, the budget is updated correctly, reflecting the new remaining amount.

### Steps
1. Render the `AddExpenseForm` and `Budget` components.
2. Simulate adding a new expense.
3. Verify that the budget decreases by the cost of the new expense.
4. Ensure that the budget displayed in the `Budget` component reflects the updated total within.

---
