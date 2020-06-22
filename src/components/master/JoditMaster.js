import React, { Component } from 'react';
import 'jodit';
import {Jodit} from 'jodit';


import JoditEditor from "jodit-react";
import style from './style.module.css';
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/light";
import js from 'react-syntax-highlighter/languages/hljs/javascript';
import css from 'react-syntax-highlighter/languages/hljs/css';
import { agate as codeStyle} from 'react-syntax-highlighter/styles/hljs';

import Tabs from "../tab/Tabs";
import Tab from "../tab/Tab";
import Options from "./Options";
import Buttons from "./Buttons";
import CheckBox from "../checkbox/CheckBox";
import URL from "../url/URL";
import Text from "../text/Text";
import URLS from "../url/URLS";
import CopyText from "../copytext/CopyText";
import State from "./State";
import { http_build_query } from "../../App";
import createHistory from 'history/createBrowserHistory'
import Plugins from "../plugins/Plugins";
import Themes from "../themes/Themes";
import { LoremIpsum } from "./LoremIpsum";

registerLanguage('javascript', js);
registerLanguage('css', css);

const history = createHistory();


class JoditMaster extends Component {
    getDefaultState = () => {
        return {
            showLoremIpsum: true,
            currentButtonsTab: null,
            currentTab: this.props.config.currentTab,
            workBoxWidth: 'auto',
            buttons: {
                buttons: [...Jodit.defaultOptions.buttons],
                buttonsMD: this.getButtons('buttonsMD'),
                buttonsSM: this.getButtons('buttonsSM'),
                buttonsXS: this.getButtons('buttonsXS')
            },
            removeButtons: {
                buttons: [],
                buttonsMD: this.getRemoveButtons('buttonsMD'),
                buttonsSM: this.getRemoveButtons('buttonsSM'),
                buttonsXS: this.getRemoveButtons('buttonsXS'),
            },
            activeIndex: {
                buttons: 0,
                buttonsMD: 0,
                buttonsSM: 0,
                buttonsXS: 0,
            },
            css: '',
            theme: {
                '.jodit_workplace,.jodit_toolbar,.jodit_statusbar,.jodit_toolbar>li.jodit_toolbar_btn.jodit_toolbar_btn-separator,.jodit_toolbar>li.jodit_toolbar_btn.jodit_toolbar_btn-break': {
                    borderColor: '#ccc'
                },
                '.jodit_toolbar,.jodit_statusbar': {
                    backgroundColor: '#ccccc',
                },
                '.jodit_icon,.jodit_toolbar .jodit_toolbar_btn>a': {
                    'fill|color': '#ddd',
                },
                '.jodit_container': {
                    'backgroundColor': '#ddd',
                },
                '.jodit_wysiwyg': {
                    'color': '#ddd',
                },
            },
            config: {

                autofocus: Jodit.defaultOptions.autofocus,
                toolbar: Jodit.defaultOptions.toolbar,
                iframe: Jodit.defaultOptions.iframe,
                iframeStyle: Jodit.defaultOptions.iframeStyle,

                uploader: Jodit.defaultOptions.uploader,

                textIcons: Jodit.defaultOptions.textIcons,
                readonly: Jodit.defaultOptions.readonly,
                spellcheck: Jodit.defaultOptions.spellcheck,
                language: Jodit.defaultOptions.language,
                direction: Jodit.defaultOptions.direction,
                theme: Jodit.defaultOptions.theme,
                toolbarButtonSize: Jodit.defaultOptions.toolbarButtonSize,
                enter: Jodit.defaultOptions.enter,
                defaultMode: Jodit.defaultOptions.defaultMode,
                allowResizeY: Jodit.defaultOptions.allowResizeY,
                allowResizeX: Jodit.defaultOptions.allowResizeX,

                toolbarAdaptive: Jodit.defaultOptions.toolbarAdaptive,
                toolbarSticky: Jodit.defaultOptions.toolbarSticky,
                toolbarStickyOffset: Jodit.defaultOptions.toolbarStickyOffset,

                showCharsCounter: Jodit.defaultOptions.showCharsCounter,
                showWordsCounter: Jodit.defaultOptions.showWordsCounter,
                showXPathInStatusbar: Jodit.defaultOptions.showXPathInStatusbar,

                saveHeightInStorage: Jodit.defaultOptions.saveHeightInStorage,
                saveModeInStorage: Jodit.defaultOptions.saveModeInStorage,

                askBeforePasteHTML: Jodit.defaultOptions.askBeforePasteHTML,
                askBeforePasteFromWord: Jodit.defaultOptions.askBeforePasteFromWord,
                defaultActionOnPaste: Jodit.defaultOptions.defaultActionOnPaste,

                disablePlugins: Jodit.defaultOptions.disablePlugins,

                height:  Jodit.defaultOptions.height,
                width:  Jodit.defaultOptions.width,
                sizeLG: 800,
            }
        }
    };

