import React from 'react';

export function Groups() {
  return (
    <main className="maintext">
      <div>
        <h2> Groups </h2>
        <h3>Hello, {localStorage.getItem('userName')}</h3>
        <p> Find others who enjoy the same games as you! </p>
        <table>
          <tbody>
            <tr>
                <th>Username</th>
                <th>Favorite Game(s) in Common</th>
                <th>Contact Info</th>
            </tr>
            <tr>
                <td>Gamer123</td>
                <td>Catan</td>
                <td>Gamer123@gmail.com</td>
            </tr>
            <tr>
                <td>Ducks</td>
                <td>Catan, Pandemic</td>
                <td>Duckee@gmail.com</td>
            </tr>
            <tr>
                <td>Trayorous</td>
                <td>Pandemic</td>
                <td>DrTrayorous3@gmail.com</td>
            </tr>
            </tbody>
        </table>
      </div>
    </main>
  );
}