import React, { Component } from 'react';
import style from './style.module.css';
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import Popup from "../data/Popup";

export default class CheckBox extends Component {
    state = {
        hovered: false
    };
    timeout;
    onBlur = (event) => {
        window.clearTimeout(this.timeout);
        if (this.state.hovered) {
            this.setState({
                hovered: false
            });
        }

    };
    onHover = (event) => {
        this.timeout =  window.setTimeout(() => {
            if (!this.state.hovered) {
                this.setState({
                    hovered: true
                });
            }
        }, 300);
    };
    onChange = (event) => {
        this.props.onChange && this.props.onChange(event.target.checked, this.props.name);
    };

    render() {
        return (
            <div onMouseEnter={this.onHover} onMouseLeave={this.onBlur} className={style.label + (this.props.right ? ' ' + style.right : '')}>
                <label>
                    {this.props.checked !== undefined ?
                        <Toggle
                            defaultChecked={this.props.defaultChecked}
                            checked={this.props.checked}
                            onChange={this.onChange}
                        />
                        :
                        <Toggle
                            defaultChecked={this.props.defaultChecked}
                            onChange={this.onChange}
                        />
                    }
                    <span className={style.labelText}>{this.props.label}</span>
                </label>
                {this.props.popupKey && this.state.hovered && <Popup needle={this.props.popupKey}/>}
            </div>
        );
    }
}