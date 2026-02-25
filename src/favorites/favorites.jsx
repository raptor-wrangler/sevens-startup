import React from 'react';

export function Favorites({userName, favoritesList, setFavoritesList}) {
    return (
    <main className="maintext">
      <div>
        <h2> Favorites </h2>
        <h3>Hello, {userName}</h3>
        <p> Here are your favorite games! </p>
            <table>
                <tbody>
                    {favoritesList.length !== 0 && favoritesList.map((favoritesList, index) => (
                    <tr key={index}>
                        <td><img className="gameimg" src={favoritesList.ImagePath} alt={favoritesList.Name} width="100"></img></td>
                        <td>{favoritesList.Name}</td>
                        <td><button className='buttonmain'
                            onClick= {() => {
                                setFavoritesList(favoritesList.filter(game => game.Name !== favoritesList.Name));
                            }}>
                            <img className='svg' src="../../svgs/trash-bin-minimalistic-svgrepo-com.svg"/>
                            </button>
                        </td>
                        </tr>
                    ))}
                {/* <tr>
                    <td><img className="gameimg" src="https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__original/img/xV7oisd3RQ8R-k18cdWAYthHXsA=/0x0/filters:format(jpeg)/pic2419375.jpg" alt="Catan" width="100"></img></td>
                    <td>Catan</td>
                    <td><form><input className="rank" type="number" min="1" max="100" placeholder="1"></input></form></td>
                    <td><button className="buttonmain"><img className='svg' src="../../svgs/trash-bin-minimalistic-svgrepo-com.svg"></img></button></td>
                </tr>
                <tr>
                    <td><img className="gameimg" src="https://cf.geekdo-images.com/S3ybV1LAp-8SnHIXLLjVqA__original/img/IsrvRLpUV1TEyZsO5rC-btXaPz0=/0x0/filters:format(jpeg)/pic1534148.jpg" alt="Pandemic" width="100"></img></td>
                    <td>Pandemic</td>
                    <td><form><input className="rank" type="number" min="1" max="100" placeholder="2"></input></form></td>
                    <td><button className="buttonmain"><img className='svg' src="../../svgs/trash-bin-minimalistic-svgrepo-com.svg"></img></button></td>
                </tr>
                <tr>
                    <td><img className="gameimg" src="https://cf.geekdo-images.com/ZWJg0dCdrWHxVnc0eFXK8w__original/img/LgzEsQlF3xkSEQLoorc8ntiYiIY=/0x0/filters:format(jpeg)/pic38668.jpg" alt="Ticket to Ride" width="100"></img></td>
                    <td>Ticket to Ride</td>
                    <td><form><input className="rank" type="number" min="1" max="100" placeholder="3"></input></form></td>
                    <td><button className="buttonmain"><img className='svg' src="../../svgs/trash-bin-minimalistic-svgrepo-com.svg"></img></button></td>
                </tr> */}
                </tbody>
            </table>
        </div>
    </main>
  );
}