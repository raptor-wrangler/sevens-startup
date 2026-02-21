import React from "react";

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [showRegister, setShowRegister] = React.useState(false);

    async function loginUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }

    async function createUser() {
        localStorage.setItem('userName', userName);
        localStorage.setItem('password', password);
        localStorage.setItem('email', email);
        props.onLogin(userName);
    }

    if (showRegister) {
        return (
        <main className="maintext">
            <p>Welcome! Please join your fellow board gamers by creating an account.</p>
            <form get="get" action="search.html">
                <div className="login">
                    <span> <img className='svg' src='../../svgs/letter-svgrepo-com.svg'></img></span>
                    <input type="email" placeholder="Youremail@here.com" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <br></br>
                <div className="login">
                    <span> <img className='svg' src='../../svgs/pen-new-square-svgrepo-com.svg'></img></span>
                    <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)}></input>
                </div>
                <br></br>
                <div className="login">
                    <span> <img className='svg' src='../../svgs/key-minimalistic-square-2-svgrepo-com.svg'></img></span>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <br></br>
                <button className="buttonmain" type="button" onClick={createUser} disabled={!email || !userName || !password}>Create</button>
                <button className="buttonsecondary" type="button" onClick={() => setShowRegister(false)}>Cancel</button>
            </form>
        </main>
    )} else {   
        return (
            <main className="maintext">
                <form get="get" action="search.html">
                    <div className="login">
                        <span> <img className='svg' src='../../svgs/pen-new-square-svgrepo-com.svg'></img></span>
                        <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)}></input>
                    </div>
                    <br></br>
                    <div className="login">
                        <span> <img className='svg' src='../../svgs/key-minimalistic-square-2-svgrepo-com.svg'></img></span>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <br></br>
                    <button className="buttonmain" type="button" onClick={loginUser} disabled={!userName || !password}>Login</button>
                    <button className="buttonsecondary" type="button" onClick={() => setShowRegister(true)}>Create</button>
                </form>
            </main>
        );
    }
}