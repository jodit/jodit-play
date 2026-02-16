import React from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';

export default function Color(props) {
	const [state, setState] = React.useState({
		displayColorPicker: false
	});

	const handleClick = () => {
		setState((state) => ({
			...state,
			displayColorPicker: !state.displayColorPicker
		}));
	};

	const handleClose = () => {
		setState((state) => ({ ...state, displayColorPicker: false }));
	};

	const setColor = (color) => {
		setState((state) => ({ ...state, color: color.rgb }));

		props.setColor(props.selector, props.styleKey, color.hex);

		if (props.bindValue) {
			props.bindValue(
				props.bindTransform ? props.bindTransform(color.hex) : color.hex
			);
		}
	};

	let color =
		typeof props.color === 'function'
			? props.color(props.selector, props.styleKey)
			: props.color;

	const styles = reactCSS({
		default: {
			box: {
				marginBottom: '10px'
			},
			color: {
				width: '36px',
				height: '14px',
				borderRadius: '2px',
				background: color || 'black'
			},
			swatch: {
				padding: '5px',
				background: '#fff',
				borderRadius: '1px',
				boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
				display: 'inline-block',
				cursor: 'pointer',
				marginRight: '10px'
			},
			popover: {
				position: 'absolute',
				zIndex: '2'
			},
			cover: {
				position: 'fixed',
				top: '0px',
				right: '0px',
				bottom: '0px',
				left: '0px'
			}
		}
	});

	return (
		<div style={styles.box}>
			<label style={styles.swatch} onClick={handleClick}>
				<div style={styles.color} />
			</label>
			{props.title}
			{state.displayColorPicker ? (
				<div style={styles.popover}>
					<div style={styles.cover} onClick={handleClose} />
					<SketchPicker color={state.color} onChange={setColor} />
				</div>
			) : null}
		</div>
	);
}
