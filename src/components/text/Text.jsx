import React from 'react';
import style from './style.module.css';

export default function Text(props) {
	const onChange = (event) => {
		props.onChange && props.onChange(event.target.value, props.name);
	};

	return (
		<div className={style.label}>
			<label>{props.label}</label>
			<textarea onChange={onChange} defaultValue={props.value} />
		</div>
	);
}
