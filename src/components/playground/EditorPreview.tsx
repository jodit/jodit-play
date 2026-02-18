import React from 'react';

import type { JoditStatic, PlaygroundConfig } from '../../types';
import { JoditEditor } from '../editor/JoditEditor';
import { Toggle } from '../controls/Toggle';

import s from './EditorPreview.module.css';

interface EditorPreviewProps {
	Jodit: JoditStatic;
	config: PlaygroundConfig;
	value: string;
	showLoremIpsum: boolean;
	onToggleLoremIpsum: (checked: boolean, name: string) => void;
	onEditorChange: (value: string) => void;
}

export const EditorPreview: React.FC<EditorPreviewProps> = ({
	Jodit,
	config,
	value,
	showLoremIpsum,
	onToggleLoremIpsum,
	onEditorChange
}) => {
	return (
		<div className={s.preview}>
			<div className={s.toolbar}>
				<Toggle
					name="showLoremIpsum"
					checked={showLoremIpsum}
					onChange={onToggleLoremIpsum}
					label="Show sample content"
				/>
			</div>
			<JoditEditor
				Jodit={Jodit}
				config={config as unknown as Record<string, unknown>}
				value={value}
				onChange={onEditorChange}
			/>
		</div>
	);
};
