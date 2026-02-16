import React, { useEffect, useRef, useState } from 'react';
import { func, number, object, string } from 'prop-types';

import s from './editor.module.css';

const JoditEditor = (props) => {
	const {
		config,
		id,
		name,
		onBlur,
		onChange,
		tabIndex,
		value,
		children,
		Jodit
	} = props;

	const [isLoading, setLoading] = useState(true);
	const textArea = useRef(null);
	const div = useRef(null);

	useEffect(() => {
		const element = textArea.current;

		let destructed = false;

		async function loadAndInit() {
			if (destructed) {
				return;
			}

			textArea.current = Jodit.make(element, config);
			setLoading(false);
			textArea.current.workplace.tabIndex = tabIndex || -1;

			// adding event handlers
			textArea.current.events.on(
				'blur',
				(value) => onBlur && onBlur(value)
			);
			textArea.current.events.on(
				'change',
				(value) => onChange && onChange(value)
			);

			if (id) element.id = id;
			if (name) element.name = name;
		}

		void loadAndInit();

		return () => {
			destructed = true;

			if (textArea.current && textArea.current.destruct) {
				textArea.current.destruct();
			}

			textArea.current = element;
		};
	}, [config, id, value, onBlur, onChange, name, tabIndex, Jodit]);

	useEffect(() => {
		if (textArea?.current?.value !== value) {
			textArea.current.value = value;
		}
	}, [value]);

	return (
		<div className={isLoading ? s.loading : s.finish}>
			<div className={s.box}>
				<div className={s.spinner}>
					<div />
				</div>
			</div>
			<textarea className={s.area} id={id} ref={textArea} />
			<div style={{ display: 'none' }} id={id} ref={div}>
				{children}
			</div>
		</div>
	);
};

JoditEditor.propTypes = {
	config: object,
	id: string,
	name: string,
	onBlur: func,
	onChange: func,
	loadJodit: func,
	tabIndex: number,
	value: string
};

export default JoditEditor;
