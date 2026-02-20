import React from "react";

export function CreateUser(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    
    async function createUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }

    return (
        <main className="maintext">
            <p> Welcome! Please join your fellow board gamers by creating an account. </p>
            <form get="get" action="search.html">
                <div className="login">
                    <span> <img className='svg' src='../../svgs/letter-svgrepo-com.svg'></img></span>
                    <input type="email" placeholder="Youremail@here.com" value={userName} onChange={(e) => setUserName(e.target.value)}></input>
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
                <button type="button" onClick={createUser} disabled={!userName || !password}>Create</button>
            </form>
        </main>
    );
}