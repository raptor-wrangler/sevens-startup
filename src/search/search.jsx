import React from 'react';

export function Search() {
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
                <tr>
                    <td><img className="gameimg" src="https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__original/img/xV7oisd3RQ8R-k18cdWAYthHXsA=/0x0/filters:format(jpeg)/pic2419375.jpg" alt="Catan" width="100"></img></td>
                    <td>Catan</td>
                    <td><button className='buttonmain'> <img className='svg' src="../../svgs/heart-svgrepo-com.svg"></img> </button></td>
                </tr>
                <tr>
                    <td><img className="gameimg" src="https://cf.geekdo-images.com/S3ybV1LAp-8SnHIXLLjVqA__original/img/IsrvRLpUV1TEyZsO5rC-btXaPz0=/0x0/filters:format(jpeg)/pic1534148.jpg" alt="Pandemic" width="100"></img></td>
                    <td>Pandemic</td>
                    <td><button className='buttonmain'> <img className='svg' src="../../svgs/heart-svgrepo-com.svg"></img> </button></td>
                </tr>
                <tr>
                    <td><img className="gameimg" src="https://cf.geekdo-images.com/ZWJg0dCdrWHxVnc0eFXK8w__original/img/LgzEsQlF3xkSEQLoorc8ntiYiIY=/0x0/filters:format(jpeg)/pic38668.jpg" alt="Ticket to Ride" width="100"></img></td>
                    <td>Ticket to Ride</td>
                    <td><button className='buttonmain'> <img className='svg' src="../../svgs/heart-svgrepo-com.svg"></img> </button></td>
                </tr>
                </tbody>
            </table>
        </div>
    </main>
  );
}