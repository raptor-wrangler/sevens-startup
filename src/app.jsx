import React from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './login/login';
import { Search } from './search/search';
import { Favorites } from './favorites/favorites';
import { Chat } from './chat/chat';
import { About } from './about/about';
import { AuthState } from './login/authState';


export async function authFetch(url, options = {}, setAuthState) {
    const response = await fetch(url, options);
    if (response.status === 401) {
        const navigate = useNavigate();
        setAuthState(AuthState.Unauthenticated);
        navigate('/');
        return null;
    }
    return response;
}

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    const [favoriteslist, setFavoriteslList] = React.useState(localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []);

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
                                setAuthState(AuthState.Unauthenticated);
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
            <Route path='/search' element={<Search userName={userName} favoritesList={favoriteslist} setFavoritesList={setFavoriteslList}/>} />
            <Route path='/favorites' element={<Favorites userName={userName} favoritesList={favoriteslist} setFavoritesList={setFavoriteslList}/>} />
            <Route path='/chat' element={<Chat userName={userName}/>} />
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
