import React from 'react';
import style from './style.module.css';
import CheckBox from '../checkbox/CheckBox';

export function Button(props) {
	const toggle = (active) => {
		props.toggle(props.index, active);
	};

	const setActive = () => {
		props.setActive(props.index);
	};

	const moveUp = () => {
		props.move(props.index, true);
	};

	const moveDown = () => {
		props.move(props.index, false);
	};

	return (
		<tr
			onDoubleClick={setActive}
			className={
				style.row +
				' ' +
				(props.active ? style.row_active : '') +
				' ' +
				(!props.checked ? style.row_disable : '')
			}
		>
			<td>
				<div
					className={style.icon}
					dangerouslySetInnerHTML={{
						__html: props.Jodit.modules.Icon.get(props.label)
					}}
				/>
			</td>
			<td>{props.label}</td>
			<td>
				<span onClick={moveUp} className={style.moveUp} />
				<span onClick={moveDown} className={style.moveDown} />
			</td>
			<td className={style.lastCol}>
				<CheckBox checked={props.checked} onChange={toggle} />
			</td>
		</tr>
	);
}
