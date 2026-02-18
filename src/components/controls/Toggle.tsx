import React, { useCallback } from 'react';

import s from './Toggle.module.css';

interface ToggleProps {
	checked: boolean;
	onChange: (checked: boolean, name: string) => void;
	name: string;
	label: string;
}

export const Toggle: React.FC<ToggleProps> = ({
	checked,
	onChange,
	name,
	label
}) => {
	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			onChange(event.target.checked, name);
		},
		[onChange, name]
	);

	return (
		<label className={s.toggle}>
			<span className={s.switch}>
				<input
					type="checkbox"
					checked={checked}
					onChange={handleChange}
					className={s.input}
				/>
				<span className={s.slider} />
			</span>
			<span className={s.label}>{label}</span>
		</label>
	);
};
