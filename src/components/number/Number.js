import React, { Component } from 'react';
import style from './style.module.css';

export default class Number extends Component {
    onChange = (event) => {
        this.props.onChange && this.props.onChange(parseInt(event.target.value, 10), this.props.name);
    };
    render() {
        return (
            <div className={style.label}>
                <label>
                    {this.props.label}
                </label>
                <input onChange={this.onChange} type="number" defaultValue={this.props.value}/>
            </div>
        );
    }
}