import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';


export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className="maintext">
      {authState !== AuthState.Unknown && <h2>Login</h2>}
      {authState === AuthState.Authenticated && (
        navigate('/search')
      )} 
        <p> Welcome! Please join your fellow board gamers by logging in. </p>
        <form get="get" action="search.html">
            <div className="login">
                <span> <img className='svg' src='../../svgs/letter-svgrepo-com.svg'></img></span>
                <input type="email" placeholder="Youremail@here.com"></input>
            </div>
            <br></br>
            <div className="login">
                <span> <img className='svg' src='../../svgs/pen-new-square-svgrepo-com.svg'></img></span>
                <input type="text" placeholder="Username"></input>
            </div>
            <br></br>
            <div className="login">
                <span> <img className='svg' src='../../svgs/key-minimalistic-square-2-svgrepo-com.svg'></img></span>
                <input type="password" placeholder="Password"></input>
            </div>
            <br></br>
            <button type="submit">Login</button>
            <button type="submit">Create</button>
        </form>
    </main>
  );
}