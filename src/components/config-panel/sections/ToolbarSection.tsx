import React from 'react';

import type { PlaygroundConfig, SetOptionFn } from '../../../types';
import { Toggle } from '../../controls/Toggle';
import { SelectInput } from '../../controls/SelectInput';
import { NumberInput } from '../../controls/NumberInput';

interface ToolbarSectionProps {
	config: PlaygroundConfig;
	setOption: SetOptionFn;
}

export const ToolbarSection: React.FC<ToolbarSectionProps> = ({
	config,
	setOption
}) => {
	const handleToggle = (checked: boolean, name: string): void => {
		setOption(checked, name);
	};

	return (
		<>
			<Toggle
				name="toolbar"
				checked={config.toolbar}
				onChange={handleToggle}
				label="Show toolbar"
			/>

			{config.toolbar !== false && (
				<>
					<Toggle
						name="textIcons"
						checked={config.textIcons}
						onChange={handleToggle}
						label="Text icons"
					/>

					<SelectInput
						name="toolbarButtonSize"
						value={config.toolbarButtonSize}
						onChange={setOption}
						list={['tiny', 'xsmall', 'small', 'middle', 'large']}
						label="Button size"
					/>

					<Toggle
						name="toolbarSticky"
						checked={config.toolbarSticky}
						onChange={handleToggle}
						label="Sticky toolbar"
					/>

					{config.toolbarSticky && (
						<NumberInput
							name="toolbarStickyOffset"
							value={config.toolbarStickyOffset}
							onChange={
								setOption as (
									value: number,
									name: string
								) => void
							}
							label="Sticky offset (px)"
							min={0}
						/>
					)}

					<Toggle
						name="toolbarAdaptive"
						checked={config.toolbarAdaptive}
						onChange={handleToggle}
						label="Toolbar adaptive"
					/>

					<Toggle
						name="showTooltip"
						checked={config.showTooltip !== false}
						onChange={handleToggle}
						label="Show tooltips"
					/>

					{config.showTooltip !== false && (
						<>
							<NumberInput
								name="showTooltipDelay"
								value={
									(config.showTooltipDelay as number) ?? 500
								}
								onChange={
									setOption as (
										value: number,
										name: string
									) => void
								}
								label="Tooltip delay (ms)"
								min={0}
								step={100}
							/>

							<Toggle
								name="useNativeTooltip"
								checked={config.useNativeTooltip === true}
								onChange={handleToggle}
								label="Use native tooltips"
							/>
						</>
					)}

					<Toggle
						name="toolbarInline"
						checked={config.toolbarInline === true}
						onChange={handleToggle}
						label="Inline floating toolbar"
					/>

					<Toggle
						name="toolbarInlineForSelection"
						checked={config.toolbarInlineForSelection === true}
						onChange={handleToggle}
						label="Show toolbar on text selection"
					/>
				</>
			)}
		</>
	);
};
