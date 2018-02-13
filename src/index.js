import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.JoditPlayConfig.ready = (element) => {
    ReactDOM.render(<App />, element);
    registerServiceWorker();
};

let element = document.getElementById('root');
element && window.JoditPlayConfig.ready(element);

