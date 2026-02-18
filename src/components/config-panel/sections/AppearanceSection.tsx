import React, { useCallback, useEffect, useRef } from 'react';

import type { PlaygroundConfig, SetOptionFn, ThemeState } from '../../../types';
import { SelectInput } from '../../controls/SelectInput';
import { NumberInput } from '../../controls/NumberInput';
import { TextInput } from '../../controls/TextInput';
import { ColorPicker } from '../../controls/ColorPicker';

interface AppearanceSectionProps {
	config: PlaygroundConfig;
	theme: ThemeState;
	setOption: SetOptionFn;
	setCSS: (css: string, theme: ThemeState) => void;
}

const THEME_VARS: Record<string, string> = {
	'--jd-color-background-default': 'Background',
	'--jd-color-border': 'Border',
	'--jd-color-panel': 'Panel',
	'--jd-color-icon': 'Icon'
};

export const AppearanceSection: React.FC<AppearanceSectionProps> = ({
	config,
	theme,
	setOption,
	setCSS
}) => {
	const resetStylesRef = useRef<Record<string, string> | null>(null);

	useEffect(() => {
		if (!resetStylesRef.current && typeof window !== 'undefined') {
			const rs: Record<string, string> = {};

			for (const key of Object.keys(THEME_VARS)) {
				rs[key] = getComputedStyle(document.body).getPropertyValue(key);
			}

			resetStylesRef.current = rs;
		}
	}, []);

	const generateCss = useCallback((state: ThemeState): string => {
		const lines: string[] = [];
		const reset = resetStylesRef.current ?? {};

		for (const varName of Object.keys(state)) {
			const original = reset[varName] ?? null;

			if (original !== state[varName]) {
				lines.push(`${varName}: ${state[varName]};`);
			}
		}

		return `:root {\n${lines.join('\n')}\n}`;
	}, []);

	const handleColorChange = useCallback(
		(styleKey: string, color: string) => {
			const newTheme = { ...theme, [styleKey]: color };
			setCSS(generateCss(newTheme), newTheme);
		},
		[theme, setCSS, generateCss]
	);

	return (
		<>
			<SelectInput
				name="theme"
				value={config.theme}
				onChange={setOption}
				list={{ default: 'Default', dark: 'Dark' }}
				label="Theme"
			/>

			{config.theme === 'default' && (
				<>
					{Object.keys(THEME_VARS).map(varName => (
						<ColorPicker
							key={varName}
							styleKey={varName}
							label={THEME_VARS[varName]}
							color={theme[varName] ?? '#000000'}
							onChange={handleColorChange}
						/>
					))}
				</>
			)}

			<NumberInput
				name="zIndex"
				value={(config.zIndex as number) ?? 0}
				onChange={setOption as (value: number, name: string) => void}
				label="z-index"
				min={0}
			/>

			<TextInput
				name="className"
				value={config.className ?? ''}
				onChange={setOption as (value: string, name: string) => void}
				label="Custom CSS class"
				placeholder="my-editor"
			/>

			<TextInput
				name="editorClassName"
				value={config.editorClassName ?? ''}
				onChange={setOption as (value: string, name: string) => void}
				label="Editor area CSS class"
				placeholder="my-editor-area"
			/>

			<NumberInput
				name="defaultLineHeight"
				value={(config.defaultLineHeight as number) ?? 0}
				onChange={setOption as (value: number, name: string) => void}
				label="Default line height (0 = auto)"
				min={0}
				step={0.1}
			/>
		</>
	);
};
