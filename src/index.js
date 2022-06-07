import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { loadJoditEditor } from './components/editor/loader';

if (!window.JoditPlayConfig) {
    window.JoditPlayConfig = {
        // dataURL: './',
    };
}

window.JoditPlayReady = (element) => {
    ReactDOM.render(<App loadJodit={loadJoditEditor}/>, element);
};

const element = document.getElementById('root');
element && window.JoditPlayReady(element);
