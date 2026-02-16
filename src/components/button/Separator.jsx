import React from 'react';
import style from './style.module.css';

export default function Separator(props) {
	const remove = (e) => {
		props.remove(props.index);
		e.stopPropagation();
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
				style.separator +
				' ' +
				(props.active ? style.row_active : '')
			}
		>
			<td colSpan={2}>Group separator</td>
			<td>
				<span onClick={moveUp} className={style.moveUp}></span>
				<span onClick={moveDown} className={style.moveDown}></span>
			</td>
			<td className={style.lastCol}>
				<span onClick={remove} className={style.trash}></span>
			</td>
		</tr>
	);
}
