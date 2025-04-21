// src/components/TransactionList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionList = ({ address }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'GZCM5RVNTSIXDE62SPQ9V79Z94BPKXAMEX'; // Replace with your API Key
  const baseURL = `https://api-sepolia.etherscan.io/api`;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(baseURL, {
          params: {
            module: 'account',
            action: 'txlist',
            address: address,
            startblock: 0,
            endblock: 99999999,
            sort: 'desc',
            apikey: API_KEY,
          },
        });

        if (response.data.status === '1') {
          setTransactions(response.data.result);
        } else {
          console.error('Error fetching transactions:', response.data.message);
        }
      } catch (error) {
        console.error('API Error:', error);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, [address]);

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  return (
    <div>
      <h2>Transactions for {address}</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((tx) => (
            <li key={tx.hash}>
              <p>Hash: <a href={`https://sepolia.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">{tx.hash}</a></p>
              <p>From: {tx.from}</p>
              <p>To: {tx.to}</p>
              <p>Value: {tx.value / 1e18} ETH</p>
              <p>Time: {new Date(tx.timeStamp * 1000).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
