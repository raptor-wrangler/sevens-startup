import React from 'react';

export function About() {
  return (
    <main className="maintext">
      <div>
        <h2> About </h2>
        <section id="about">
            <img src="pfp 2 recolored.png" alt="Profile Picture of Seven Kautzman" className="pfp"></img>
            <section id="aboutinfo">
                <p> My name is Seven, a computer Science: Human Computer Interaction major at BYU. This website was made for a web programming class. It will hopefully be just one of many! </p>
                <p> Tabletop Together is a website created in order to help people who like to play board/card/tabletop games find and meet other players in person. I am a board game lover myself and it's difficult to find people who are willing to play the more complicated games that I love.</p>
                <p> Here are some of my favorite table top games:</p>
            </section>
        </section>
        <table id="abouttable">
          <tbody>
            <tr>
                <th>Dungeons & Dragons</th>
                <th>Seven Wonders</th>
                <th>Catan</th>
                <th>Skull King</th>
            </tr>
            <tr>
                <td><img className='gameimg' src="https://cf.geekdo-images.com/7Tfq6Jeik9PON46j1bqrew__original/img/MSbRO0k8_GW94CN78XnAs1lU8OI=/0x0/filters:format(png)/pic4222497.png" alt="Dungeons & Dragons"></img></td>
                <td><img className='gameimg' src="https://cf.geekdo-images.com/fwzG7OfzA35y7b3S7dHn9Q__original/img/HGwgC5DOPmEksHYUKNiF38dKUog=/0x0/filters:format(jpeg)/pic5652537.jpg"alt="Seven Wonders"></img></td>
                <td><img className='gameimg' src="https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__original/img/xV7oisd3RQ8R-k18cdWAYthHXsA=/0x0/filters:format(jpeg)/pic2419375.jpg" alt="Catan"></img></td>
                <td><img className='gameimg' src="https://cf.geekdo-images.com/jiL3MIGH_w3g6El3OHVVig__original/img/JlMGgWGzFWmqz4s5DMLpPuHMUzg=/0x0/filters:format(png)/pic6137456.png" alt="Skull King Game"></img></td>
            </tr>
          </tbody>
        </table>
        </div>
    </main>
  );
}