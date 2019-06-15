import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './StartPoint';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

window.host = 'http://localhost:8080';
ReactDOM.render(<BrowserRouter><MainApp /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
