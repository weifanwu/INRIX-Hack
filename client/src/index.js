import React from 'react'
// import ReactDOM from 'react-dom/client';
import App from './App'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'


const root = createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
);

