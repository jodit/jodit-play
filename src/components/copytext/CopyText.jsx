import React, { useCallback, useRef, useState } from 'react';
import style from './style.module.css';

export default function CopyText({ children }) {
	const [mode, setMode] = useState('ready');
	const ref = useRef(null);

	const onClick = useCallback(() => {
		const textarea = document.createElement('textarea');

		document.body.appendChild(textarea);
		textarea.value = ref.current.innerText;
		textarea.select();
		document.execCommand('copy');
		document.body.removeChild(textarea);

		setMode('copied');

		setTimeout(() => {
			if (mode === 'copied') {
				setMode('ready');
			}
		}, 1000);
	}, [mode]);

	return (
		<div className={style.item}>
			<button
				className={style.button + ' ' + style[mode]}
				onClick={onClick}
				type="button"
			>
				{mode === 'ready' ? 'Copy code' : 'Copied!'}
			</button>
			<div ref={ref}>{children}</div>
		</div>
	);
}
