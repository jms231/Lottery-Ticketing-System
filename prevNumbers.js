import  {useState } from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";
//this page is for visual only. The numbers are not real winning numbers and would need to be replaced. 
const PreviousWinningNumbers = () => {
  const [email,setEmail] = useState(() => {return window.sessionStorage.getItem('email')});
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/Home");
  }
  return (
    <div>
      <div className="topnav">
      <div className="homeRoute">
          <button className="button" onClick={goHome}>
          Home</button>
          </div>
      </div>
      <h1>Previous Winning Numbers</h1>
      <div className="winning-numbers">
        <p>PowerBall: 15486</p>
        <p>MegaMillions: 45648</p>
        <p>Texas Lottery: 45648</p>
        <p>Texas Two Step: 45648</p>
      </div>
    </div>
  );
};

export default PreviousWinningNumbers;