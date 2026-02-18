import React from 'react';

import type { PlaygroundConfig, SetOptionFn } from '../../../types';
import { Toggle } from '../../controls/Toggle';

interface UploaderSectionProps {
	config: PlaygroundConfig;
	setOption: SetOptionFn;
}

export const UploaderSection: React.FC<UploaderSectionProps> = ({
	config,
	setOption
}) => {
	const handleToggle = (checked: boolean, name: string): void => {
		setOption(checked, name);
	};

	return (
		<Toggle
			name="uploader.insertImageAsBase64URI"
			checked={config.uploader.insertImageAsBase64URI}
			onChange={handleToggle}
			label="Insert image as Base64 URI"
		/>
	);
};
