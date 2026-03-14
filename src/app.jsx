import React from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './login/login';
import { Search } from './search/search';
import { Favorites } from './favorites/favorites';
import { Chat } from './chat/chat';
import { About } from './about/about';
import { AuthState } from './login/authState';

export async function authFetch(url, options = {}, setAuthState, navigate) {
    const response = await fetch(url, options);
    if (response.status === 401) {
        alert('Please re-login');
        setAuthState(AuthState.Unauthenticated);
        localStorage.removeItem('userName');
        navigate('/');
        return null;
    }
    return response;
}

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    const [favoritesList, setFavoritesList] = React.useState([]);

    React.useEffect(() => {
        async function checkAuth() {
            try {
            const response = await fetch('/api/auth/me');
            if (response.ok) {
                const data = await response.json();
                setUserName(data.username);
                setAuthState(AuthState.Authenticated);
            } else {
                setUserName('');
                setAuthState(AuthState.Unauthenticated);
                localStorage.removeItem('userName');
            }
            } catch {
            setUserName('');
            setAuthState(AuthState.Unauthenticated);
            localStorage.removeItem('userName');
            }
        }
        checkAuth();
    }, []);

    React.useEffect(() => {
        async function fetchFavorites() {
            if (authState === AuthState.Authenticated) {
                try {
                    const response = await fetch('/api/user/fav');
                    if (response.ok) {
                        const data = await response.json();
                        setFavoritesList(data);
                    }
                } catch {
                    setFavoritesList([]);
                }
            } else {
                setFavoritesList([]);
            }
        }
        fetchFavorites();
    }, [authState]);

    return (
    <BrowserRouter>
    <div className = "body">
        <header className='header'>
            <h1 className='h1'>Tabletop Together</h1>
            <nav>
                <menu className='navmenu'>
                    {authState === AuthState.Unauthenticated && (
                        <li>
                            <img className='svg' src='../svgs/home-svgrepo-com.svg'></img>
                            <NavLink to="/">Login</NavLink>
                        </li>
                    )}
                    {authState === AuthState.Authenticated && (
                        <li>
                            <img className='svg' src='../svgs/minimalistic-magnifer-svgrepo-com.svg'></img>
                            <NavLink to="/search">Search</NavLink>
                        </li>
                    )}
                    {authState === AuthState.Authenticated && (
                        <li>
                            <img className='svg' src='../svgs/heart-svgrepo-com.svg'></img>
                            <NavLink to="/favorites">Favorites</NavLink>
                        </li>
                    )}
                    {authState === AuthState.Authenticated && (
                        <li>
                            <img className='svg' src='../svgs/chat-line-svgrepo-com.svg'></img> 
                            <NavLink to="/chat">Chat</NavLink>
                        </li>
                    )}
                    {authState === AuthState.Authenticated && (
                        <li className="logoutnav">
                            <img className='svg' src='../svgs/logout-2-svgrepo-com.svg'></img> 
                            <NavLink onClick={() => {
                                logout();
                            }} to="/">Logout</NavLink>
                        </li>
                    )}
                </menu>
            </nav>
        </header>

        <Routes>
            <Route path='/' element={<Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                    setUserName(userName);
                    setAuthState(authState);
                }}/>} 
            exact />
            <Route path='/search' element={<Search userName={userName} favoritesList={favoritesList} setFavoritesList={setFavoritesList} setAuthState={setAuthState}/>} />
            <Route path='/favorites' element={<Favorites userName={userName} favoritesList={favoritesList} setFavoritesList={setFavoritesList} setAuthState={setAuthState}/>} />
            <Route path='/chat' element={<Chat userName={userName} setAuthState={setAuthState}/>} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className='footer'>
            <p>Made by Seven Kautzman</p>
            <span> 
                <img className='svg' src="../svgs/info-square-svgrepo-com.svg"></img> 
                <NavLink to="/about"> About </NavLink> 
            </span>
            <span> 
                <img className='svg' src="../svgs/programming-svgrepo-com.svg"></img> 
                <a href="https://github.com/raptor-wrangler/sevens-startup">GitHub</a> 
            </span>
        </footer>
    </div>
    </BrowserRouter>
  );

  function logout() {
      fetch(`/api/auth/logout`, {
        method: 'delete',
      })
        .catch(() => {
          // Logout failed. Assuming offline
        })
        .finally(() => {
          setAuthState(AuthState.Unauthenticated);
          localStorage.removeItem('userName');
        });
    }
}

function NotFound() {
  return <main className="maintext">404: Return to sender. Address unknown.</main>;
}
