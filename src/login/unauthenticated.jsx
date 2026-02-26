import React from "react";

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [showRegister, setShowRegister] = React.useState(false);

    async function loginUser() {
        props.onLogin(userName, password);
    }

    async function createUser() {
        localStorage.setItem('userName', userName);
        localStorage.setItem('password', password);
        props.onLogin(userName, password);
    }

    if (showRegister) {
        return (
        <main className="maintext">
            <h2>Create Account</h2>
            <form type="submit" onSubmit={e => {e.preventDefault(); createUser();}}>
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
                <button className="buttonmain" type="submit" disabled={!userName || !password}>Create</button>
                <button className="buttonsecondary" type="button" onClick={() => setShowRegister(false)}>Cancel</button>
            </form>
        </main>
    )} else {   
        return (
            <main className="maintext">
                <h2>Login</h2>
                <p>Welcome! Please log in to connect with other board gamers.</p>
                <form type="submit" onSubmit={e => {e.preventDefault(); loginUser();}}>
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
                    <button className="buttonmain" type="submit" disabled={!userName || !password}>Login</button>
                    <button className="buttonsecondary" type="button" onClick={() => setShowRegister(true)}>Create</button>
                </form>
            </main>
        );
    }
}