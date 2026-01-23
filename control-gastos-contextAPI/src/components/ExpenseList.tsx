import { useBudget } from "../hooks/useBudget"
import { useMemo } from "react";
import type { Expense } from "../types";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {

    const { state } = useBudget();

    const filteredExpense = state.currentCategory ? state.expenses.filter(expense => state.currentCategory === expense.category) : state.expenses;
    
    const isEmpty = useMemo(() => filteredExpense.length === 0, [filteredExpense]);

    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
            {isEmpty ? <p className="text-center uppercase font-bold text-2xl text-gray-600">No hay Gastos</p> : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
                    {filteredExpense.map((expense : Expense) => (
                        <ExpenseDetail 
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                </>
            )}
        </div>
    )
}
