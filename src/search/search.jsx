import React from 'react';

export function Search() {
  const [games, setGames] = React.useState([]);
  const [listLength, setListLength] = React.useState(20);
  const [lastLength, setLastLength] = React.useState(0);
  const [search, setSearch] = React.useState('');

  async function populateGames() {
    try {
      const response = await fetch('/games.json');
      const gamesList = await response.json();
      setGames(gamesList.slice(lastLength, listLength));
      setLastLength(listLength-1);
    } catch (error) {
      console.error('Error loading games:', error);
    }
  }

  React.useEffect(() => {
    populateGames();
  }, [listLength]);

  return (
    <main className="maintext">
      <div>
        <h2>Search</h2>
        <h3>Hello, {localStorage.getItem('userName')}</h3>
            <p>Find games to add to your favorites!</p>
            <form className="searchform" action="search.html" method="get">
                <input className="search" type="text" name="query" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}></input>
            </form>
            <table>
                <tbody>
                  {games.filter(game => game.Name.includes(search)).map((game, index) => (
                    <tr key={index}>
                        <td><img className="gameimg" src={game.ImagePath} alt={game.Name} width="100"></img></td>
                        <td>{game.Name}</td>
                        <td><button className='buttonmain'> <img className='svg' src="../../svgs/heart-svgrepo-com.svg"></img> </button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='buttonmain' onClick={() => setListLength(listLength + 20)}>Load More</button>
        </div>
    </main>
  );
}