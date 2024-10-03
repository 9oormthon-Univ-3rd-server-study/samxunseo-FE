import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { useEffect } from 'react';
import './App.css';
import Login from './component/Login';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY);
          console.log("Kakao SDK initialized");
        }
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <GoogleOAuthProvider 
      clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
      onScriptLoadError={() => console.log("Google OAuth 스크립트 로드 실패")}
      onScriptLoadSuccess={() => console.log("Google OAuth 스크립트 로드 성공")}
    >
      <ChakraProvider>
        <Login />
      </ChakraProvider>
    </GoogleOAuthProvider>
  );
}

export default App;