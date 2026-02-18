import React, { useCallback, useRef } from 'react';

import s from './SelectInput.module.css';

interface SelectInputProps {
	label: string;
	name: string;
	value: string | number;
	onChange: (value: string | number, name: string) => void;
	list: Record<string, string> | string[];
}

export const SelectInput: React.FC<SelectInputProps> = ({
	label,
	name,
	value,
	onChange,
	list
}) => {
	const ref = useRef<HTMLSelectElement>(null);

	const handleChange = useCallback(() => {
		if (ref.current) {
			onChange(ref.current.value, name);
		}
	}, [onChange, name]);

	const keys = Array.isArray(list) ? list : Object.keys(list);

	return (
		<div className={s.field}>
			<label className={s.label}>{label}</label>
			<select
				ref={ref}
				defaultValue={String(value)}
				onChange={handleChange}
				className={s.select}
			>
				{keys.map(key => (
					<option key={key} value={key}>
						{Array.isArray(list) ? key : list[key]}
					</option>
				))}
			</select>
		</div>
	);
};
