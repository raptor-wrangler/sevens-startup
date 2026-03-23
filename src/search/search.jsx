import React from 'react';
import { authFetch } from '../app';
import { useNavigate } from 'react-router-dom';

export function Search({userName, favoritesList, setFavoritesList, setAuthState}) {
  const [games, setGames] = React.useState([]);
  const [displayedGames, setDisplayedGames] = React.useState([]);
  const [listLength, setListLength] = React.useState(20);
  const [search, setSearch] = React.useState("");
  const [input, setInput] = React.useState("");
  const navigate = useNavigate();
  
  async function populateGames(listLength) {
    const response = await authFetch(`/api/games?limit=${listLength}`, { method: 'GET' }, setAuthState, navigate);
    if (response && response.ok) {
      const gamesList = await response.json();
      setGames(gamesList);
    }
  }

  async function storeFavorites(game) {
    const response = await authFetch('api/user/fav', {
      method: 'POST',
      body: JSON.stringify(game),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }}, setAuthState, navigate);
    if (response && response.ok) {
    const newFav = await response.json();
    setFavoritesList(newFav);
  }
  }

  async function removeFavorite(game) {
    const response = await authFetch(`api/user/fav?key=${game.Name}`, {
      method: 'delete'
    }, setAuthState, navigate);
    if (!response) return;
    setFavoritesList(favoritesList.filter(fav => fav.Name !== game.Name));
  }

  async function findFavorite(game) {
    try {
      const response = await fetch('api/user/fav', {
        method: 'get'
      });
      const favList = await response.json();
      return favList.some(fav => fav.Name === game.Name);
    } catch {
      return false;
    }
  }

  React.useEffect(() => {
    populateGames(listLength);
  }, [listLength]);

  React.useEffect(() => {
    if (search === "") {
      setDisplayedGames(games.slice(0, listLength));
    } else {
      const filtered = games.filter(game =>
        game.Name.toLowerCase().includes(search.toLowerCase())
      );
      setDisplayedGames(filtered.slice(0, listLength));
    }
  }, [search, games, listLength]);

  return (
    <main className="maintext">
      <div>
        <h2>Search</h2>
        <h3>Hello, {userName}</h3>
        <p>Find games to add to your favorites!</p>
        <form className="searchform" action="search.html" method="get"
            onSubmit={e => {e.preventDefault(); setSearch(input); setListLength(20);}}>
          <input className="search" type="text" name="query" placeholder="Search..." value={input}
            onChange={e => setInput(e.target.value)}/>
          <button className="buttonmain" type="submit">
            <img className='svg' src="../../svgs/minimalistic-magnifer-svgrepo-com.svg" />
          </button>
        </form>
        <table>
          <tbody>
            {displayedGames.map((displayedGames, index) => (
              <tr key={index}>
                  <td>{displayedGames.ImagePath ? 
                    <img className="gameimg" src={displayedGames.ImagePath} alt={displayedGames.Name} width="100"></img> 
                    : <div>No Image</div>}</td>
                  <td>{displayedGames.Name}</td>
                  <td><button className='buttonheart'
                    onClick= {async () => {
                      const found = await findFavorite(displayedGames)
                      if (!found) {
                        storeFavorites(displayedGames);
                      } else {
                        removeFavorite(displayedGames);
                      }
                    }}>
                    <img
                      className='svg'
                      src={favoritesList.some(fav => fav.Name === displayedGames.Name)
                        ? '../../svgs/heart-filled-svgrepo-com.svg'
                        : '../../svgs/heart-svgrepo-com.svg'}
                      alt={favoritesList.some(fav => fav.Name === displayedGames.Name) ? 'Favorited' : 'Add to favorites'}
                    />
                    </button>
                  </td>
                  </tr>
              ))}
          </tbody>
        </table>
        {listLength-1 < displayedGames.length ? (
          <button className='buttonmain' onClick={() => {
            setListLength(listLength + 20);
          }}>Load More</button>
        ) : (
          <div></div>
        )}
        </div>
    </main>
  );
}