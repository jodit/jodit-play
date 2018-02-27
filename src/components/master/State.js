import React, { Component } from 'react';
import List from "../list/List";
import CheckBox from "../checkbox/CheckBox";

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
                    'insert_as_html' : 'Insert as HTML',
                    'insert_as_text' : 'Insert as plain text',
                }} label="Default insert method"/>
            </div>
        )
    }
}