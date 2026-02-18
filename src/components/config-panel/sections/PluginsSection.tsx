import React, { useCallback } from 'react';

import type {
	JoditStatic,
	PlaygroundConfig,
	SetOptionFn
} from '../../../types';
import { Toggle } from '../../controls/Toggle';

import s from './PluginsSection.module.css';

interface PluginsSectionProps {
	Jodit: JoditStatic;
	config: PlaygroundConfig;
	setOption: SetOptionFn;
}

export const PluginsSection: React.FC<PluginsSectionProps> = ({
	Jodit,
	config,
	setOption
}) => {
	const getDisabledList = useCallback((): string[] => {
		if (Array.isArray(config.disablePlugins)) {
			return [...config.disablePlugins];
		}

		if (typeof config.disablePlugins === 'string') {
			return config.disablePlugins.split(/[\s,]+/).filter(Boolean);
		}

		return [];
	}, [config.disablePlugins]);

	const togglePlugin = useCallback(
		(enabled: boolean, pluginName: string) => {
			const plugins = getDisabledList();

			if (!enabled && plugins.indexOf(pluginName) === -1) {
				plugins.push(pluginName);
			}

			if (enabled && plugins.indexOf(pluginName) !== -1) {
				plugins.splice(plugins.indexOf(pluginName), 1);
			}

			setOption(
				plugins.length > 0 ? plugins.join(',') : [],
				'disablePlugins'
			);
		},
		[getDisabledList, setOption]
	);

	const pluginNames = [...Jodit.plugins.__items.keys()].sort();
	const disabledList = getDisabledList();

	return (
		<div className={s.grid}>
			{pluginNames.map(pluginName => (
				<Toggle
					key={pluginName}
					name={pluginName}
					checked={disabledList.indexOf(pluginName) === -1}
					onChange={togglePlugin}
					label={pluginName}
				/>
			))}
		</div>
	);
};
