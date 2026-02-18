import React, { useCallback } from 'react';

import type { PlaygroundConfig, SetOptionFn } from '../../../types';
import { Toggle } from '../../controls/Toggle';
import { NumberInput } from '../../controls/NumberInput';
import { SelectInput } from '../../controls/SelectInput';

interface DimensionsSectionProps {
	config: PlaygroundConfig;
	height: number;
	width: number;
	setOption: SetOptionFn;
	setHeight: (auto: boolean) => void;
	setWidth: (auto: boolean) => void;
}

export const DimensionsSection: React.FC<DimensionsSectionProps> = ({
	config,
	height,
	width,
	setOption,
	setHeight,
	setWidth
}) => {
	const handleToggle = useCallback(
		(checked: boolean, name: string): void => {
			setOption(checked, name);
		},
		[setOption]
	);

	const isAutoHeight = config.height === 'auto';
	const isAutoWidth = config.width === 'auto';

	return (
		<>
			<Toggle
				name="height"
				checked={isAutoHeight}
				onChange={setHeight}
				label="Auto height"
			/>

			{!isAutoHeight && (
				<>
					<NumberInput
						name="height"
						value={height}
						onChange={
							setOption as (value: number, name: string) => void
						}
						label="Height (px)"
						min={50}
					/>

					<Toggle
						name="allowResizeY"
						checked={config.allowResizeY}
						onChange={handleToggle}
						label="Allow vertical resize"
					/>
				</>
			)}

			<NumberInput
				name="minHeight"
				value={config.minHeight}
				onChange={setOption as (value: number, name: string) => void}
				label="Min height (px)"
				min={0}
			/>

			<NumberInput
				name="maxHeight"
				value={config.maxHeight}
				onChange={setOption as (value: number, name: string) => void}
				label="Max height (px)"
				min={0}
			/>

			<Toggle
				name="width"
				checked={isAutoWidth}
				onChange={setWidth}
				label="Auto width"
			/>

			{!isAutoWidth && (
				<>
					<NumberInput
						name="width"
						value={width}
						onChange={
							setOption as (value: number, name: string) => void
						}
						label="Width (px)"
						min={50}
					/>

					<Toggle
						name="allowResizeX"
						checked={config.allowResizeX}
						onChange={handleToggle}
						label="Allow horizontal resize"
					/>
				</>
			)}

			<NumberInput
				name="minWidth"
				value={config.minWidth}
				onChange={setOption as (value: number, name: string) => void}
				label="Min width (px)"
				min={0}
			/>

			<NumberInput
				name="maxWidth"
				value={config.maxWidth}
				onChange={setOption as (value: number, name: string) => void}
				label="Max width (px)"
				min={0}
			/>

			<SelectInput
				name="defaultFontSizePoints"
				value={config.defaultFontSizePoints}
				onChange={setOption}
				list={{ pt: 'Points', px: 'Pixels' }}
				label="Font size units"
			/>

			<Toggle
				name="fullsize"
				checked={config.fullsize === true}
				onChange={handleToggle}
				label="Full-screen mode"
			/>
		</>
	);
};
