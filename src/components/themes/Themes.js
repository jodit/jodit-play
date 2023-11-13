import React, { useCallback, useEffect } from 'react';
import Color from './Color';

let resetStyles = null;

export default function Themes(props) {
	const getValue = useCallback(
		(_, key) => {
			if (props.theme[key] !== undefined) {
				return props.theme[key];
			}

			return '';
		},
		[props.theme]
	);

	const setValue = useCallback(
		(_, key, value) => {
			const state = { ...props.theme };

			if (state[key] !== value) {
				state[key] = value;
				props.setCSS(generateCss(state), state);
			}
		},
		[props]
	);

	/**
	 *
	 * @param state
	 * @return {string}
	 */
	const generateCss = (state) => {
		const css = [];

		Object.keys(state).forEach((variableName) => {
			let value = resetStyles[variableName]
				? resetStyles[variableName]
				: null;

			if (value !== state[variableName]) {
				css.push(`${variableName}: ${state[variableName]};`);
			}
		});

		return `:root {\n${css.join('\n')}\n}`;
	};

	useEffect(() => {
		if (!resetStyles && typeof window !== 'undefined') {
			const rs = {};
			Object.keys(props.theme).forEach((key) => {
				rs[key] = getComputedStyle(document.body).getPropertyValue(key);
			});
			resetStyles = rs;
			const state = { ...resetStyles };
			props.setCSS(generateCss(state), state);
		}
	}, [props]);

	return (
		<div>
			{Object.keys(props.theme).map((key) => (
				<Color
					key={key}
					selector=""
					styleKey={key}
					color={getValue}
					title={key
						.replace('--jd-', '')
						.split('-')
						.map((a) => a[0].toUpperCase() + a.substring(1))
						.join(' ')}
					setColor={setValue}
				/>
			))}
		</div>
	);
}
