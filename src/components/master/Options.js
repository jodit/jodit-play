import React, { Component } from 'react';
import Jodit from "jodit";
import List from "../list/List";
import Number from "../number/Number";
import CheckBox from "../checkbox/CheckBox";



export default class Options extends Component {
    render() {
        return (
            <div>
                <List name="preset" value={this.props.state.preset} onChange={this.props.setOption} list={{
                    custom: 'None',
                    inline: 'Inline Mode',
                }} label="Presets"/>

                <fieldset>
                    <legend>Toolbar</legend>
                    <CheckBox popupKey={"toolbar"} name="toolbar" onChange={this.props.setOption} defaultChecked={this.props.state.toolbar} label="Show Toolbar"/>
                    {this.props.state.toolbar === false ||
                    <CheckBox
                        popupKey={"textIcons"}
                        name="textIcons"
                        onChange={this.props.setOption}
                        defaultChecked={this.props.state.textIcons}
                        label="Text Icons"
                    />
                    }
                    {this.props.state.toolbar === false ||
                    <List value={this.props.state.toolbarButtonSize} name="toolbarButtonSize"
                          onChange={this.props.setOption} list={[
                        "small", "middle", "large"
                    ]} label="Size of icons"/>
                    }
                    {this.props.state.toolbar === false ||
                    <CheckBox popupKey={"toolbarSticky"} name="toolbarSticky" onChange={this.props.setOption} defaultChecked={this.props.state.toolbarSticky} label="Sticky Toolbar"/>
                    }

                    {this.props.state.toolbar === false || this.props.state.toolbarSticky === false ||
                    <Number
                        label="Sticky offset"
                        name="toolbarStickyOffset"
                        onChange={this.props.setOption}
                        value={this.props.state.toolbarStickyOffset}
                    />
                    }
                </fieldset>
                <CheckBox popupKey={"autofocus"} name="autofocus" onChange={this.props.setOption} defaultChecked={this.props.state.autofocus} label="Autofocus"/>

                <CheckBox popupKey={"readonly"} name="readonly" onChange={this.props.setOption} defaultChecked={this.props.state.readonly} label="Read Only"/>

                <CheckBox popupKey={"spellcheck"} name="spellcheck" onChange={this.props.setOption} defaultChecked={this.props.state.spellcheck} label="Spell Check"/>
                <CheckBox popupKey={"iframe"} name="iframe" onChange={this.props.setOption} defaultChecked={this.props.state.iframe} label="Iframe mode"/>

                <List value={this.props.state.language} name="language" onChange={this.props.setOption} list={['Auto', ...Object.keys(Jodit.lang)]} label="Language"/>

                <List value={this.props.state.theme} name="theme" onChange={this.props.setOption} list={{
                    'default' : 'Default',
                    'dark' : 'Dark',
                }} label="Theme"/>

                <List name="enter" value={this.props.state.enter} onChange={this.props.setOption} list={{
                    "P": 'Paragraph (P)',
                    "DIV": 'Block (DIV)',
                    "BR": 'Break (BR)',
                }} label="Element that will be created on Enter"/>


                <List name="defaultMode" value={this.props.state.defaultMode} onChange={this.props.setOption} list={{
                    [Jodit.MODE_WYSIWYG]: 'WYSIWYG',
                    [Jodit.MODE_SOURCE]: 'Source code',
                    [Jodit.MODE_SPLIT]: 'Split code',
                }} label="Default mode"/>

                <fieldset>
                    <legend>Sizes</legend>

                    {this.props.state.height === 'auto' ||
                    <CheckBox popupKey={"allowResizeY"} right name="allowResizeY" onChange={this.props.setOption} defaultChecked={this.props.state.allowResizeY} label="Allow Height resize"/>
                    }
                    <CheckBox popupKey={"height"} name="height" onChange={this.props.setHeight} defaultChecked={this.props.state.height === 'auto'} label="Auto height"/>

                    {this.props.state.height === 'auto' ||
                    <Number
                        label="Height in pixels"
                        name="height"
                        onChange={this.props.setOption}
                        value={this.props.state.height}
                    />
                    }
                    {this.props.state.width === 'auto' ||
                    <CheckBox popupKey={"allowResizeX"} right name="allowResizeX" onChange={this.props.setOption} defaultChecked={this.props.state.allowResizeX} label="Allow Width resize"/>
                    }
                    <CheckBox popupKey={"width"} name="width" onChange={this.props.setWidth} defaultChecked={this.props.state.width === 'auto'} label="Auto width"/>

                    {this.props.state.width !== 'auto' ?
                        <Number
                            label="Width in pixels"
                            name="width"
                            onChange={this.props.setOption}
                            value={this.props.state.width}
                        /> : ''
                    }
                </fieldset>

                <fieldset>
                    <legend>Status bar</legend>
                    <CheckBox
                        popupKey={"showCharsCounter"}
                        name="showCharsCounter"
                        onChange={this.props.setOption}
                        defaultChecked={this.props.state.showCharsCounter}
                        label="Show chars counter"
                    />
                    <CheckBox
                        popupKey={"showWordsCounter"}
                        name="showWordsCounter"
                        onChange={this.props.setOption}
                        defaultChecked={this.props.state.showWordsCounter}
                        label="Show words counter"
                    />
                    <CheckBox
                        popupKey={"showXPathInStatusbar"}
                        name="showXPathInStatusbar"
                        onChange={this.props.setOption}
                        defaultChecked={this.props.state.showXPathInStatusbar}
                        label="Show path to selected element"
                    />
                </fieldset>
            </div>
        );
    }
}