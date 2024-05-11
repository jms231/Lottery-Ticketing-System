import React, { useState, useEffect } from "react"; 
import './style.css';
import { useNavigate } from "react-router-dom";


const BrowseLotteryTickets = () => {
  const navigate = useNavigate();
  const [ticketName,setTicketName] = useState("")
  const [ticketNum, setTicketNum] = useState(0)
  //gets email that was passed in the previous page. Used to identify which user data is added to in database.
  const [email,setEmail] = useState(() => {return window.sessionStorage.getItem('email')});

  //gens random num
  const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)+ min); 
}; 
//used so that the states stay synced up and the data that is put into database is not incorrect.
useEffect(() => {
  if (ticketName && ticketNum) {
    purchaseTicket(ticketName, ticketNum);
  }
}, [ticketName, ticketNum]);
//navs to homepage
  const goHome = () => {
    navigate("/Home",{ state: email });
  }

  const powerBall = () => {
    //gens random lottery number and sets ticketName as the name of the ticket.
    setTicketNum(randomNumber(11111, 99999));
    setTicketName("Power Ball");
  };

  const megaMillion = () => {
    //gens random lottery number and sets ticketName as the name of the ticket.
    setTicketNum(randomNumber(11111, 99999));
    setTicketName("Mega Millions");
    
  };

  const lottoTexas = () => {
    //gens random lottery number and sets ticketName as the name of the ticket.
    setTicketNum(randomNumber(11111, 99999));
    setTicketName("Lotto Texas");
   
  };

  const texasTwoStep = () => {
    //gens random lottery number and sets ticketName as the name of the ticket.
    setTicketNum(randomNumber(11111, 99999));
    setTicketName("Texas Two Step");
  };
  
  
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

      <h1>Browse Lottery Tickets</h1>

      <div className="ticket-container">
        <div className="ticket">
          <h2>Power Ball</h2>
          <p>Cost: $2</p>
          <p>Drawing Date: Every Wednesday and Saturday</p>
          <button className="button" onClick={powerBall}>
          Buy a ticket</button>
        </div>

        <div className="ticket">
          <h2>Mega Millions</h2>
          <p>Cost: $2</p>
          <p>Drawing Date: Every Tuesday and Friday</p>
          <button className="button" onClick={megaMillion}>Buy Ticket</button>
        </div>

        <div className="ticket">
          <h2>Lotto Texas</h2>
          <p>Cost: $1</p>
          <p>Drawing Date: Every Wednesday and Saturday</p>
          <button className="button" onClick={lottoTexas}>Buy Ticket</button>
        </div>

        <div className="ticket">
          <h2>Texas Two Step</h2>
          <p>Cost: $1.50</p>
          <p>Drawing Date: Every Monday and Thursday</p>
          <button className="button"onClick={texasTwoStep}>Buy Ticket</button>
        </div>
      </div>
    </div>
  );
};

export default BrowseLotteryTickets;