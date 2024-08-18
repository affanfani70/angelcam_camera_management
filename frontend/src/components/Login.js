import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import {Link} from "react-router-dom";
import axios from 'axios';
import '../style/login.css'

export default function Login (){
  const [token, setToken] = useState('');
  const [tokenBorderColor, setTokenBorderColor] = useState('');
  const navigate = useNavigate();
  const sendRequest = async () => {
    // to pas the token to backend to check if matches.
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        token:token
      });
      const data = res.data;
      return data;
    }
    catch (err) {
      alert("The Token is not registered")
      throw err;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (token!=='') {
      try {
        const response = await sendRequest(); 
        console.log(response)
        const token = response.access_token;
        console.log("token",token)
        if(!response){
          alert('User not registered!');
        }
        localStorage.setItem("token",token)
        navigate('/Home');
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          if (errorMessage === "Invalid Token") {
            setTokenBorderColor('red');
          }
        } 
      }
    } else {
      if (token === '') {
        setTokenBorderColor('red');
      } else {
        setTokenBorderColor('black');
      }
    }
  };
  

  const handletokenChange = (event) => {
    setToken(event.target.value);
    if (token === '') {
        setTokenBorderColor('red');
      } else {
        setTokenBorderColor('black');
      }
  }

  const handletokenblur = () => {
    if (token === '') {
      setTokenBorderColor('red');
    }
  }

  return (
    <div className="fullscreen-bg d-flex justify-content-center align-items-center">
  <div className="card fdc w-50">
    <div className="card-body">
      <div className='login-heading'>
        <h4 className="card-title mb-3">Login</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="mb-3 d-flex align-items-center">
            <input
              type="string"
              className={`form-control fd ${tokenBorderColor === 'red' ? 'thick-border' : ''}`}
              id="token"
              value={token}
              placeholder="Enter your token"
              onChange={handletokenChange}
              onBlur={handletokenblur}
              style={{ borderColor: tokenBorderColor , width:'70%'}}
            />
            {/* {warningImgU && (<img src={logo} alt='Warning Icon' className='warning ml-2' />)} */}
          </div>
             <div className="">
                 <button type="submit" className="btn btn-info">Login</button>
            </div>
        </div>
      </form>
    </div>
  </div>
</div>

  );  
}
