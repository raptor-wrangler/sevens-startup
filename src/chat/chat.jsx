import React from 'react';

export function Chat({userName}) {
  const [messages, setMessages] = React.useState([]);
  
  async function getMessages () {
    const response = await fetch('api/messages', {
      method: 'get'
    })
    const messageList = await response.json();
    setMessages(messageList);
  }

  async function addMessage(message) {
    const response = await fetch('api/messages', {
      method: 'post',
      body: message,
    })
    const newMessages = await response.json();
    setMessages(newMessages);
  }

  React.useEffect(() => {
    getMessages();
  }, []);

  const messageList = messages.length >= 1 ? (
    <div className="messageslist">
      {messages.map((message, i) => {
        const isMe = message.name === userName;
        return(
        <div 
          className={'messagerow'} 
          key={i}
          style={{ 
            alignSelf: isMe ? 'flex-end' : 'flex-start' , 
            alignItems: isMe ? 'flex-end' : 'flex-start'}
          }>
          <div className={isMe ? 'messageme' : 'messageother'}>{message.name}</div>
          <div>{message.text}</div>
          <div className="messagedate">{message.date}</div>
        </div>
      )})}
    </div>
  ) : (
    <div className="messageslist">
      <p>Be the first to send a message!</p>
    </div>
  );
  
  function addFakeMessage() {
    const newuserName = `User-${Math.floor(Math.random() * 100)}`;
    const message = {
      name: newuserName,
      text: `Hello from ${newuserName}`,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })}
      addMessage(message);
  };

React.useEffect(() => {
  const interval = setInterval(() => {
    addFakeMessage();
  }, 15000);
  return () => clearInterval(interval);
}, []);

  return (
    <main className="maintext">
      <div>
        <h2> Chat </h2>
        <h3>Sending messages as: {userName}</h3>
        {messageList}
        <form onSubmit={e => {e.preventDefault();
          const message = {
            name: userName,
            text: e.target.elements.message.value,
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })
          };
          addMessage(message);
          e.target.reset();
        }} className='chatform'>
          <input className="chatinput" type="text" name="message" placeholder="Type your message here..." required />
          <button className="chatsend" type="submit">Send</button>
        </form>
      </div>
    </main>
  );
}