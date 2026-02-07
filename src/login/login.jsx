import React from 'react';

export function Login() {
  return (
    <main className="maintext">
      <h2>Login</h2>
        <body> <p> Welcome! Please join your fellow board gamers by logging in. </p> </body>
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