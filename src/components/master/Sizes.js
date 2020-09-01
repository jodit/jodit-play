import React, {Component} from 'react';
import CheckBox from "../checkbox/CheckBox";
import Number from "../number/Number";
import List from "../list/List";

export default class Sizes extends Component {
    render() {
        return <>

            <fieldset>
                <legend>Sizes</legend>

                {this.props.state.height === 'auto' ||
                <CheckBox popupKey={"allowResizeY"} right name="allowResizeY" onChange={this.props.setOption}
                          checked={this.props.state.allowResizeY} label="Allow Height resize"/>
                }
                <CheckBox popupKey={"height"} name="height" onChange={this.props.setHeight}
                          checked={this.props.state.height === 'auto'} label="Auto height"/>

                {this.props.state.height === 'auto' ||
                <Number
                    label="Height in pixels"
                    name="height"
                    onChange={this.props.setOption}
                    value={this.props.state.height}
                />
                }
                <Number
                    label="Min height(px)"
                    name="minHeight"
                    onChange={this.props.setOption}
                    value={this.props.state.minHeight}
                />
                <Number
                    label="Max height(px)"
                    name="maxHeight"
                    onChange={this.props.setOption}
                    value={this.props.state.maxHeight}
                />
                {this.props.state.width === 'auto' ||
                <CheckBox popupKey={"allowResizeX"} right name="allowResizeX" onChange={this.props.setOption}
                          checked={this.props.state.allowResizeX} label="Allow Width resize"/>
                }
                <CheckBox popupKey={"width"} name="width" onChange={this.props.setWidth}
                          checked={this.props.state.width === 'auto'} label="Auto width"/>
                <Number
                    label="Min width(px)"
                    name="minWidth"
                    onChange={this.props.setOption}
                    value={this.props.state.minWidth}
                />
                <Number
                    label="Max width(px)"
                    name="maxWidth"
                    onChange={this.props.setOption}
                    value={this.props.state.maxWidth}
                />

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
                <legend>Units</legend>
                <List name="defaultFontSizePoints" value={this.props.state.defaultFontSizePoints}
                      onChange={this.props.setOption} list={{
                    pt: 'Points',
                    px: 'Pixels',
                }} label="Font size units"/>
            </fieldset>
        </>
    }
}