import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [email, setEmail] = useState(() => window.sessionStorage.getItem('email'));
  const [userTickets, setUserTickets] = useState([]);
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/Home');
  };

  const fetchUserTickets = async () => {
    try {
      const response = await fetch('http://localhost:3080/get-user-tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const { tickets } = await response.json();
        setUserTickets(tickets);
      } else {
        console.error('Failed to fetch user tickets');
      }
    } catch (error) {
      console.error('Error fetching user tickets', error);
    }
  };

  // email is set at the beginning so useEffect immediately runs and fetches the user's tickets lists them.
  useEffect(() => {
    fetchUserTickets();
  }, [email]);
  //iterates over userTickets and creates a list item for each number and type
  const myList = userTickets.map((item, index) => (
    <li>{item.type} {item.number}: Not a Winning Number</li>
  ));

  return (
    <div>
      <div className="topnav">
        <div className="homeRoute">
          <button className="button" onClick={goHome}>
            Home
          </button>
        </div>
      </div>

      <h1>Order History</h1>

      <div className="order-history">
        <h2>Your Lottery Tickets:</h2>
        <ul>{myList}</ul>
      </div>
    </div>
  );
};

export default OrderHistory;
