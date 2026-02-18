import React, { useCallback } from 'react';

import type { JoditStatic } from '../../types';
import { ButtonItem } from './ButtonItem';
import { SeparatorItem } from './SeparatorItem';
import { BreakItem } from './BreakItem';

import s from './ButtonList.module.css';

interface ButtonListProps {
	Jodit: JoditStatic;
	buttons: string[];
	removeButtons: string[];
	activeIndex: number;
	name: string;
	setButtons: (
		name: string,
		buttons: string[],
		removeButtons: string[],
		activeIndex: number
	) => void;
}

export const ButtonList: React.FC<ButtonListProps> = ({
	Jodit,
	buttons,
	removeButtons,
	activeIndex,
	name,
	setButtons
}) => {
	const toggleAll = useCallback(() => {
		const rb = [...removeButtons];

		for (let i = 0; i < buttons.length; i++) {
			const button = buttons[i];
			const idx = rb.indexOf(button);

			if (idx !== -1) {
				rb.splice(idx, 1);
			} else {
				rb.push(button);
			}
		}

		setButtons(name, buttons, rb, activeIndex);
	}, [activeIndex, buttons, name, removeButtons, setButtons]);

	const toggle = useCallback(
		(index: number, active: boolean) => {
			const button = buttons[index];
			const rb = [...removeButtons];
			const idx = rb.indexOf(button);

			if (idx !== -1 && active) {
				rb.splice(idx, 1);
			} else if (!active && idx === -1) {
				rb.push(button);
			}

			setButtons(name, buttons, rb, activeIndex);
		},
		[activeIndex, buttons, name, removeButtons, setButtons]
	);

	const move = useCallback(
		(index: number, up: boolean) => {
			const list = buttons.slice();
			const next = index + (up ? -1 : 1);

			if (next < 0 || next >= list.length) {
				return;
			}

			const temp = list[index];
			list[index] = list[next];
			list[next] = temp;

			setButtons(name, list, removeButtons, activeIndex);
		},
		[activeIndex, buttons, name, removeButtons, setButtons]
	);

	const remove = useCallback(
		(index: number) => {
			const list = [
				...buttons.slice(0, index),
				...buttons.slice(index + 1)
			];
			setButtons(name, list, removeButtons, activeIndex);
		},
		[activeIndex, buttons, name, removeButtons, setButtons]
	);

	const addSeparator = useCallback(
		(sep: string) => {
			const before = buttons.slice(0, activeIndex);
			const after = buttons.slice(activeIndex);

			setButtons(
				name,
				[...before, sep, ...after],
				removeButtons,
				activeIndex
			);
		},
		[activeIndex, buttons, name, removeButtons, setButtons]
	);

	const setActive = useCallback(
		(index: number) => {
			setButtons(name, buttons, removeButtons, index);
		},
		[buttons, name, removeButtons, setButtons]
	);

	const restoreDefaults = useCallback(() => {
		if (
			window.confirm('Are you sure you want to restore default buttons?')
		) {
			setButtons(name, Jodit.defaultOptions[name] as string[], [], 0);
		}
	}, [Jodit.defaultOptions, name, setButtons]);

	const getIcon = useCallback(
		(btnName: string): string => {
			try {
				return Jodit.modules.Icon.get(btnName) || '';
			} catch {
				return '';
			}
		},
		[Jodit]
	);

	return (
		<div className={s.container}>
			<div className={s.toolbar}>
				<button
					type="button"
					className={s.toolbarBtn}
					onClick={restoreDefaults}
					title="Restore defaults"
				>
					&#8635; Reset
				</button>
				<button
					type="button"
					className={s.toolbarBtn}
					onClick={() => addSeparator('\n')}
					title="Add line break"
				>
					+ Break
				</button>
				<button
					type="button"
					className={s.toolbarBtn}
					onClick={() => addSeparator('|')}
					title="Add separator"
				>
					+ Separator
				</button>
				<button
					type="button"
					className={s.toolbarBtn}
					onClick={toggleAll}
					title="Toggle all buttons"
				>
					Toggle All
				</button>
			</div>

			<div className={s.list}>
				{buttons.map((key, index) => {
					if (key === '\n') {
						return (
							<BreakItem
								key={index}
								index={index}
								active={activeIndex === index}
								onMove={move}
								onRemove={remove}
								onSetActive={setActive}
							/>
						);
					}

					if (key === '|') {
						return (
							<SeparatorItem
								key={index}
								index={index}
								active={activeIndex === index}
								onMove={move}
								onRemove={remove}
								onSetActive={setActive}
							/>
						);
					}

					return (
						<ButtonItem
							key={index}
							label={key}
							index={index}
							checked={removeButtons.indexOf(key) === -1}
							active={activeIndex === index}
							iconHtml={getIcon(key)}
							onToggle={toggle}
							onMove={move}
							onSetActive={setActive}
						/>
					);
				})}
			</div>

			<p className={s.hint}>Double-click a row to select it</p>
		</div>
	);
};
