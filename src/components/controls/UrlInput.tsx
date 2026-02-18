import React, { useCallback } from 'react';

import s from './UrlInput.module.css';

interface UrlInputProps {
	label: string;
	name: string;
	value: string;
	onChange: (value: string, name: string) => void;
}

export const UrlInput: React.FC<UrlInputProps> = ({
	label,
	name,
	value,
	onChange
}) => {
	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			onChange(event.target.value, name);
		},
		[onChange, name]
	);

	return (
		<div className={s.field}>
			<label className={s.label}>{label}</label>
			<input
				type="url"
				defaultValue={value}
				onChange={handleChange}
				className={s.input}
				placeholder="https://"
			/>
		</div>
	);
};
