import React, { PureComponent } from 'react';
import style from './style.module.css';
import CheckBox from '../checkbox/CheckBox';

export class Plugins extends PureComponent {
	togglePlugin = (value, pluginName) => {
		let plugins = Array.isArray(this.props.config.disablePlugins)
			? [...this.props.config.disablePlugins]
			: [...this.props.config.disablePlugins.split(/[\s,]+/)];

		plugins = plugins.filter(Boolean);

		if (plugins.indexOf(pluginName) === -1 && !value) {
			plugins.push(pluginName);
		}

		if (plugins.indexOf(pluginName) !== -1 && value) {
			plugins.splice(plugins.indexOf(pluginName), 1);
		}

		if (
			plugins.toString() !== this.props.config.disablePlugins.toString()
		) {
			this.props.setOption(
				plugins.length ? plugins.join(',') : [],
				'disablePlugins'
			);
		}
	};

	render() {
		const plugins = [...this.props.Jodit.plugins.__items.keys()]
			.sort()
			.map((pluginName) => (
				<CheckBox
					popupKey={'plugins/' + pluginName}
					key={pluginName}
					name={pluginName}
					onChange={this.togglePlugin}
					defaultChecked={
						this.props.config.disablePlugins.indexOf(pluginName) ===
						-1
					}
					label={pluginName}
				/>
			));

		return <div className={style.main}>{plugins}</div>;
	}
}
