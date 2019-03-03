import React, { Component } from 'react';
import reactCSS from 'reactcss'
// import styles from "./style.module.css";
import { SketchPicker } from 'react-color';

export default class extends Component {
    state = {
        displayColorPicker: false,
    };
    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    setColor = (color) => {
        this.setState({ color: color.rgb });
        this.props.setColor(this.props.selector, this.props.styleKey, color.hex);
        if (this.props.bindValue) {
            this.props.bindValue(this.props.bindTransform ? this.props.bindTransform(color.hex) : color.hex);
        }
    };

    render() {
        let color = typeof this.props.color === 'function' ? this.props.color(this.props.selector, this.props.styleKey) : this.props.color;

        const styles = reactCSS({
            'default': {
                box: {
                    marginBottom: '10px'
                },
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: color || 'black',
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                    marginRight: '10px'
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div style={ styles.box }>
                <label style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color } />
                </label>
                {this.props.title}
                { this.state.displayColorPicker ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ this.handleClose }/>
                    <SketchPicker color={ this.state.color } onChange={ this.setColor } />
                </div> : null }

            </div>
        )
        // return <label className={styles.color}>
        //
        //     <SketchPicker onChangeComplete={this.setColor}/> {this.props.title};
        //     <input defaultValue={this.props.color} type="text" onChange={this.setColor}/> {this.props.title}
        // </label>;
    }
}