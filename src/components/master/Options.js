import React, { Component } from 'react';
import Jodit from "jodit";
import List from "../list/List";
import Number from "../number/Number";
import CheckBox from "../checkbox/CheckBox";

export default class Options extends Component {
    render() {
        return (
            <div>
                <CheckBox name="toolbar" onChange={this.props.setOption} defaultChecked={Jodit.defaultOptions.toolbar} label="Show Toolbar"/>
                {this.props.state.toolbar === false ||
                <CheckBox
                    name="textIcons"
                    onChange={this.props.setOption}
                    defaultChecked={Jodit.defaultOptions.textIcons}
                    label="Text Icons"
                />
                }
                <CheckBox name="readonly" onChange={this.props.setOption} defaultChecked={Jodit.defaultOptions.readonly} label="Read Only"/>

                <CheckBox name="spellcheck" onChange={this.props.setOption} defaultChecked={Jodit.defaultOptions.spellcheck} label="Spell Check"/>

                <List name="language" onChange={this.props.setOption} list={['Auto', ...Object.keys(Jodit.lang)]} label="Language"/>

                <List name="theme" onChange={this.props.setOption} list={{
                    'default' : 'Default',
                    'dark' : 'Dark',
                }} label="Theme"/>
                {this.props.state.toolbar === false ||
                <List name="toolbarButtonSize" value={Jodit.defaultOptions.toolbarButtonSize}
                      onChange={this.props.setOption} list={[
                    "small", "middle", "large"
                ]} label="Size of icons"/>
                }
                <List name="enter" value={Jodit.defaultOptions.enter} onChange={this.props.setOption} list={{
                    "P": 'Paragraph (P)',
                    "DIV": 'Block (DIV)',
                    "BR": 'Break (BR)',
                }} label="Element that will be created on Enter"/>


                <List name="defaultMode" value={Jodit.defaultOptions.defaultMode} onChange={this.props.setOption} list={{
                    [Jodit.MODE_WYSIWYG]: 'WYSIWYG',
                    [Jodit.MODE_SOURCE]: 'Source code',
                    [Jodit.MODE_SPLIT]: 'Split code',
                }} label="Default mode"/>

                {this.props.state.height === 'auto' ||
                <CheckBox right name="allowResizeY" onChange={this.props.setOption} defaultChecked={Jodit.defaultOptions.allowResizeY} label="Allow Height resize"/>
                }
                <CheckBox name="height" onChange={this.props.setHeight} defaultChecked={Jodit.defaultOptions.height === 'auto'} label="Auto height"/>

                {this.props.state.height === 'auto' ||
                <Number
                    label="Height in pixels"
                    name="height"
                    onChange={this.props.setOption}
                    value={this.props.height}
                />
                }
                {this.props.state.width === 'auto' ||
                <CheckBox right name="allowResizeX" onChange={this.props.setOption} defaultChecked={Jodit.defaultOptions.allowResizeX} label="Allow Width resize"/>
                }
                <CheckBox name="width" onChange={this.props.setWidth} defaultChecked={Jodit.defaultOptions.width === 'auto'} label="Auto width"/>

                {this.props.state.width !== 'auto' ?
                    <Number
                        label="Width in pixels"
                        name="width"
                        onChange={this.props.setOption}
                        value={this.props.width}
                    /> : ''
                }
            </div>
        );
    }
}