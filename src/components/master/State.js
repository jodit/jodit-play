import React, { Component } from 'react';
import List from "../list/List";
import CheckBox from "../checkbox/CheckBox";
import Jodit from 'jodit';

export default class state extends Component {
    render() {
        return (
            <div>
                <CheckBox
                    name="saveHeightInStorage"
                    onChange={this.props.setOption}
                    defaultChecked={this.props.config.saveHeightInStorage}
                    label="Save height in storage"
                />
                <CheckBox
                    name="saveModeInStorage"
                    onChange={this.props.setOption}
                    defaultChecked={this.props.config.saveModeInStorage}
                    label="Save mode in storage"
                />
                <hr/>
                <CheckBox
                    name="askBeforePasteHTML"
                    onChange={this.props.setOption}
                    defaultChecked={this.props.config.askBeforePasteHTML}
                    label="Ask before paste HTML"
                />
                <CheckBox
                    name="askBeforePasteFromWord"
                    onChange={this.props.setOption}
                    defaultChecked={this.props.config.askBeforePasteFromWord}
                    label="Ask before paste from Word/Excel"
                />
                <List value={this.props.config.defaultActionOnPaste} name="defaultActionOnPaste" onChange={this.props.setOption} list={{
                    [Jodit.INSERT_AS_HTML] : 'Insert as HTML',
                    [Jodit.INSERT_CLEAR_HTML] : 'Insert cleared HTML',
                    [Jodit.INSERT_AS_TEXT] : 'Insert as plain text',
                    [Jodit.INSERT_ONLY_TEXT] : 'Insert only text',
                }} label="Default insert method"/>
            </div>
        )
    }
}