import React, { Component } from 'react';
import style from './style.module.css';
import Jodit from 'jodit';
import CheckBox from "../checkbox/CheckBox";

export default class Plugins extends Component {
    togglePlugin = (value, pluginName) => {
        let plugins = Array.isArray(this.props.config.disablePlugins) ? [...this.props.config.disablePlugins] : [...this.props.config.disablePlugins.split(/[\s,]+/)];
        plugins = plugins.filter(a => a);

        if (plugins.indexOf(pluginName) === -1 && !value) {
            plugins.push(pluginName);
        }

        if (plugins.indexOf(pluginName) !== -1 && value) {
            plugins.splice(plugins.indexOf(pluginName), 1);
        }

        if (plugins.toString() !== this.props.config.disablePlugins.toString()) {
            this.props.setOption(plugins.length ? plugins.join(',') : [], 'disablePlugins');
        }
    };

    render() {
        const plugins = Object.keys(Jodit.plugins).map((pluginName) => {
            return <CheckBox
                popupKey={'plugins/' + pluginName}
                key={pluginName}
                name={pluginName}
                onChange={this.togglePlugin}
                defaultChecked={this.props.config.disablePlugins.indexOf(pluginName) === -1}
                label={pluginName}
            />;
        });

        return (
            <div className={style.main}>
                {plugins}
            </div>
        );
    }
}