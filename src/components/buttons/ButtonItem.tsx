import React, { useCallback } from 'react';

import { Toggle } from '../controls/Toggle';

import s from './ButtonList.module.css';

interface ButtonItemProps {
	label: string;
	index: number;
	checked: boolean;
	active: boolean;
	iconHtml: string;
	onToggle: (index: number, active: boolean) => void;
	onMove: (index: number, up: boolean) => void;
	onSetActive: (index: number) => void;
}

export const ButtonItem: React.FC<ButtonItemProps> = ({
	label,
	index,
	checked,
	active,
	iconHtml,
	onToggle,
	onMove,
	onSetActive
}) => {
	const handleToggle = useCallback(
		(value: boolean) => {
			onToggle(index, value);
		},
		[onToggle, index]
	);

	const handleSetActive = useCallback(() => {
		onSetActive(index);
	}, [onSetActive, index]);

	const handleMoveUp = useCallback(() => {
		onMove(index, true);
	}, [onMove, index]);

	const handleMoveDown = useCallback(() => {
		onMove(index, false);
	}, [onMove, index]);

	const rowClass = [
		s.row,
		active ? s.rowActive : '',
		!checked ? s.rowDisabled : ''
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={rowClass} onDoubleClick={handleSetActive}>
			<div
				className={s.icon}
				dangerouslySetInnerHTML={{ __html: iconHtml }}
			/>
			<span className={s.name}>{label}</span>
			<div className={s.actions}>
				<button
					type="button"
					className={s.moveBtn}
					onClick={handleMoveUp}
					title="Move up"
				>
					&#9650;
				</button>
				<button
					type="button"
					className={s.moveBtn}
					onClick={handleMoveDown}
					title="Move down"
				>
					&#9660;
				</button>
			</div>
			<div className={s.toggleCol}>
				<Toggle
					checked={checked}
					onChange={handleToggle}
					name={label}
					label=""
				/>
			</div>
		</div>
	);
};
