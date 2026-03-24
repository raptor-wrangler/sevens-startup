import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../app';

export function Favorites({userName, favoritesList, setFavoritesList, setAuthState}) {
  const navigate = useNavigate();

  async function removeFavorite(game) {
    const response = await authFetch(`api/user/fav`, {
      method: 'delete',
      body: JSON.stringify({
        favorite: game,
        username: userName
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }, setAuthState, navigate);
    if (response && response.ok) {
      const newFavs = await response.json();
      setFavoritesList(newFavs);
    }
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
                    {favoritesList.map((fav, index) => (
                    <tr key={index}>
                        <td><img className="gameimg" src={fav.ImagePath} alt={fav.Name} width="100"></img></td>
                        <td>{fav.Name}</td>
                        <td className="tablebutton"><button className='buttonmain'
                            onClick= {() => {
                                removeFavorite(fav);
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