import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import KakaoRedirectPage from './component/kakaoRedirectPage';
import Login from './component/Login';
import SseTest from './component/SseTest';

function App() {
  return (
    <GoogleOAuthProvider 
      clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
      onScriptLoadError={() => console.log("Google OAuth 스크립트 로드 실패")}
      onScriptLoadSuccess={() => console.log("Google OAuth 스크립트 로드 성공")}
    >
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/oauth/redirected/kakao" element={<KakaoRedirectPage />} />
            <Route path="/home" element={<SseTest />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </GoogleOAuthProvider>
  );
}

export default App;