import React, { Component } from 'react';
import './App.css';
import JoditMaster from "./components/master/JoditMaster";


export const http_build_query = (formdata, numeric_prefix, arg_separator) => {

    let key, use_val, use_key, i = 0, tmp_arr = [];

    if(!arg_separator){
        arg_separator = '&';
    }

    for(key in formdata){
        use_key = escape(key);
        use_val = escape((formdata[key].toString()));
        use_val = use_val.replace(/%20/g, '+');

        if(numeric_prefix && !isNaN(key)){
            use_key = numeric_prefix + i;
        }
        tmp_arr[i] = use_key + '=' + use_val;
        i++;
    }

    return tmp_arr.join(arg_separator);
}

const getParams = query => {
    if (!query) {
        return { };
    }

    return (/^[?#]/.test(query) ? query.slice(1) : query).split('&')
        .reduce((params, param) => {
            let [ key, value ] = param.split('=');
            params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';

            if (params[key].toString().match(/^[0-9]+$/)) {
                params[key] = parseInt(params[key], 10);
            }

            if (params[key] === 'true') {
                params[key] = true;
            }
            if (params[key] === 'false') {
                params[key] = false;
            }


            return params;
        }, { });
};

class App extends Component {
  config;
  constructor() {
    super();

    this.config = {...{
        currentTab: null,
        showCode: true,
        showEditor: true,
        showButtonsTab: true,
        setCSS: (css) => {},
        setCode: (code) => {},
        setConfig: (config) => {},
        ready: () => {},
        initialConfig: {
        },
        ...window.JoditPlayConfig
    }};

    this.config.currentTab = getParams(window.location.search.substr(1))['currentTab'] || null;
    this.config.initialConfig = {...this.config.initialConfig, ...getParams(window.location.search.substr(1))};
  }

  render() {
    return (
      <div className="App">
          <JoditMaster config={this.config}/>
      </div>
    );
  }
}

export default App;
