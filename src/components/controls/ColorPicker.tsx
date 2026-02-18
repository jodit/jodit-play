import React, { useCallback, useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';

import s from './ColorPicker.module.css';

interface ColorPickerProps {
	label: string;
	styleKey: string;
	color: string;
	onChange: (styleKey: string, color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
	label,
	styleKey,
	color,
	onChange
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = useCallback(() => {
		setIsOpen(prev => !prev);
	}, []);

	const handleClose = useCallback(() => {
		setIsOpen(false);
	}, []);

	const handleChange = useCallback(
		(result: ColorResult) => {
			onChange(styleKey, result.hex);
		},
		[onChange, styleKey]
	);

	return (
		<div className={s.field}>
			<button type="button" className={s.swatch} onClick={handleToggle}>
				<span
					className={s.color}
					style={{ backgroundColor: color || '#000000' }}
				/>
			</button>
			<span className={s.label}>{label}</span>
			{isOpen && (
				<div className={s.popover}>
					<div className={s.cover} onClick={handleClose} />
					<SketchPicker color={color} onChange={handleChange} />
				</div>
			)}
		</div>
	);
};
