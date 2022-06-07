import React, { Component } from 'react';
import Color from './Color';

export default class Themes extends Component {
	static resetStyles = null;

	getValue = (_, key) => {
		if (this.props.theme[key] !== undefined) {
			return this.props.theme[key];
		}
		return '';
	};

	setValue = (_, key, value) => {
		const state = { ...this.props.theme };

		if (state[key] !== value) {
			state[key] = value;
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

		Object.keys(state).forEach((variableName) => {
			let value = Themes.resetStyles[variableName]
				? Themes.resetStyles[variableName]
				: null;

			if (value !== state[variableName]) {
				css.push(`${variableName}: ${state[variableName]};`);
			}

			// // let elm = document.querySelector(selector);
			// css.push(`${selector.split(/,/g,).map((selector) => {
			//     if (selector === '.jodit_container') {
			//         return selector
			//     }
			//     return '.jodit_container ' + selector;
			// }).join(',\n')} {`);
			// let count = 0;
			//
			// Object.keys(state[selector]).forEach((key) => {
			//     key.split('|').forEach((subkey) => {
			//         let value = Themes.resetStyles[selector] ? Themes.resetStyles[selector][key] : null;
			//         if (value !== state[selector][key]) {
			//             css.push(`${Jodit.modules.Helpers.kebabCase(subkey)}: ${state[selector][key]};`);
			//             count += 1;
			//         }
			//     });
			// });
			// if (count) {
			//     css.push(`}`);
			// } else {
			//     css.pop();
			// }
		});

		return `:root {\n${css.join('\n')}\n}`;
	};

	componentDidMount() {
		if (!Themes.resetStyles) {
			const resetStyles = {};
			Object.keys(this.props.theme).forEach((key) => {
				resetStyles[key] = getComputedStyle(
					document.body
				).getPropertyValue(key);
			});
			Themes.resetStyles = resetStyles;
			const state = { ...Themes.resetStyles };
			this.props.setCSS(this.generateCss(state), state);
		}
	}

	render() {
		return (
			<div>
				{Object.keys(this.props.theme).map((key) => (
					<Color
						key={key}
						selector=""
						styleKey={key}
						color={this.getValue}
						title={key
							.replace('--jd-', '')
							.split('-')
							.map((a) => a[0].toUpperCase() + a.substring(1))
							.join(' ')}
						setColor={this.setValue}
					/>
				))}

				{/*<Color*/}
				{/*    selector=".jodit_icon,.jodit_toolbar .jodit_toolbar_btn>a"*/}
				{/*    styleKey="fill|color"*/}
				{/*    bindValue={this.setValue.bind(this, '.jodit_toolbar>li.jodit_toolbar_btn.jodit_with_dropdownlist .jodit_with_dropdownlist-trigger', 'border-top-color')}*/}
				{/*    color={this.getValue}*/}
				{/*    title="Toolbar icon color"*/}
				{/*    setColor={this.setValue}*/}
				{/*/>*/}
				{/*<Color*/}
				{/*    selector=".jodit_workplace,.jodit_toolbar,.jodit_statusbar,.jodit_toolbar>li.jodit_toolbar_btn.jodit_toolbar_btn-separator,.jodit_toolbar>li.jodit_toolbar_btn.jodit_toolbar_btn-break"*/}
				{/*    styleKey="borderColor"*/}
				{/*    color={this.getValue}*/}
				{/*    title="Toolbar border color"*/}
				{/*    setColor={this.setValue}*/}
				{/*/>*/}
				{/*<Color*/}
				{/*    selector=".jodit_container"*/}
				{/*    styleKey="backgroundColor"*/}
				{/*    color={this.getValue}*/}
				{/*    title="Editor background color"*/}
				{/*    setColor={this.setValue}*/}
				{/*/>*/}
				{/*<Color*/}
				{/*    selector=".jodit_wysiwyg"*/}
				{/*    styleKey="color"*/}
				{/*    bindValue={this.setValue.bind(this, '.jodit_placeholder', 'color')}*/}
				{/*    bindTransform={(color) => {*/}
				{/*        color = tinycolor(color);*/}
				{/*        color.setAlpha(.5);*/}
				{/*        return color.toHex8String();*/}
				{/*    }}*/}
				{/*    color={this.getValue}*/}
				{/*    title="Editor text color"*/}
				{/*    setColor={this.setValue}*/}
				{/*/>*/}
			</div>
		);
	}
}
