import React from 'react';

import type { PlaygroundConfig, SetOptionFn } from '../../../types';
import { Toggle } from '../../controls/Toggle';

interface StorageSectionProps {
	config: PlaygroundConfig;
	setOption: SetOptionFn;
}

export const StorageSection: React.FC<StorageSectionProps> = ({
	config,
	setOption
}) => {
	const handleToggle = (checked: boolean, name: string): void => {
		setOption(checked, name);
	};

	return (
		<>
			<Toggle
				name="saveHeightInStorage"
				checked={config.saveHeightInStorage}
				onChange={handleToggle}
				label="Save height in storage"
			/>

			<Toggle
				name="saveModeInStorage"
				checked={config.saveModeInStorage}
				onChange={handleToggle}
				label="Save mode in storage"
			/>
		</>
	);
};
