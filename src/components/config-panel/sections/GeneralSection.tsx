import React from 'react';

import type {
	JoditStatic,
	PlaygroundConfig,
	SetOptionFn
} from '../../../types';
import { Toggle } from '../../controls/Toggle';
import { SelectInput } from '../../controls/SelectInput';
import { TextInput } from '../../controls/TextInput';
import { NumberInput } from '../../controls/NumberInput';

interface GeneralSectionProps {
	Jodit: JoditStatic;
	config: PlaygroundConfig;
	setOption: SetOptionFn;
}

export const GeneralSection: React.FC<GeneralSectionProps> = ({
	Jodit,
	config,
	setOption
}) => {
	const handleToggle = (checked: boolean, name: string): void => {
		setOption(checked, name);
	};

	const languages = ['Auto', ...Object.keys(Jodit.lang)];

	return (
		<>
			<SelectInput
				name="preset"
				value={config.preset ?? 'custom'}
				onChange={setOption}
				list={{ custom: 'None', inline: 'Inline Mode' }}
				label="Preset"
			/>

			<Toggle
				name="autofocus"
				checked={config.autofocus}
				onChange={handleToggle}
				label="Autofocus"
			/>

			{config.autofocus && (
				<SelectInput
					name="cursorAfterAutofocus"
					value={config.cursorAfterAutofocus ?? 'end'}
					onChange={setOption}
					list={{ start: 'Start', end: 'End' }}
					label="Cursor position after autofocus"
				/>
			)}

			<Toggle
				name="useSearch"
				checked={config.useSearch}
				onChange={handleToggle}
				label="Use search"
			/>

			<Toggle
				name="spellcheck"
				checked={config.spellcheck}
				onChange={handleToggle}
				label="Spell check"
			/>

			<SelectInput
				name="direction"
				value={config.direction}
				onChange={setOption}
				list={{ '': 'Auto', rtl: 'RTL', ltr: 'LTR' }}
				label="Direction"
			/>

			<SelectInput
				name="language"
				value={config.language}
				onChange={setOption}
				list={languages}
				label="Language"
			/>

			<SelectInput
				name="enter"
				value={config.enter}
				onChange={setOption}
				list={{
					P: 'Paragraph (P)',
					DIV: 'Block (DIV)',
					BR: 'Break (BR)'
				}}
				label="Enter element"
			/>

			<SelectInput
				name="defaultMode"
				value={config.defaultMode}
				onChange={setOption}
				list={{
					[Jodit.constants.MODE_WYSIWYG]: 'WYSIWYG',
					[Jodit.constants.MODE_SOURCE]: 'Source code',
					[Jodit.constants.MODE_SPLIT]: 'Split mode'
				}}
				label="Default mode"
			/>

			<TextInput
				name="placeholder"
				value={config.placeholder ?? ''}
				onChange={setOption}
				label="Placeholder text"
				placeholder="Type something..."
			/>

			<Toggle
				name="showPlaceholder"
				checked={config.showPlaceholder !== false}
				onChange={handleToggle}
				label="Show placeholder"
			/>

			<Toggle
				name="disabled"
				checked={config.disabled === true}
				onChange={handleToggle}
				label="Disabled"
			/>

			<Toggle
				name="inline"
				checked={config.inline === true}
				onChange={handleToggle}
				label="Inline editing mode"
			/>

			<Toggle
				name="cache"
				checked={config.cache !== false}
				onChange={handleToggle}
				label="Enable caching"
			/>

			<NumberInput
				name="tabIndex"
				value={config.tabIndex ?? -1}
				onChange={setOption as (value: number, name: string) => void}
				label="Tab index"
			/>
		</>
	);
};
