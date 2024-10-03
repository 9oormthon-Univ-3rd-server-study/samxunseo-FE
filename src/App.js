import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import './App.css';
import Login from './component/Login';

function App() {
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