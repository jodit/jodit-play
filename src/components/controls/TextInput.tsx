import React, { useCallback } from 'react';

import s from './TextInput.module.css';

interface TextInputProps {
	label: string;
	name: string;
	value: string;
	onChange: (value: string, name: string) => void;
	multiline?: boolean;
	placeholder?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
	label,
	name,
	value,
	onChange,
	multiline = false,
	placeholder
}) => {
	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			onChange(event.target.value, name);
		},
		[onChange, name]
	);

	return (
		<div className={s.field}>
			<label className={s.label}>{label}</label>
			{multiline ? (
				<textarea
					defaultValue={value}
					onChange={handleChange}
					className={s.textarea}
					placeholder={placeholder}
				/>
			) : (
				<input
					type="text"
					defaultValue={value}
					onChange={handleChange}
					className={s.input}
					placeholder={placeholder}
				/>
			)}
		</div>
	);
};
