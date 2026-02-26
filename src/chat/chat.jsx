import React from 'react';

export function Chat({userName}) {
  return (
    <main className="maintext">
      <div>
        <h2> Chat </h2>
        <h3>Hello, {userName}</h3>
      </div>
    </main>
  );
}