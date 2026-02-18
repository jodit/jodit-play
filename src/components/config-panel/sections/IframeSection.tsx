import React from 'react';

import type { PlaygroundConfig, SetOptionFn } from '../../../types';
import { Toggle } from '../../controls/Toggle';
import { UrlInput } from '../../controls/UrlInput';
import { TextInput } from '../../controls/TextInput';
import { UrlListInput } from '../../controls/UrlListInput';

interface IframeSectionProps {
	config: PlaygroundConfig;
	setOption: SetOptionFn;
}

export const IframeSection: React.FC<IframeSectionProps> = ({
	config,
	setOption
}) => {
	const handleToggle = (checked: boolean, name: string): void => {
		setOption(checked, name);
	};

	return (
		<>
			<Toggle
				name="iframe"
				checked={config.iframe}
				onChange={handleToggle}
				label="Enable iframe mode"
			/>

			{config.iframe && (
				<>
					<UrlInput
						name="iframeBaseUrl"
						value={config.iframeBaseUrl}
						onChange={
							setOption as (value: string, name: string) => void
						}
						label="Iframe Base URL"
					/>

					<TextInput
						name="iframeStyle"
						value={config.iframeStyle}
						onChange={
							setOption as (value: string, name: string) => void
						}
						label="Iframe default style"
						multiline
					/>

					<UrlListInput
						name="iframeCSSLinks"
						value={config.iframeCSSLinks}
						onChange={
							setOption as (value: string[], name: string) => void
						}
						label="External CSS files"
					/>
				</>
			)}
		</>
	);
};
