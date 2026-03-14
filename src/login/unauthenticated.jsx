import React from "react";

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [showRegister, setShowRegister] = React.useState(false);

    async function loginUser() {
        const response = await fetch('/api/auth/login', {
            method: 'post',
            body: JSON.stringify({ username: userName, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            localStorage.setItem('userName', userName);
            props.onLogin(userName);
        } else {
            const body = await response.json();
            alert('Unknown username or password');
        }
    }

    async function createUser() {
        const response = await fetch('/api/auth/create', {
            method: 'post',
            body: JSON.stringify({ username: userName, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            localStorage.setItem('userName', userName);
            props.onLogin(userName);
        } else {
            const body = await response.json();
            alert('Existing User');
        }
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