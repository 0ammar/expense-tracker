import { useState, useEffect, useCallback } from "react";
import { Budget, BudgetWithStats, CreateBudgetDto } from "@/types/budget.types";

export const useBudgets = (isArchived: boolean = false) => {
  const [budgets, setBudgets] = useState<BudgetWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBudgets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/budgets?archived=${isArchived}`);
      if (!response.ok) throw new Error("Failed to fetch budgets");
      const data = await response.json();
      setBudgets(data.budgets || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [isArchived]);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const createBudget = async (data: CreateBudgetDto): Promise<Budget | null> => {
    try {
      const response = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        let errorMessage = "Failed to create budget";
        try {
          const errorData = await response.json();
          if (errorData?.error) errorMessage = errorData.error;
        } catch {
          // ignore
        }
        throw new Error(errorMessage);
      }
      const newBudget = await response.json();
      await fetchBudgets();
      return newBudget.budget || null;
    } catch (err) {
      console.error("[useBudgets] Error creating budget:", err);
      throw err;
    }
  };

  const updateBudget = async (data: { id: string; name?: string }): Promise<Budget | null> => {
    try {
      const body: { name?: string } = {};
      if (data.name !== undefined) body.name = data.name;

      const response = await fetch(`/api/budgets/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        let errorMessage = "Failed to update budget";
        try {
          const errorData = await response.json();
          if (errorData?.error) errorMessage = errorData.error;
        } catch {
          // ignore
        }
        throw new Error(errorMessage);
      }
      const updatedBudget = await response.json();
      await fetchBudgets();
      return updatedBudget.budget || null;
    } catch (err) {
      console.error("[useBudgets] Error updating budget:", err);
      throw err;
    }
  };

  const deleteBudget = async (budgetId: string): Promise<void> => {
    try {
      const response = await fetch(`/api/budgets/${budgetId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete budget");
      await fetchBudgets();
    } catch (err) {
      console.error("[useBudgets] Error deleting budget:", err);
      throw err;
    }
  };

  const archiveBudget = async (budgetId: string, archive: boolean): Promise<void> => {
    try {
      const response = await fetch(`/api/budgets/${budgetId}/archive`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isArchived: archive }),
      });
      if (!response.ok) throw new Error("Failed to archive budget");
      await fetchBudgets();
    } catch (err) {
      console.error("[useBudgets] Error archiving budget:", err);
      throw err;
    }
  };

  return {
    budgets,
    loading,
    error,
    refetch: fetchBudgets,
    createBudget,
    updateBudget,
    deleteBudget,
    archiveBudget,
  };
};