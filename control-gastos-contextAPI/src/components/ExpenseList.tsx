import { useBudget } from "../hooks/useBudget"
import { useMemo } from "react";
import type { Expense } from "../types";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {

    const { state } = useBudget();

    const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);

    return (
        <div className="mt-10">
            {isEmpty ? <p className="text-center uppercase font-bold text-2xl text-gray-600">No hay Gastos</p> : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
                    {state.expenses.map((expense : Expense) => (
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
