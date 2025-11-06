import React from 'react'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import * as ReactDOMClient from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render( <App /> );