    getButtons(type) {
        return Jodit.defaultOptions.buttonsXS.concat(this.getRemoveButtons(type))
    }
    getRemoveButtons(type) {
        return Jodit.defaultOptions.buttons.filter((key) => {
            return key !== '|' && key !== '\n' && Jodit.defaultOptions[type].indexOf(key) === -1
        })
    }

    state = (((defaultState) => {
        return {
            ...defaultState,
            css: defaultState.css || this.props.config.initialCSS || '',
            config: {
                ...defaultState.config,
                ...this.props.config.initialConfig
            }
        };
    })(this.getDefaultState()));

    setButtonsTab = (value) => {
        this.setState({
            ...this.state,
            currentButtonsTab: value
        });
    };

    setTab = (value) => {
        this.setState({
            ...this.state,
            currentTab: value
        });
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
    toggleLoremIpsum = (showLoremIpsum) => {
        if (!showLoremIpsum && this.value === LoremIpsum) {
            this.value = '';
        }
        this.setState({
            ...this.state,
            showLoremIpsum
        });
    };
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
                this.setState(prevState => {
                    let newStage = {...prevState.config};

                    if (name === 'iframe' && value ===  false) {
                        newStage.iframeStyle = Jodit.defaultOptions.iframeStyle;
                        newStage.iframeCSSLinks = Jodit.defaultOptions.iframeCSSLinks;
                        newStage.iframeBaseUrl = Jodit.defaultOptions.iframeBaseUrl;
                    }

                    let link = newStage, keys = name.split('.');

                    keys.forEach((key, index) => {
                        if (index !== keys.length - 1) {
                            link[key] = {...link[key]};
                            link = link[key];
                        }
                    });

                    name = keys[keys.length - 1];

                    link[name] = value;

                    return {
                    ...prevState,
                        config: newStage
                    }
                });

            }
        }, 100)
    };

    getCode = () => {
        const getChangedOption = (config, defaultOptions) => {
            const keys = Object.keys(config), options = Array.isArray(config) ? [] : {};

            keys.forEach((key) => {
                if (defaultOptions[key] !== undefined && JSON.stringify(config[key]) !== JSON.stringify(defaultOptions[key]) && ['sizeLG'].indexOf(key) === -1) {
                    options[key] = typeof config[key] === 'object' ? getChangedOption(config[key], defaultOptions[key]) : config[key];
                }
            });

            return options;
        };

        const options = getChangedOption(this.state.config, Jodit.defaultOptions);

        ['buttons', 'buttonsMD', 'buttonsSM', 'buttonsXS'].forEach((key) => {
            if (options[key]) {
                options[key] = options[key].toString();
            }
        });

        if (typeof this.props.config.setConfig === 'function') {
            this.props.config.setConfig(options);
        }

        this.__isDefault = Object.keys(options).length === 0 && this.state.css === '';

        const config = JSON.stringify(options, null, 2);

        if (this.state.currentTab !== 'Options' && this.state.currentTab !== null) {
            options.currentTab = this.state.currentTab;
        }

        if (this.props.config.historyAPI) {
            history.push('?' + http_build_query(options), options)
        }

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
    setCSS = (css, theme) => {
        this.setState({
            ...this.state,
            css: css || this.props.config.initialCSS,
            theme
        });
    };

    __isDefault = true;
    isDefault = () => {
        return this.__isDefault;
    };
    restoreDefault = () => {
        if (window.confirm('Are you sure you want to restore the default settings?')) {
            Themes.resetStyles = {};
            this.setState({...this.getDefaultState()});
        }
    };
    render() {
        const code = this.getCode();

        if (typeof this.props.config.setCode === 'function') {
            this.props.config.setCode(code);
        }

        if (typeof this.props.config.setCSS === 'function' && this.state.css) {
            this.props.config.setCSS(this.state.css);
        }

        return (
            <div className={style.layout}>
                <div className={style.leftside}>
                    {this.props.config.showEditor &&
                    <div>
                        <div className={style.workbox} style={{width: this.state.workBoxWidth}}>
                            <CheckBox
                                name="showLoremIpsum"
                                onChange={this.toggleLoremIpsum}
                                defaultChecked={this.state.showLoremIpsum}
                                label="Show lorem ipsum text"
                            />
                            <JoditEditor
                                onChange={this.onEditorChange}
                                config={this.state.config}
                                value={this.state.showLoremIpsum ? LoremIpsum : this.value}
                            />
                        </div>
                    </div>
                    }
                    {this.props.config.showCode &&
                    <div>
                        <h2>Code</h2>
                        <CopyText>
                            <SyntaxHighlighter showLineNumbers={false} language='javascript'
                                               style={codeStyle}>{code}</SyntaxHighlighter>
                        </CopyText>
                        {this.state.css && <React.Fragment>
                            <h2>CSS</h2>
                            <CopyText>
                                <SyntaxHighlighter showLineNumbers={false} language='css' style={codeStyle}>{this.state.css}</SyntaxHighlighter>
                            </CopyText>
                        </React.Fragment>}
                    </div>
                    }
                    {this.state.css && <style>{this.state.css}</style>}
                </div>
                <div className={style.rightside}>
                    <div className={style.item}>
                        <Tabs currentTab={this.state.currentTab} setTab={this.setTab}>
                            <Tab label="Options">
                                {this.isDefault() || (<div className={style.defaultRestore}>
                                    <button onClick={this.restoreDefault} type={"button"}>Restore defaults</button>
                                </div>)}

                                <Options
                                    state={this.state.config}
                                    height={this.height}
                                    width={this.width}
                                    setOption={this.setOption}
                                    setHeight={this.setHeight}
                                    setWidth={this.setWidth}
                                />
                            </Tab>
                            {this.props.config.showButtonsTab === false ||
                                this.state.config.toolbar === false ||
                                <Tab label="Buttons">
                                    <CheckBox popupKey="toolbarAdaptive" name="toolbarAdaptive" onChange={this.setOption} defaultChecked={this.state.config.toolbarAdaptive} label="Toolbar adaptive"/>
                                    <Tabs setTab={this.setButtonsTab} currentTab={this.state.currentButtonsTab}>
                                        <Tab onClick={this.setWorkboxWidth} width={"auto"} label="Desktop">
                                            <Buttons activeIndex={this.state.activeIndex.buttons} removeButtons={this.state.removeButtons.buttons} name="buttons" setButtons={this.setButtons} buttons={this.state.buttons.buttons}/>
                                        </Tab>
                                        {!this.state.config.toolbarAdaptive ||
                                        <Tab onClick={this.setWorkboxWidth} width={799} label="Medium(900px)">
                                            <Buttons activeIndex={this.state.activeIndex.buttonsMD}
                                                     removeButtons={this.state.removeButtons.buttonsMD} name="buttonsMD"
                                                     setButtons={this.setButtons} buttons={this.state.buttons.buttonsMD}/>
                                        </Tab>
                                        }
                                        {!this.state.config.toolbarAdaptive ||
                                        <Tab onClick={this.setWorkboxWidth} width={699} label="Tablet(700px)">
                                            <Buttons activeIndex={this.state.activeIndex.buttonsSM}
                                                     removeButtons={this.state.removeButtons.buttonsSM} name="buttonsSM"
                                                     setButtons={this.setButtons} buttons={this.state.buttons.buttonsSM}/>
                                        </Tab>
                                        }
                                        {!this.state.config.toolbarAdaptive ||
                                        <Tab onClick={this.setWorkboxWidth} width={399} label="Mobile(400px)">
                                            <Buttons activeIndex={this.state.activeIndex.buttonsXS}
                                                     removeButtons={this.state.removeButtons.buttonsXS} name="buttonsXS"
                                                     setButtons={this.setButtons} buttons={this.state.buttons.buttonsXS}/>
                                        </Tab>
                                        }
                                    </Tabs>
                                </Tab>
                            }
                            {this.state.config.iframe === false ||
                            <Tab label="Iframe mode">
                                <URL
                                    label="Iframe Base URL"
                                    name="iframeBaseUrl"
                                    onChange={this.setOption}
                                    value={this.state.config.iframeBaseUrl}
                                />
                                <Text
                                    label="iframe Default Style"
                                    name="iframeStyle"
                                    onChange={this.setOption}
                                    value={this.state.config.iframeStyle}
                                />
                                <URLS
                                    label="Iframe external stylesheets files"
                                    name="iframeCSSLinks"
                                    onChange={this.setOption}
                                    value={this.state.config.iframeCSSLinks}
                                />
                            </Tab>
                            }
                            <Tab label="State">
                                <State
                                    config={this.state.config}
                                    setOption={this.setOption}
                                />
                            </Tab>
                            <Tab label="Plugins">
                                <Plugins
                                    config={this.state.config}
                                    setOption={this.setOption}
                                />
                            </Tab>
                            <Tab label="Themes">
                                <Themes theme={this.state.theme} setCSS={this.setCSS}/>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

export default JoditMaster;
