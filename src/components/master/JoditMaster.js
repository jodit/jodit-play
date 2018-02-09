import React, { Component } from 'react';

import Jodit from 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";
import style from './style.module.css';


import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/light";
import js from 'react-syntax-highlighter/languages/hljs/javascript';
import { ascetic as codeStyle } from 'react-syntax-highlighter/styles/hljs';

import Tabs from "../tab/Tabs";
import Tab from "../tab/Tab";
import Options from "./Options";
import Buttons from "./Buttons";

registerLanguage('javascript', js);

class JoditMaster extends Component {
    state = {
        workBoxWidth: 'auto',
        buttons: {
            buttons: Jodit.defaultOptions.buttons,
            buttonsMD: Jodit.defaultOptions.buttonsMD,
            buttonsSM: Jodit.defaultOptions.buttonsSM,
            buttonsXS: Jodit.defaultOptions.buttonsXS,
        },
        removeButtons: {
            buttons: [],
            buttonsMD: [],
            buttonsSM: [],
            buttonsXS: [],
        },
        activeIndex: {
            buttons: 0,
            buttonsMD: 0,
            buttonsSM: 0,
            buttonsXS: 0,
        },

        config: {
            height: 'auto',
            width: 'auto'
        }
    };

    height = 150;
    setHeight = (value) => {
        this.setOption(value === true ? 'auto' : this.height, 'height')
    };
    width = 500;
    setWidth = (value) => {
        this.setOption(value === true ? 'auto' : this.width, 'width')
    };
    setButtons = (name, buttons, removeButtons, activeIndex) => {
        const state = {...this.state};
        let change = false;

        if (this.state.buttons[name] !== buttons) {
            state.buttons[name] = buttons;
            change = true;
        }

        if (this.state.removeButtons[name] !== removeButtons) {
            state.removeButtons[name] = removeButtons;
            change = true;
        }

        if (change) {
            state.config = {...state.config, [name]: buttons.filter((key) => removeButtons.indexOf(key) === -1)}
        }

        if (this.state.activeIndex[name] !== activeIndex) {
            state.activeIndex[name] = activeIndex;
            change = true;
        }

        if (change) {
            this.setState(state);
        }
    };
    timer;
    setOption = (value, name) => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            switch (name) {
                case 'height':
                case 'width':
                    if (value !== 'auto') {
                        this[name] = value;
                    }
                    break;
                default:
            }

            if (JSON.stringify(this.state[name]) !== JSON.stringify(value)) {
                this.setState(prevState => ({
                    ...prevState,
                    config: {
                        ...prevState.config,
                        [name]: value
                    }
                }));
            }
        }, 100)
    };
    getCode = () => {
        const keys = Object.keys(this.state.config), options= {};
        keys.forEach((key) => {
            if (JSON.stringify(this.state.config[key]) !== JSON.stringify(Jodit.defaultOptions[key])) {
                options[key] = this.state.config[key];
            }
        });

        ['buttons', 'buttonsMD', 'buttonsSM', 'buttonsXS'].forEach((key) => {
            if (options[key]) {
                options[key] = options[key].toString();
            }
        });


        const config = JSON.stringify(options, null, 2);
        return 'var editor = new Jodit("#editor"' + (config !== '{}' ? ', '  + config + '' : '') + ');';
    };
    value = '';
    onEditorChange = (value) => {
        this.value = value;
    };
    setWorkboxWidth = (tab) => {
        this.setState({
            ...this.state,
            workBoxWidth: tab.props.width
        });
        setTimeout(() => {
            let event = document.createEvent("HTMLEvents");
            event.initEvent("resize", true, true);
            window.dispatchEvent(event);
        }, 100);
    };

    render() {
        return (
            <div className={style.layout}>
                <div className={style.leftside}>
                    <div>
                        <div className={style.workbox} style={{width: this.state.workBoxWidth}}>
                            <JoditEditor
                                onChange={this.onEditorChange}
                                config={this.state.config}
                                value={this.value}
                            />
                        </div>
                    </div>
                    <div>
                        <h2>Code</h2>
                        <SyntaxHighlighter showLineNumbers={false} language='javascript' style={codeStyle}>{this.getCode()}</SyntaxHighlighter>
                    </div>
                </div>
                <div className={style.rightside}>
                    <div className={style.item}>
                        <Tabs>
                            <Tab label="Options">
                                <Options
                                    state={this.state.config}
                                    height={this.height}
                                    width={this.width}
                                    setOption={this.setOption}
                                    setHeight={this.setHeight}
                                    setWidth={this.setWidth}
                                />
                            </Tab>
                            {this.state.config.toolbar === false ||
                            <Tab label="Buttons">
                                <Tabs>
                                    <Tab onClick={this.setWorkboxWidth} width={"auto"} label="Desctop">
                                        <Buttons activeIndex={this.state.activeIndex.buttons} removeButtons={this.state.removeButtons.buttons} name="buttons" setButtons={this.setButtons} buttons={this.state.buttons.buttons}/>
                                    </Tab>
                                    <Tab onClick={this.setWorkboxWidth} width={899} label="Medium(900px)">
                                        <Buttons activeIndex={this.state.activeIndex.buttonsMD} removeButtons={this.state.removeButtons.buttonsMD} name="buttonsMD" setButtons={this.setButtons} buttons={this.state.buttons.buttonsMD}/>
                                    </Tab>
                                    <Tab onClick={this.setWorkboxWidth} width={699} label="Tablet(700px)">
                                        <Buttons activeIndex={this.state.activeIndex.buttonsSM} removeButtons={this.state.removeButtons.buttonsSM} name="buttonsSM" setButtons={this.setButtons} buttons={this.state.buttons.buttonsSM}/>
                                    </Tab>
                                    <Tab onClick={this.setWorkboxWidth}  width={399} label="Mobile(400px)">
                                        <Buttons activeIndex={this.state.activeIndex.buttonsXS} removeButtons={this.state.removeButtons.buttonsXS} name="buttonsXS" setButtons={this.setButtons} buttons={this.state.buttons.buttonsXS}/>
                                    </Tab>
                                </Tabs>
                            </Tab>
                            }
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

export default JoditMaster;
