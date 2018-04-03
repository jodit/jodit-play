import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

if (!window.JoditPlayConfig) {
    window.JoditPlayConfig = {};
}

window.JoditPlayReady = (element) => {
    ReactDOM.render(<App />, element);
};

const element = document.getElementById('root');
element && window.JoditPlayReady(element);
