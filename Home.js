import React, { useEffect, useState  } from 'react';
import './Home.css'
import { useNavigate, useLocation} from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //gets email that was passed in previous page
  const [email,setEmail] = useState(() => {return window.sessionStorage.getItem('email')}); 
  const browseTickets = () => {
    //window.alert(location.email)
    console.log(email)
    navigate("/browse_lottery_tickets", { state: email });
  }
  const manageTickets = () => {
    navigate("/manageTickets", { state: email });
  }
  const orderHistory = () => {
    navigate("/orderHistory", { state: email });
  }
  const prevWins = () => {
    navigate("/prevNumbers", { state: email });
  }
  const logOut= () => {
    navigate("/");
  }

  return (
    
    <div>
      <div className='top'>
      <h1>Welcome to the Lottery Ticket System</h1>
      </div>
      <div className='container1'>
      <button className="button" onClick={browseTickets}>
        Browse Lottery Tickets
      </button>
      <button className="button" onClick={manageTickets}>
        Manage Your Tickets
      </button>
      <button className="button" onClick={orderHistory}>
        See Order History
      </button>
      <button className="button" onClick={prevWins}>
        See previous Winning Numbers
      </button>
      <div className='Logout'>
      <button className="button" onClick={logOut}>
        LogOut
      </button>
      </div>
      </div>
    </div>
  );
};

export default Home;