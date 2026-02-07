import React from 'react';
import './app.css';

export default function App() {
  return (
    <div className = "body">
        <header className='header'>
            <h1 className='h1'>Tabletop Together</h1>
            <nav>
                <menu className='navmenu'>
                    <li>
                        <img className='svg' src='../public/svgs/home-svgrepo-com.svg'></img>
                        <a href="login.html">Login</a>
                    </li>
                    <li>
                        <img className='svg' src='../public/svgs/minimalistic-magnifer-svgrepo-com.svg'></img>
                        <a href="search.html">Search</a>
                    </li>
                    <li>
                        <img className='svg' src='../public/svgs/heart-svgrepo-com.svg'></img>
                        <a href="favorites.html">Favorites</a>
                        </li>
                    <li><img className='svg' src='../public/svgs/people-nearby-svgrepo-com.svg'></img> 
                    <a href="groups.html">Groups</a>
                    </li>
                </menu>
            </nav>
        </header>

        <main>
            <div className='maintext'>App Components Go Here</div>
        </main>

        <footer className='footer'>
            <p>Made by Seven Kautzman</p>
            <span> 
                <img className='svg' src="../public/svgs/info-square-svgrepo-com.svg"></img> 
                <a href="about.html"> About </a> 
            </span>
            <span> 
                <img className='svg' src="../public/svgs/programming-svgrepo-com.svg"></img> 
                <a href="https://github.com/raptor-wrangler/sevens-startup">GitHub</a> 
            </span>
        </footer>
    </div>
  );
}