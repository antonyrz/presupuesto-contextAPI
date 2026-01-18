import { v4 as uuidv4} from 'uuid';
import type { DraftExpense, Expense } from "../types";

export type BudgetActions = 
    {type: 'add-budget', payload: {budget: number}} |
    {type: 'show-modal'} |
    {type: 'close-modal'} |
    {type: 'add-expense', payload: {expense: DraftExpense}} |
    {type: 'remove-expense', payload: {id: Expense['id']}} |
    {type: 'get-expense-by-id', payload: {id: Expense['id']}} |
    {type: 'update-expense', payload: {expense: Expense}}

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[]
    editingId: Expense['id']
};

export const initialState : BudgetState = {
    budget: 0,
    modal: false,
    expenses: [],
    editingId: ''
}

const createExpense = (DraftExpense : DraftExpense) : Expense => {
   
    return {
        ...DraftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {


    if(action.type === 'add-budget'){

        const budget = action.payload.budget;

        return{
            ...state,
            budget
        }
    }

    if(action.type === 'show-modal'){
        return{
            ...state,
            modal: true
        }
    }

    if(action.type === 'close-modal'){
        return{
            ...state,
            modal: false,
            editingId: ''

        }
    }

    if(action.type === 'add-expense'){

        const newExpense = action.payload.expense;

        const expenseWithId = createExpense(newExpense);

        return{
            ...state,
            expenses: [...state.expenses, expenseWithId]
        }
    }

    if(action.type === 'remove-expense'){

        const idExpenseRemoved = action.payload.id;

        return{
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== idExpenseRemoved)
        }
    }

    if(action.type === 'get-expense-by-id'){
        
        const id = action.payload.id;

        return{
            ...state,
            editingId: id,
            modal: true
        }
    }

    if(action.type === 'update-expense'){

        const expenseUpdated = action.payload.expense;

        return{
            ...state,
            expenses: state.expenses.map( expense => {

                if(expense.id === expenseUpdated.id){
                    return expenseUpdated
                }else{
                    return expense
                }
            }),
            editingId: '',
            modal: false,
        }
        
    }

    return state
};