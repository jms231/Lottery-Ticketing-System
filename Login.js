import React, { useState } from "react";
import './Login.css'
import { useNavigate } from "react-router-dom";
import userIcon from '../Assets/user.png'
import emailIcon from '../Assets/email.png'
import passIcon from '../Assets/pass.png'
import homeIcon from '../Assets/homeIcon.png'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")

    const [action,setAction] = useState("Login")
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const navigate = useNavigate();
    const [admin, setAdmin] =useState("user")
    

    
    const signUp = () => {
        // ensure all fields are filled
        if (""===email || ""===password || ""===firstName || ""===lastName || ""===address) {
            window.alert("Please fill in all fields");
            return;
        }
    
        // Check if the email is valid (you can add more robust email validation)
        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Invalid email");
            return;
        }
    
        // Check if the email already exists
        checkAccountExists(accountExists => {
            if (accountExists) {
                window.alert("Account with this email already exists");
            } else {
                // If the email is not taken, create a new user
                const newUser = {
                    email,
                    password,
                    firstName,
                    lastName,
                    address,
                    admin
                };
    
                // Update the database.json file
                fetch("http://localhost:3080/auth/signup", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                .then(r => r.json())
                .then(r => {
                    if ('success' === r.message) {
                        //redirects to the login page after successful sign up
                        window.alert("Signup successful! You can now log in.");
                        setAction("Login");
                    } else {
                        window.alert("Signup failed. Please try again.");
                    }
                });
            }
        });
    };

    const onButtonClick = () => {
        checkAccountExists(accountExists => {
            if (accountExists) {
                fetch("http://localhost:3080/auth", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                })
                    .then(r => r.json())
                    .then(r => {
                        if ('success' === r.message) {
                            localStorage.setItem("user", JSON.stringify({ email, token: r.token }));
                            const userAdminStatus = r.admin;

                            
                            console.log("User admin status:", userAdminStatus);
                            //stores email so next pages can use the email for verification/datamanagement
                            window.sessionStorage.setItem('email', email);
                            if (userAdminStatus === "admin") {
                                navigate("../Admin");
                            } else {
                                //navigates to home and passes email state.
                                navigate("../Home", { state: email });
                            }
                        }else {
                            window.alert("Wrong email or password")
                        }
                    })
            } else {
                window.alert("Account does not exist")
            }
        });
    }
        

    //Check if the given email ID already exists in database
    const checkAccountExists = (callback) => {
        fetch("http://localhost:3080/check-account", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email})
        })
        .then(r => r.json())
        .then(r => {
            callback(r?.userExists)
        })
        
    }

   
    

    return <div className={"container"}>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        
        <div className="inputs">
        <div className="input">
            <img src={emailIcon} alt="" />
                <input
                    value={email}
                    placeholder="Enter your email here"
                    onChange={ev => setEmail(ev.target.value)}
                    />
                <label className="errorLabel">{emailError}</label>
            </div>
            </div>
        {action==="Login"?<div></div>:<div className="input">
                <img src={userIcon} alt="" />
                <input type="text" onChange={(event) => setFirstName(event.target.value)}placeholder='Enter First Name '/>
                
            </div>
            }
        {action==="Login"?<div></div>:<div className="input">
                <img src={userIcon} alt="" />
                <input type="text" onChange={(event) => setLastName(event.target.value)}placeholder='Enter Last Name '/>
                
            </div>
            }
        {action==="Login"?<div></div>:<div className="input">
                <img src={homeIcon} alt="" />
                <input type="text" onChange={(event) => setAddress(event.target.value)}placeholder='Enter Address '/>
                
            </div>
            }

        <div className="input">
        <img src={passIcon} alt="" />
            <input
                value={password}
                placeholder="Enter password"
                onChange={ev => setPassword(ev.target.value)}
                />
        </div>



        <div className="submit-container">
            <div className="submit"
                onClick={()=>{setAction("Sign Up")}}>Sign Up</div>

            <div className="submit"
                onClick={()=>{setAction("Login")}}>Login</div>


        </div>
        <div className="submit-login">
        <div className="submit"
                onClick={()=> {
                    if(action==="Login")
                    {
                        onButtonClick();
                    }
                    else{
                        signUp();
                    }
                }} >Submit</div>
        </div>
        </div>


        
        
        
    
}

export default Login