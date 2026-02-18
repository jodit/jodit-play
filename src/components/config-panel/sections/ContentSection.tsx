import React from 'react';

import type {
	JoditStatic,
	PlaygroundConfig,
	SetOptionFn
} from '../../../types';
import { Toggle } from '../../controls/Toggle';
import { SelectInput } from '../../controls/SelectInput';
import { NumberInput } from '../../controls/NumberInput';

interface ContentSectionProps {
	Jodit: JoditStatic;
	config: PlaygroundConfig;
	setOption: SetOptionFn;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
	Jodit,
	config,
	setOption
}) => {
	const handleToggle = (checked: boolean, name: string): void => {
		setOption(checked, name);
	};

	return (
		<>
			<Toggle
				name="readonly"
				checked={config.readonly}
				onChange={handleToggle}
				label="Read only"
			/>

			<Toggle
				name="askBeforePasteHTML"
				checked={config.askBeforePasteHTML}
				onChange={handleToggle}
				label="Ask before paste HTML"
			/>

			<Toggle
				name="askBeforePasteFromWord"
				checked={config.askBeforePasteFromWord}
				onChange={handleToggle}
				label="Ask before paste from Word/Excel"
			/>

			<SelectInput
				name="defaultActionOnPaste"
				value={config.defaultActionOnPaste}
				onChange={setOption}
				list={{
					[Jodit.constants.INSERT_AS_HTML]: 'Insert as HTML',
					[Jodit.constants.INSERT_CLEAR_HTML]: 'Insert cleared HTML',
					[Jodit.constants.INSERT_AS_TEXT]: 'Insert as plain text',
					[Jodit.constants.INSERT_ONLY_TEXT]: 'Insert only text'
				}}
				label="Default paste method"
			/>

			<Toggle
				name="beautifyHTML"
				checked={config.beautifyHTML !== false}
				onChange={handleToggle}
				label="Beautify HTML"
			/>

			<Toggle
				name="nl2brInPlainText"
				checked={config.nl2brInPlainText !== false}
				onChange={handleToggle}
				label="Newlines to &lt;br&gt; in plain text"
			/>

			<Toggle
				name="addNewLine"
				checked={config.addNewLine !== false}
				onChange={handleToggle}
				label="Show helper line between blocks"
			/>

			<NumberInput
				name="limitWords"
				value={
					typeof config.limitWords === 'number'
						? config.limitWords
						: 0
				}
				onChange={setOption as (value: number, name: string) => void}
				label="Word limit (0 = unlimited)"
				min={0}
			/>

			<NumberInput
				name="limitChars"
				value={
					typeof config.limitChars === 'number'
						? config.limitChars
						: 0
				}
				onChange={setOption as (value: number, name: string) => void}
				label="Character limit (0 = unlimited)"
				min={0}
			/>

			<Toggle
				name="memorizeChoiceWhenPasteFragment"
				checked={config.memorizeChoiceWhenPasteFragment !== false}
				onChange={handleToggle}
				label="Remember paste choice"
			/>

			<Toggle
				name="scrollToPastedContent"
				checked={config.scrollToPastedContent !== false}
				onChange={handleToggle}
				label="Scroll to pasted content"
			/>
		</>
	);
};
