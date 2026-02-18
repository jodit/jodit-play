import React, { useCallback } from 'react';

import s from './ButtonList.module.css';

interface SeparatorItemProps {
	index: number;
	active: boolean;
	onMove: (index: number, up: boolean) => void;
	onRemove: (index: number) => void;
	onSetActive: (index: number) => void;
}

export const SeparatorItem: React.FC<SeparatorItemProps> = ({
	index,
	active,
	onMove,
	onRemove,
	onSetActive
}) => {
	const handleSetActive = useCallback(() => {
		onSetActive(index);
	}, [onSetActive, index]);

	const handleMoveUp = useCallback(() => {
		onMove(index, true);
	}, [onMove, index]);

	const handleMoveDown = useCallback(() => {
		onMove(index, false);
	}, [onMove, index]);

	const handleRemove = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation();
			onRemove(index);
		},
		[onRemove, index]
	);

	const rowClass = [s.row, s.separatorRow, active ? s.rowActive : '']
		.filter(Boolean)
		.join(' ');

	return (
		<div className={rowClass} onDoubleClick={handleSetActive}>
			<span className={s.separatorLabel}>Group Separator</span>
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
				<button
					type="button"
					className={s.removeBtn}
					onClick={handleRemove}
					title="Remove"
				>
					&times;
				</button>
			</div>
		</div>
	);
};
