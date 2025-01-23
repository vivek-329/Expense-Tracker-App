import React, { useContext, useEffect } from 'react';
import { Transaction } from './Transaction';


import { GlobalContext } from '../components/context/GlobalState';  


export const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);
function getTransactions() { 
  
    // Define the function logic here
}
  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <>
        <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (<Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};

