import { useState } from "react";
import { formatDate } from "../utils/formatDate ";
import BalanceSummary from "./BalanceSummary";
import ExpenseForm from "./ExpenseForm";
import ExpenseSummary from "./ExpenseSummary";
import IncomeSummary from "./IncomeSummary";

const ExpenseContainer = () => {
  const [transactionType, setTransactionType] = useState("Expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [incomeSortType, setIncomeSortType] = useState("");
  const [expenseSortType, setExpenseSortType] = useState("");
  const [incomeFilterCategories, setIncomeFilterCategories] = useState([]);
  const [expenseFilterCategories, setExpenseFilterCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleTransactionTypeChange = (type) => {
    setTransactionType(type);
    setCategory(""); // Reset the category when changing transaction type
  };

  const handleSave = (e) => {
    e.preventDefault();
    const amountValue = parseFloat(amount);

    if (isNaN(amountValue) || amountValue <= 0) return;

    const transaction = {
      id: editingId || crypto.randomUUID(),
      category,
      amount: amountValue,
      date: formatDate(date),
      rawDate: date,
    };

    if (transactionType === "Income") {
      if (editingId) {
        // Update existing income transaction
        const updatedList = incomeList.map((item) =>
          item.id === editingId ? transaction : item
        );
        const oldAmount = incomeList.find(
          (item) => item.id === editingId
        ).amount;
        setTotalIncome((prev) => prev - oldAmount + amountValue);
        setBalance((prev) => prev - oldAmount + amountValue);
        setIncomeList(updatedList);
      } else {
        // Add new income transaction
        setTotalIncome((prev) => prev + amountValue);
        setBalance((prev) => prev + amountValue);
        setIncomeList((prev) => [...prev, transaction]);
      }
    } else {
      if (editingId) {
        // Update existing expense transaction
        const updatedList = expenseList.map((item) =>
          item.id === editingId ? transaction : item
        );
        const oldAmount = expenseList.find(
          (item) => item.id === editingId
        ).amount;
        setTotalExpense((prev) => prev - oldAmount + amountValue);
        setBalance((prev) => prev + oldAmount - amountValue);
        setExpenseList(updatedList);
      } else {
        // Add new expense transaction
        setTotalExpense((prev) => prev + amountValue);
        setBalance((prev) => prev - amountValue);
        setExpenseList((prev) => [...prev, transaction]);
      }
    }

    // Reset form and editing state
    setEditingId(null);
    setAmount("");
    setCategory("");
    setDate("");
  };

  const handleIncomeSort = (sortType) => {
    setIncomeSortType(sortType);
    setIncomeList((prev) =>
      [...prev].sort((a, b) =>
        sortType === "High to Low" ? b.amount - a.amount : a.amount - b.amount
      )
    );
  };

  const handleExpenseSort = (sortType) => {
    setExpenseSortType(sortType);
    setExpenseList((prev) =>
      [...prev].sort((a, b) =>
        sortType === "High to Low" ? b.amount - a.amount : a.amount - b.amount
      )
    );
  };

  const handleIncomeFilter = (selectedCategories) => {
    setIncomeFilterCategories(selectedCategories);
  };

  const handleExpenseFilter = (selectedCategories) => {
    setExpenseFilterCategories(selectedCategories);
  };

  const filteredIncomeList = incomeFilterCategories.length
    ? incomeList.filter((item) =>
        incomeFilterCategories.includes(item.category)
      )
    : incomeList;

  const filteredExpenseList = expenseFilterCategories.length
    ? expenseList.filter((item) =>
        expenseFilterCategories.includes(item.category)
      )
    : expenseList;

  // Handle Edit
  const handleEdit = (transaction, type) => {
    setTransactionType(type);
    setCategory(transaction.category);
    setAmount(transaction.amount.toString());
    setDate(transaction.rawDate);
    setEditingId(transaction.id);
  };

  // Handle Delete
  const handleDelete = (transaction, type) => {
    const amountValue = transaction.amount;

    if (type === "Income") {
      setTotalIncome((prev) => prev - amountValue);
      setBalance((prev) => prev - amountValue);
      setIncomeList((prev) =>
        prev.filter((item) => item.id !== transaction.id)
      );
    } else {
      setTotalExpense((prev) => prev - amountValue);
      setBalance((prev) => prev + amountValue);
      setExpenseList((prev) =>
        prev.filter((item) => item.id !== transaction.id)
      );
    }
  };

  const categories =
    transactionType === "Income"
      ? ["Salary", "Outsourcing", "Bond", "Dividend"]
      : [
          "Education",
          "Food",
          "Health",
          "Bill",
          "Insurance",
          "Tax",
          "Transport",
          "Telephone",
        ];

  return (
    <main className="relative mx-auto mt-10 w-full max-w-7xl">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ExpenseForm
          transactionType={transactionType}
          handleTransactionTypeChange={handleTransactionTypeChange}
          category={category}
          setCategory={setCategory}
          amount={amount}
          setAmount={setAmount}
          date={date}
          setDate={setDate}
          categories={categories}
          handleSave={handleSave}
        />

        <div className="lg:col-span-2">
          <BalanceSummary
            balance={balance}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            <IncomeSummary
              incomeList={filteredIncomeList}
              onSort={handleIncomeSort}
              onFilter={handleIncomeFilter}
              sortType={incomeSortType}
              onEdit={(transaction) => handleEdit(transaction, "Income")}
              onDelete={(transaction) => handleDelete(transaction, "Income")}
            />
            <ExpenseSummary
              expenseList={filteredExpenseList}
              onSort={handleExpenseSort}
              onFilter={handleExpenseFilter}
              sortType={expenseSortType}
              onEdit={(transaction) => handleEdit(transaction, "Expense")}
              onDelete={(transaction) => handleDelete(transaction, "Expense")}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ExpenseContainer;
