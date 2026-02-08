import React from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Search } from './search/search';
import { Favorites } from './favorites/favorites';
import { Groups } from './groups/groups';
import { About } from './about/about';

export default function App() {
  return (
    <BrowserRouter>
    <div className = "body">
        <header className='header'>
            <h1 className='h1'>Tabletop Together</h1>
            <nav>
                <menu className='navmenu'>
                    <li>
                        <img className='svg' src='../svgs/home-svgrepo-com.svg'></img>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    <li>
                        <img className='svg' src='../svgs/minimalistic-magnifer-svgrepo-com.svg'></img>
                        <NavLink to="/search">Search</NavLink>
                    </li>
                    <li>
                        <img className='svg' src='../svgs/heart-svgrepo-com.svg'></img>
                        <NavLink to="/favorites">Favorites</NavLink>
                    </li>
                    <li>
                        <img className='svg' src='../svgs/people-nearby-svgrepo-com.svg'></img> 
                        <NavLink to="/groups">Groups</NavLink>
                    </li>
                </menu>
            </nav>
        </header>

        <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/login' element={<Login />} exact />
            <Route path='/search' element={<Search />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/groups' element={<Groups />} />
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
}

function NotFound() {
  return <main className="maintext">404: Return to sender. Address unknown.</main>;
}