import { v4 as uuidv4} from 'uuid';
import type { DraftExpense, Expense } from "../types";



export type BudgetActions = 
    { type: 'add-budget', payload: {budget: number}} |
    {type: 'show-modal'} |
    {type: 'close-modal'} |
    {type: 'add-expense', payload: {expense: DraftExpense}}


export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[]
};

export const initialState : BudgetState = {
    budget: 0,
    modal: false,
    expenses: []
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
            modal: false
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

    return state
};