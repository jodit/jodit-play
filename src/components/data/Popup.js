import React, { Component } from 'react';
import style from './style.module.css';

export default class Popup extends Component {
    static loadingState = false;
    static data = null;

    static loadData(success) {
        fetch(process.env.PUBLIC_URL + './data.json')
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                Popup.data = data;
                success();
            })
    }

    static checkInfo(needle, haystack) {
        if (haystack.name !== undefined && haystack.name.replace(/"/g, '') === needle) {
            return Popup.findInfo(needle, haystack, (needle, haystack) => {
                if (haystack.shortText && haystack.shortText.replace(/\s/g, '').length) {
                    return haystack.shortText;
                }
            });
        }
    }
    static findInfo(needle, haystack, callback) {
        const info = callback(needle, haystack);

        if (info) {
            return info;
        }

        if (typeof haystack === 'object') {
            let result;

            Object.keys(haystack).some((key) => {
                result = Popup.findInfo(needle, haystack[key], callback);
                if (result) {
                    return true;
                }
            });

            return result;
        }
    }

    state = {
        content: ''
    };

    updateContent() {
        const content = Popup.findInfo(this.props.needle, Popup.data, Popup.checkInfo) || 'Not found';
        if (this.state.content !== content) {
            this.setState({
                content
            });
        }
    }

    componentWillMount() {
        if (!Popup.data && !Popup.loadingState) {
            Popup.loadingState = true;
            Popup.loadData(() => {
                this.updateContent();
            });
        }
        if (Popup.data) {
            this.updateContent();
        }
    }

    render() {
        return <div className={style.box}>
            <div className={style.popup}>
                {this.state.content || <span>Loading ...</span>}
            </div>
        </div>
    }
}