import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.JoditPlayReady = (element) => {
    ReactDOM.render(<App />, element);
    registerServiceWorker();
};

const element = document.getElementById('root');
element && window.JoditPlayReady(element);

