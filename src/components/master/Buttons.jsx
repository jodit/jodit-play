import React, { useCallback } from 'react';
import { Button } from '../button/Button';
import style from '../button/style.module.css';
import Separator from '../button/Separator';
import Break from '../button/Break';

export function Buttons({
	buttons,
	removeButtons,
	activeIndex,
	setButtons,
	name,
	Jodit
}) {
	const toggleAll = useCallback(() => {
		const rb = [...removeButtons];
		buttons.forEach((button, index) => {
			if (rb.indexOf(button) !== -1) {
				rb.splice(rb.indexOf(button), 1);
			} else {
				rb.push(button);
			}
		});

		setButtons(name, buttons, rb, activeIndex);
	}, [activeIndex, buttons, name, removeButtons, setButtons]);

	const toggle = useCallback(
		(index, active) => {
			const button = buttons[index];
			const rb = [...removeButtons];

			if (rb.indexOf(button) !== -1 && active) {
				rb.splice(rb.indexOf(button), 1);
			} else {
				!active && rb.push(button);
			}

			setButtons(name, buttons, rb, activeIndex);
		},
		[activeIndex, buttons, name, removeButtons, setButtons]
	);

	const move = useCallback(
		(index, up) => {
			const buttonsStart = buttons.slice();
			const next = index + (up ? -1 : 1);
			const buf = buttonsStart[index];

			buttonsStart[index] = buttonsStart[next];
			buttonsStart[next] = buf;

			setButtons(name, buttonsStart, removeButtons, activeIndex);
		},
		[activeIndex, buttons, name, removeButtons, setButtons]
	);

	const remove = useCallback(
		(index) => {
			const buttonsStart = buttons.slice(0, index);
			const buttonsEnd = buttons.slice(index + 1);

			setButtons(
				name,
				[...buttonsStart, ...buttonsEnd],
				removeButtons,
				activeIndex
			);
		},
		[activeIndex, buttons, name, removeButtons, setButtons]
	);

	const addSeparator = useCallback(
		(event) => {
			const buttonsStart = buttons.slice(0, activeIndex);
			const buttonsEnd = buttons.slice(activeIndex);

			setButtons(
				name,
				[
					...buttonsStart,
					event.target.getAttribute('data-separator'),
					...buttonsEnd
				],
				removeButtons,
				activeIndex
			);
		},
		[activeIndex, buttons, name, removeButtons, setButtons]
	);

	const setActive = useCallback(
		(index) => {
			setButtons(name, buttons, removeButtons, index);
		},
		[buttons, name, removeButtons, setButtons]
	);

	const restoreDefaults = useCallback(() => {
		if (window.confirm('Are you sure?')) {
			setButtons(name, Jodit.defaultOptions[name], [], 0);
		}
	}, [Jodit.defaultOptions, name, setButtons]);

	const list = buttons.map((key, index) => {
		switch (key) {
			case '\n':
				return (
					<Break
						move={move}
						remove={remove}
						setActive={setActive}
						active={activeIndex === index}
						label={key}
						index={index}
						key={index}
					/>
				);
			case '|':
				return (
					<Separator
						move={move}
						remove={remove}
						setActive={setActive}
						active={activeIndex === index}
						label={key}
						index={index}
						key={index}
					/>
				);
			default:
				return (
					<Button
						Jodit={Jodit}
						move={move}
						checked={removeButtons.indexOf(key) === -1}
						toggle={toggle}
						setActive={setActive}
						active={activeIndex === index}
						label={key}
						index={index}
						key={index}
					/>
				);
		}
	});

	return (
		<div>
			<table className={style.table}>
				<tbody>
					<tr>
						<td
							colSpan={5}
							style={{ textAlign: 'right', padding: '5px 0' }}
						>
							<span
								onClick={restoreDefaults}
								className={style.restore}
								title="Restore default"
							></span>
							<span
								onClick={addSeparator}
								data-separator={'\n'}
								className={style.add}
								title="Add Break"
							>
								Break
							</span>
							<span
								onClick={addSeparator}
								data-separator="|"
								className={style.add}
								title="Add Separator"
							>
								Separator
							</span>
							<span
								onClick={toggleAll}
								className={style.restore}
								title="Toggle all"
							>
								Toggle all
							</span>
						</td>
					</tr>
					{list}
				</tbody>
			</table>
			<p className={style.info}>Double-Click selected row</p>
		</div>
	);
}
