import React, { useState, useEffect } from "react"; 
import './style.css';
import { useNavigate } from "react-router-dom";

const ManageTickets = () => {
  const navigate = useNavigate();
  const [ticketName,setTicketName] = useState("")
  const [ticketNum, setTicketNum] = useState(0)
  //gets email that was passed in the previous page. Used to identify which user data is added to in database.
  const [email,setEmail] = useState(() => {return window.sessionStorage.getItem('email')});
  const goHome = () => {
    navigate("/Home");
  }
  const purchaseTicket = async () => {
    try {
      const userEmail = email; 
  
      const response = await fetch("http://localhost:3080/purchase-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "jwt-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          email: userEmail, 
          ticketDetails: {
            type: ticketName,
            number: ticketNum,
          },
        }),
      });
  
      const data = await response.json();
      //Prints result of purchase
      if (response.ok) {
        window.alert(data.message);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error purchasing lottery ticket:", error);
    }
  };
  return (
    <div>
      <div className="topnav">
      <div className="homeRoute">
          <button className="button" onClick={goHome}>
          Home
          </button>
          </div>
      </div>

      <h1>Manage Lottery Tickets</h1>
      <h2>Current Lottery Tickets</h2>
      <h2>Add New Ticket</h2>
        <input type="text" style={{ width: '200px', height: '35px' }}onChange={(event) => setTicketName(event.target.value)}placeholder='Enter a ticket name eg Power Ball '/>
        <input type="number" style={{ width: '200px', height: '35px' }}onChange={(event) => setTicketNum(event.target.value)}placeholder='Enter a 5 digit Ticket Num '/>
        <button className="button" onClick={purchaseTicket}>Add Ticket</button>
    </div>
  );
};

export default ManageTickets;