import React, { useEffect, useState } from 'react';

const SseTest = () => {
  const [messages, setMessages] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [eventSource, setEventSource] = useState(null);

  const subscribeToSSE = () => {
    const newEventSource = new EventSource('http://localhost:8080/sse');

    newEventSource.onmessage = (event) => {
      const newMessage = event.data;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    newEventSource.onerror = (error) => {
      console.error('SSE 연결 에러:', error);
      newEventSource.close();
      setIsSubscribed(false);
    };

    setEventSource(newEventSource);
    setIsSubscribed(true);
  };

  const unsubscribeFromSSE = () => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
      setIsSubscribed(false);
    }
  };

  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);

  const containerStyle = {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333'
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: isSubscribed ? '#e53e3e' : '#3182ce',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px'
  };

  const messageContainerStyle = {
    backgroundColor: '#f7fafc',
    borderRadius: '4px',
    padding: '15px'
  };

  const messageListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0
  };

  const messageItemStyle = {
    backgroundColor: 'white',
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>실시간 알림 테스트</h1>
      
      <button
        onClick={isSubscribed ? unsubscribeFromSSE : subscribeToSSE}
        style={buttonStyle}
      >
        {isSubscribed ? '알림 끄기' : '알림 켜기'}
      </button>

      <div style={messageContainerStyle}>
        <h2 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#4a5568'}}>
          받은 메시지:
        </h2>
        {messages.length > 0 ? (
          <ul style={messageListStyle}>
            {messages.map((message, index) => (
              <li key={index} style={messageItemStyle}>
                {message}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{textAlign: 'center', color: '#718096'}}>
            아직 메시지가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default SseTest;