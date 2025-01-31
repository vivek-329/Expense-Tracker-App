import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../components/context/GlobalState";

const AddTransaction = () => { // Ensure function is defined before export
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { addTransaction } = useContext(GlobalContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/v1/transactions"); // Try changing port
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Fetched categories:", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };
  
    fetchCategories();
  }, []);
  
  const onSubmit = (e) => {
    e.preventDefault();

    if (!text || !amount) {
      alert("Please provide valid text and amount");
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
      category: selectedCategory || "Uncategorized",
    };

    addTransaction(newTransaction);

    setText("");
    setAmount(0);
    setSelectedCategory("");
  };

  return (
    <>
      <h3>Add New Transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount (negative - expense, positive - income)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="" disabled>Select a category</option>
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category._id} value={category.name}>{category.name}</option>
              ))
            ) : (
              <>
                <option> Bank Loan </option>
                <option> Home Loan </option>
                <option> Car Loan </option>
                <option> Personal Loan </option>
                <option> Education Loan </option>
              </>
            )}
          </select>
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};

export default AddTransaction; // Ensure this comes after the function declaration
