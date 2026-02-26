import React from 'react';

export function Chat({userName}) {
  const [messages, setMessages] = React.useState([]);
  
  React.useEffect(() => {
    const messageList = localStorage.getItem('messages');
    if (messageList) {
      setMessages(JSON.parse(messageList));
    }
  }, []);

  const messageList = messages.length ? (
    <div className="messageslist">
      {messages.map((message, i) => (
        <div className="message-row" key={i}>
        <div className='messagecontainer'>
            <span className="messageuser">{message.name.split('@')[0]}: </span>
            <span className="messagetext">{message.text}</span>
          </div>
          <span className="messagedate" style={{marginLeft: '10px', color: '#7c6f64', fontSize: '0.8em'}}>{message.date}</span>
        </div>
      ))}
    </div>
  ) : (
    <div className="messageslist">
      <p className="messagerowempty">Be the first to send a message!</p>
    </div>
  );
  
  //   setInterval(() => {
  //   // This will be replaced with WebSocket messages
  //   const userName = `User-${Math.floor(Math.random() * 100)}`;
  //   const message = {
  //     name: userName,
  //     text: `Hello from ${userName}`,
  //     date: new Date().toLocaleString("en-US", {
  //       month: "short",
  //       day: "numeric",
  //       year: "numeric",
  //       hour: "2-digit",
  //       minute: "2-digit"
  //     })
  //   };
  //   const newMessage = messages.concat(message);
  //   setMessages(newMessage);
  //   localStorage.setItem('messages', JSON.stringify(newMessage));
  // }, 30000);

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
          const newMessages = messages.concat(message);
          setMessages(newMessages);
          localStorage.setItem('messages', JSON.stringify(newMessages));
          e.target.reset();
        }}>
          <input className="chatinput" type="text" name="message" placeholder="Type your message here..." required />
          <button className="buttonmain" type="submit">Send</button>
          <button type="button" onClick={() => {
            setMessages([]);
            localStorage.removeItem('messages');
          }}>Clear Chat</button>
        </form>
      </div>
    </main>
  );
}