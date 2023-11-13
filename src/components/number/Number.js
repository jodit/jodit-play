import React, { useCallback } from 'react';
import style from './style.module.css';

export default function Number({ onChange, name, label, value }) {
	const onChangeHandler = useCallback(
		(event) => {
			onChange && onChange(parseInt(event.target.value, 10), name);
		},
		[name, onChange]
	);

	return (
		<div className={style.label}>
			<label>{label}</label>
			<input
				onChange={onChangeHandler}
				type="number"
				defaultValue={value}
			/>
		</div>
	);
}
