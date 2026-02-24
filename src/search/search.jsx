import React from 'react';

export function Search() {
  const [games, setGames] = React.useState([]);
  const [listLength, setListLength] = React.useState(20);
  const [lastLength, setLastLength] = React.useState(0);

  async function populateGames() {
    try {
      const response = await fetch('/games.json');
      const gamesList = await response.json();
      setGames(gamesList.slice(lastLength, listLength));
      setLastLength(listLength);
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
                <input className="search" type="text" name="query" placeholder="Search..."></input>
                <button className="buttonmain" type="submit"> <img className='svg' src="../../svgs/minimalistic-magnifer-svgrepo-com.svg"></img></button>
            </form>
            <table>
                <tbody>
                    {games && games.map((games, index) => (
                        <tr key={listLength}>
                            <td><img className="gameimg" src={games.ImagePath} alt={games.Name} width="100"></img></td>
                            <td>{games.Name}</td>
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