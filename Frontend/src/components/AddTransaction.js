import React, { useState, useContext } from 'react'
import { GlobalContext } from '../components/context/GlobalState';  

export const AddTransaction = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');

    const { addTransaction } = useContext(GlobalContext);

    const housingCategories = [
        'Mortgage',
        'Rent',
        'Home Insurance',
        'Property Tax',
        'HOA',
        'Home Maintenance',
        'Home Improvement',
        'Home Security'
    ];

    const onSubmit = e => {
        e.preventDefault();

        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            text,
            amount: +amount,
            category
        }

        addTransaction(newTransaction);

        setText('');
        setAmount(0);
        setCategory('');
    }

    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="category">Category</label>
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-select"
                    >
                        <option value="">Select category...</option>
                        {housingCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount <br />(negative - expense, positive - income)</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}