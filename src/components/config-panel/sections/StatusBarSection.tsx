import React from 'react';

import type { PlaygroundConfig, SetOptionFn } from '../../../types';
import { Toggle } from '../../controls/Toggle';

interface StatusBarSectionProps {
	config: PlaygroundConfig;
	setOption: SetOptionFn;
}

export const StatusBarSection: React.FC<StatusBarSectionProps> = ({
	config,
	setOption
}) => {
	const handleToggle = (checked: boolean, name: string): void => {
		setOption(checked, name);
	};

	return (
		<>
			<Toggle
				name="statusbar"
				checked={config.statusbar !== false}
				onChange={handleToggle}
				label="Show status bar"
			/>

			{config.statusbar !== false && (
				<>
					<Toggle
						name="showCharsCounter"
						checked={config.showCharsCounter}
						onChange={handleToggle}
						label="Show chars counter"
					/>

					<Toggle
						name="showWordsCounter"
						checked={config.showWordsCounter}
						onChange={handleToggle}
						label="Show words counter"
					/>

					<Toggle
						name="showXPathInStatusbar"
						checked={config.showXPathInStatusbar}
						onChange={handleToggle}
						label="Show element path"
					/>

					<Toggle
						name="hidePoweredByJodit"
						checked={config.hidePoweredByJodit === true}
						onChange={handleToggle}
						label='Hide "Powered by Jodit"'
					/>
				</>
			)}
		</>
	);
};
