import React, { useCallback, useRef } from 'react';
import style from './style.module.css';

export default function List({ list, onChange, name, label, value }) {
	const ref = useRef(null);

	const onNativeChange = useCallback(() => {
		onChange && onChange(ref.current.value, name);
	}, [onChange, name]);

	const keys = Array.isArray(list) ? list : Object.keys(list);

	const listItems = keys.map((key) => (
		<option key={key} value={key}>
			{Array.isArray(list) ? key : list[key]}
		</option>
	));

	return (
		<div className={style.list}>
			<label className={style.label}>{label}</label>

			<select
				defaultValue={value}
				className={style.select}
				ref={ref}
				onChange={onNativeChange}
			>
				{listItems}
			</select>
		</div>
	);
}
