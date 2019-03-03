import Jodit from 'jodit';
import React, { Component } from 'react';
import Color from "./Color";
import tinycolor from "tinycolor2";



export default class Themes extends Component {
    static resetStyles = null;

    getValue = (selector, key) => {
        if (this.props.theme[selector] && this.props.theme[selector][key] !== undefined) {
            return this.props.theme[selector][key];
        }
        return '';
    };
    setValue = (selector, key, value) => {
        const state = {...this.props.theme};
        if (state[selector] === undefined) {
            state[selector] = {};
        }
        if (state[selector][key] !== value) {
            state[selector][key] = value;
            this.props.setCSS(this.generateCss(state), state);
        }

    };

    /**
     *
     * @param state
     * @return {string}
     */
    generateCss = (state) => {
        const css = [];

        Object.keys(state).forEach((selector) => {
            // let elm = document.querySelector(selector);
            css.push(`${selector.split(/,/g,).map((selector) => {
                if (selector === '.jodit_container') {
                    return selector
                }
                return '.jodit_container ' + selector;
            }).join(',\n')} {`);
            let count = 0;

            Object.keys(state[selector]).forEach((key) => {
                key.split('|').forEach((subkey) => {
                    let value = Themes.resetStyles[selector] ? Themes.resetStyles[selector][key] : null;
                    if (value !== state[selector][key]) {
                        css.push(`${Jodit.modules.Helpers.fromCamelCase(subkey)}: ${state[selector][key]};`);
                        count += 1;
                    }
                });
            });
            if (count) {
                css.push(`}`);
            } else {
                css.pop();
            }

        });

        return css.join('\n');
    };

    componentDidMount() {
        if (!Themes.resetStyles) {
            const resetStyles = {};
            Object.keys(this.props.theme).forEach((selector) => {
                let elm = document.querySelector(selector);
                resetStyles[selector] = {};
                if (elm) {
                    const styles = window.getComputedStyle(elm);
                    Object.keys(this.props.theme[selector]).forEach((key) => {
                        let value = styles[key.split('|')[0]];
                        resetStyles[selector][key] = key.match(/color|fill/i) ? Jodit.modules.Helpers.colorToHex(value) : value;
                    });
                }
            });
            Themes.resetStyles = resetStyles;
            const state = Jodit.modules.Helpers.extend(true, {}, Themes.resetStyles);
            this.props.setCSS(this.generateCss(state), state);
        }
    }

    render() {
        return <div>
            <Color
                selector=".jodit_toolbar,.jodit_statusbar"
                styleKey="backgroundColor"
                color={this.getValue}
                title="Toolbar background color"
                setColor={this.setValue}
            />
            <Color
                selector=".jodit_icon,.jodit_toolbar .jodit_toolbar_btn>a"
                styleKey="fill|color"
                bindValue={this.setValue.bind(this, '.jodit_toolbar>li.jodit_toolbar_btn.jodit_with_dropdownlist .jodit_with_dropdownlist-trigger', 'border-top-color')}
                color={this.getValue}
                title="Toolbar icon color"
                setColor={this.setValue}
            />
            <Color
                selector=".jodit_workplace,.jodit_toolbar,.jodit_statusbar,.jodit_toolbar>li.jodit_toolbar_btn.jodit_toolbar_btn-separator,.jodit_toolbar>li.jodit_toolbar_btn.jodit_toolbar_btn-break"
                styleKey="borderColor"
                color={this.getValue}
                title="Toolbar border color"
                setColor={this.setValue}
            />
            <Color
                selector=".jodit_container"
                styleKey="backgroundColor"
                color={this.getValue}
                title="Editor background color"
                setColor={this.setValue}
            />
            <Color
                selector=".jodit_wysiwyg"
                styleKey="color"
                bindValue={this.setValue.bind(this, '.jodit_placeholder', 'color')}
                bindTransform={(color) => {
                    color = tinycolor(color);
                    color.setAlpha(.5);
                    return color.toHex8String();
                }}
                color={this.getValue}
                title="Editor text color"
                setColor={this.setValue}
            />
        </div>;
    }
}