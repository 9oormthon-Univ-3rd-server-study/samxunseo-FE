import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import Login from './component/Login';

function App() {
  return (
    <ChakraProvider>
      <Login />
    </ChakraProvider>
  );
}

export default App;