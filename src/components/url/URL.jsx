import React from 'react';
import style from '../button/style.module.css';

export default function URL(props) {
	const onChange = (event) => {
		props.onChange && props.onChange(event.target.value, props.name);
	};

	return (
		<div className={style.label}>
			<label>{props.label}</label>
			<input
				placeholder="https://"
				onChange={onChange}
				type="url"
				defaultValue={props.value}
			/>
		</div>
	);
}
