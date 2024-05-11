import React, { useState } from "react"; 

const Admin = () => {
    //sets initial val to 0
    const [mega, setMega] = useState(0);
    const [power, setPower] = useState(0);
    const [texasLotto, setTexasLotto] = useState(0);
    const [texasStep, setTexasStep] = useState(0); 
    //Gets random int between two values
    const randomNumber = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max); 
        return Math.floor(Math.random() * (max - min + 1)+ min); 
    }; 
  
    const onButtonClick = () => { 
        setMega(randomNumber(11111, 99999));
        setPower(randomNumber(11111, 99999));
        setTexasLotto(randomNumber(11111, 99999));
        setTexasStep(randomNumber(11111, 99999)); 
    }; 
    return ( 
        <div className="wrapper"> 
            <div className="num">Winning number for mega Millions : {mega} </div>
            <div className="num">Winning number for power ball: {power} </div>
            <div className="num">Winning number for Texas Lotto: {texasLotto} </div>
            <div className="num">Winning number for Texas Two Step: {texasStep} </div>
            <button onClick={onButtonClick}> 
                Click to generate new winning lottery ticket numbers. 
            </button> 
        </div> 
    ); 
}; 

export default Admin;