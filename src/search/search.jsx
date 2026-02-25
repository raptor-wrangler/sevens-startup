import React from 'react';

export function Search({userName, favoritesList, setFavoritesList}) {
  const [games, setGames] = React.useState([]);
  const [displayedGames, setDisplayedGames] = React.useState([]);
  const [listLength, setListLength] = React.useState(20);
  const [search, setSearch] = React.useState("");
  const [input, setInput] = React.useState("");

  async function populateGames() {
    const response = await fetch('/games.json'); //my hope is that I can use a third party call for this later
    const gamesList = await response.json();
    setGames(gamesList);
  }

  async function storeFavorites(game) {
    setFavoritesList(favoritesList.concat(game));
    localStorage.setItem('favorites', JSON.stringify(favoritesList.concat(game)));
  }

  async function removeFavorite(game) {
    setFavoritesList(favoritesList.filter(fav => fav.Name !== game.Name));
    localStorage.setItem('favorites', JSON.stringify(favoritesList.filter(fav => fav.Name !== game.Name)));
  }

  React.useEffect(() => {
    populateGames();
  }, []);

  React.useEffect(() => {
    if (search === "") {
      setDisplayedGames(games.slice(0, listLength));
    } else {
      const filtered = games.filter(game =>
        game.Name.toLowerCase().includes(search.toLowerCase())
      );
      setDisplayedGames(filtered);
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
                  <td><img className="gameimg" src={displayedGames.ImagePath} alt={displayedGames.Name} width="100"></img></td>
                  <td>{displayedGames.Name}</td>
                  <td><button className='buttonheart'
                    onClick= {() => {
                      if (!favoritesList.some(game => game.Name === displayedGames.Name)) {;
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
        <button className='buttonmain' onClick={() => {
          setListLength(listLength + 20);
        }}>Load More</button>
        </div>
    </main>
  );
}