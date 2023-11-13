import React from 'react';
import style from './style.module.css';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

export default function CheckBox({
	onChange,
	right,
	checked,
	defaultChecked,
	label,
	name
}) {
	const onNativeChange = (event) => {
		onChange && onChange(event.target.checked, name);
	};

	return (
		<div className={style.label + (right ? ' ' + style.right : '')}>
			<label>
				{checked !== undefined ? (
					<Toggle
						defaultChecked={defaultChecked}
						checked={checked}
						onChange={onNativeChange}
					/>
				) : (
					<Toggle
						defaultChecked={defaultChecked}
						onChange={onNativeChange}
					/>
				)}
				<span className={style.labelText}>{label}</span>
			</label>
		</div>
	);
}
