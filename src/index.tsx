import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import App from './App';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
const GlobalStyle = createGlobalStyle`
*{
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding:0;
  margin:0;
}
body{


}
li{
  list-style-type: none;
}
`

const queryClient = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
    
    <QueryClientProvider client={queryClient}>
    <GlobalStyle />
    
    <App />
    
    <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

