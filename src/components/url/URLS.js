import React from 'react';
import style from '../button/style.module.css';

export default function URLS(props) {
	const ref = React.useRef(null);
	const add = () => {
		onChange(['']);
	};
	const remove = (event) => {
		let tr = event.target.parentNode.parentNode;
		tr.querySelector('input').value = '';

		onChange();
	};

	const onChange = (plus) => {
		let urls = [];
		urls = [].slice
			.call(ref.current.querySelectorAll('input'))
			.map((input) => input.value)
			.filter((elm) => elm);

		if (Array.isArray(plus)) {
			urls = urls.concat(plus);
		}

		props.onChange && props.onChange(urls, props.name);
	};

	const urls = (
		props.value && Array.isArray(props.value) && props.value.length
			? props.value
			: ['']
	).map((url, index) => {
		return (
			<tr key={index + '' + url}>
				<td>
					<input
						placeholder="https://"
						onBlur={onChange}
						type="url"
						defaultValue={url}
					/>
				</td>
				<td className={style.fill}>
					<span onClick={add} className={style.add}></span>
					<span onClick={remove} className={style.trash}></span>
				</td>
			</tr>
		);
	});

	return (
		<div className={style.label}>
			<label>{props.label}</label>
			<table className={style.table} ref={ref}>
				<tbody>{urls}</tbody>
			</table>
		</div>
	);
}
