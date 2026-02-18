import React, { useEffect, useRef, useState } from 'react';

import type { JoditStatic, JoditInstance } from '../../types';

import s from './JoditEditor.module.css';

interface JoditEditorProps {
	Jodit: JoditStatic;
	config: Record<string, unknown>;
	value: string;
	onChange?: (value: string) => void;
}

export const JoditEditor: React.FC<JoditEditorProps> = ({
	Jodit,
	config,
	value,
	onChange
}) => {
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
	const editorRef = useRef<JoditInstance | null>(null);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const element = textAreaRef.current;

		if (!element) {
			return;
		}

		let destructed = false;

		const init = (): void => {
			if (destructed) {
				return;
			}

			editorRef.current = Jodit.make(element, config);
			setLoading(false);

			editorRef.current.events.on('change', (val: string) => {
				if (onChange) {
					onChange(val);
				}
			});
		};

		init();

		return () => {
			destructed = true;

			if (editorRef.current) {
				editorRef.current.destruct();
				editorRef.current = null;
			}
		};
	}, [config, Jodit, onChange]);

	useEffect(() => {
		if (editorRef.current && editorRef.current.value !== value) {
			editorRef.current.value = value;
		}
	}, [value]);

	return (
		<div className={isLoading ? s.loading : s.ready}>
			<div className={s.spinner}>
				<div className={s.dot} />
			</div>
			<textarea ref={textAreaRef} className={s.area} />
		</div>
	);
};
