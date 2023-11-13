import React, { useCallback } from 'react';

import style from './style.module.css';
import CheckBox from '../checkbox/CheckBox';

export function Plugins({ config, setOption, Jodit }) {
	const togglePlugin = useCallback(
		(value, pluginName) => {
			let plugins = Array.isArray(config.disablePlugins)
				? [...config.disablePlugins]
				: [...config.disablePlugins.split(/[\s,]+/)];

			plugins = plugins.filter(Boolean);

			if (plugins.indexOf(pluginName) === -1 && !value) {
				plugins.push(pluginName);
			}

			if (plugins.indexOf(pluginName) !== -1 && value) {
				plugins.splice(plugins.indexOf(pluginName), 1);
			}

			if (plugins.toString() !== config.disablePlugins.toString()) {
				setOption(
					plugins.length ? plugins.join(',') : [],
					'disablePlugins'
				);
			}
		},
		[config.disablePlugins, setOption]
	);

	const plugins = [...Jodit.plugins.__items.keys()]
		.sort()
		.map((pluginName) => (
			<CheckBox
				popupKey={'plugins/' + pluginName}
				key={pluginName}
				name={pluginName}
				onChange={togglePlugin}
				defaultChecked={
					config.disablePlugins.indexOf(pluginName) === -1
				}
				label={pluginName}
			/>
		));

	return <div className={style.main}>{plugins}</div>;
}
