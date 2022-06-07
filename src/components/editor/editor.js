import s from './editor.module.css';

import React, { useEffect, useRef, forwardRef, useLayoutEffect, useState } from 'react';
import { func, number, object, string } from 'prop-types';
import 'jodit/build/jodit.es2018.min.css';

function isIE() {
	return typeof navigator !== 'undefined' &&
    (navigator.userAgent.match(/MSIE|Internet Explorer/i) ||
        navigator.userAgent.match(/Trident\/7\..*?rv:11/i));
}

let loadJoditPromise;
export async function loadJoditEditor() {
	if (!loadJoditPromise) {
		if (!isIE()) {
			loadJoditPromise = import('jodit/build/jodit.es2018.min');
		} else {
			loadJoditPromise = import('jodit/build/jodit.min');
		}
	}

	const { Jodit } = await loadJoditPromise;

	if (!isIE()) {
		// import('jodit/build/plugins/speech/speech-recognize/speech-recognize.es2018.en.min.css');
		// const { SpeechRecognizeNative } = await import('jodit/build/plugins/speech/speech-recognize/speech-recognize.es2018.en.min');
		// Jodit.plugins.add('speech-recognize', SpeechRecognizeNative);
		// Jodit.defaultOptions.speechRecognize.lang = ''
	}

	return Jodit;
}

const JoditEditor = forwardRef((props, ref) => {
	const { config, id, name, onBlur, onChange, tabIndex, value, editorRef, children } =
		props;

	const [isLoading, setLoading] = useState(true);
	const textArea = useRef(null);
	const div = useRef(null);

	useLayoutEffect(() => {
		if (ref) {
			if (typeof ref === 'function') {
				ref(textArea.current);
			} else {
				ref.current = textArea.current;
			}
		}
	}, [ref]);

	useEffect(() => {
		const element = textArea.current;

		let destructed = false;

		async function loadAndInit() {
			const Jodit = await loadJoditEditor();

			if (destructed) {
				return;
			}

			textArea.current = Jodit.make(element, config);
			setLoading(false);
			textArea.current.workplace.tabIndex = tabIndex || -1;

			// adding event handlers
			textArea.current.events.on('blur', (value) => onBlur && onBlur(value));
			textArea.current.events.on(
				'change',
				(value) => onChange && onChange(value)
			);

			if (id) element.id = id;
			if (name) element.name = name;

			if (typeof editorRef === 'function') {
				editorRef(textArea.current);
			}
		}

		void loadAndInit();

		return () => {
			destructed = true;

			if (textArea.current && textArea.current.destruct) {
				textArea.current.destruct();
			}

			textArea.current = element;
		};
	}, [editorRef, config, id, value, onBlur, onChange, name, tabIndex]);

	useEffect(() => {
		if (textArea?.current?.value !== value) {
			textArea.current.value = value;
		}
	}, [value]);

	return (
		<div className={isLoading ? s.loading : s.finish}>
			<div className={s.box}>
				<div className={s.spinner}>
					<div/>
				</div>
			</div>
			<textarea className={s.area} id={id} ref={textArea}/>
			<div style={{ display: 'none' }} id={id} ref={div}>
				{children}
			</div>
		</div>
	);
});

JoditEditor.propTypes = {
	config: object,
	id: string,
	name: string,
	onBlur: func,
	onChange: func,
	editorRef: func,
	tabIndex: number,
	value: string
};

export default JoditEditor;
