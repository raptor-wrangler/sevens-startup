import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Favorites({userName, favoritesList, setFavoritesList}) {
  const navigate = useNavigate();

  async function removeFavorite(game) {
    setFavoritesList(favoritesList.filter(fav => fav.Name !== game.Name));
    localStorage.setItem('favorites', JSON.stringify(favoritesList.filter(fav => fav.Name !== game.Name)));
  }
    
    return (
    <main className="maintext">
      <div>
        <h2> Favorites </h2>
        <h3>Hello, {userName}</h3>
            {favoritesList.length === 0 ? (
                <div>
                    <p>You have no favorite games yet. Go to the search page to add some!</p>
                    <button className='buttonmain' onClick={() => navigate('/search')}>Search</button>
                </div>
            ) : (
            <table>
                <tbody>
                    {favoritesList.map((favoritesList, index) => (
                    <tr key={index}>
                        <td><img className="gameimg" src={favoritesList.ImagePath} alt={favoritesList.Name} width="100"></img></td>
                        <td>{favoritesList.Name}</td>
                        <td><button className='buttonmain'
                            onClick= {() => {
                                removeFavorite(favoritesList);
                            }}>
                            <img className='svg' src="../../svgs/trash-bin-minimalistic-svgrepo-com.svg"/>
                            </button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    </main>
  );
}