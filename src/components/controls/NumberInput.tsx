import React, { useCallback } from 'react';

import s from './NumberInput.module.css';

interface NumberInputProps {
	label: string;
	name: string;
	value: number;
	onChange: (value: number, name: string) => void;
	min?: number;
	max?: number;
	step?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
	label,
	name,
	value,
	onChange,
	min,
	max,
	step = 1
}) => {
	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const parsed = parseInt(event.target.value, 10);

			if (!isNaN(parsed)) {
				onChange(parsed, name);
			}
		},
		[onChange, name]
	);

	return (
		<div className={s.field}>
			<label className={s.label}>{label}</label>
			<input
				type="number"
				defaultValue={value}
				onChange={handleChange}
				className={s.input}
				min={min}
				max={max}
				step={step}
			/>
		</div>
	);
};
