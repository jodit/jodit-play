import React from 'react';
import style from './style.module.css';
import Tab from './Tab';

export default function Tabs(props) {
	const openTab = (event) => {
		props.setTab(event.target.innerText);
	};

	let links = [],
		currentActive = props.currentTab;

	const tabs = props.children
		.filter((tab) => tab.type === Tab)
		.map((tab, index) => {
			if (!currentActive) {
				currentActive = tab.props.label;
			}

			let active = tab.props.label === currentActive;

			links.push(
				<span
					key={index}
					className={
						style.button + (active ? ' ' + style.buttonActive : '')
					}
					onClick={(event) => {
						tab.props.onClick && tab.props.onClick(tab);
						openTab(event);
					}}
				>
					{tab.props.label}
				</span>
			);

			if (!active) {
				return null;
			}

			return (
				<div
					key={index}
					className={style.tab + (active ? ' ' + style.active : '')}
				>
					{' '}
					{tab}{' '}
				</div>
			);
		});

	return (
		<div className={style.tabs}>
			<div className={style.header}>{links}</div>
			{tabs}
		</div>
	);
}
