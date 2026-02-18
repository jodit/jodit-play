import React, { useCallback, useState } from 'react';

import type {
	JoditStatic,
	PlaygroundState,
	SetOptionFn,
	ButtonSetName
} from '../../../types';
import { Toggle } from '../../controls/Toggle';
import { ButtonList } from '../../buttons/ButtonList';

import s from './ButtonsSection.module.css';

interface ButtonsSectionProps {
	Jodit: JoditStatic;
	state: PlaygroundState;
	setOption: SetOptionFn;
	setButtons: (
		name: string,
		buttons: string[],
		removeButtons: string[],
		activeIndex: number
	) => void;
}

type ScreenSize = 'desktop' | 'md' | 'sm' | 'xs';

const TAB_MAP: Record<ScreenSize, ButtonSetName> = {
	desktop: 'buttons',
	md: 'buttonsMD',
	sm: 'buttonsSM',
	xs: 'buttonsXS'
};

const TAB_LABELS: Record<ScreenSize, string> = {
	desktop: 'Desktop',
	md: 'Medium (900px)',
	sm: 'Tablet (700px)',
	xs: 'Mobile (400px)'
};

export const ButtonsSection: React.FC<ButtonsSectionProps> = ({
	Jodit,
	state,
	setOption,
	setButtons
}) => {
	const [activeTab, setActiveTab] = useState<ScreenSize>('desktop');

	const handleAdaptiveToggle = useCallback(
		(checked: boolean) => {
			setOption(checked, 'toolbarAdaptive');
		},
		[setOption]
	);

	const currentName = TAB_MAP[activeTab];
	const tabs: ScreenSize[] = state.config.toolbarAdaptive
		? ['desktop', 'md', 'sm', 'xs']
		: ['desktop'];

	return (
		<>
			<Toggle
				name="toolbarAdaptive"
				checked={state.config.toolbarAdaptive}
				onChange={handleAdaptiveToggle}
				label="Toolbar adaptive"
			/>

			<div className={s.tabs}>
				{tabs.map(tab => (
					<button
						key={tab}
						type="button"
						className={activeTab === tab ? s.tabActive : s.tab}
						onClick={() => setActiveTab(tab)}
					>
						{TAB_LABELS[tab]}
					</button>
				))}
			</div>

			<ButtonList
				Jodit={Jodit}
				buttons={state.buttons[currentName]}
				removeButtons={state.removeButtons[currentName]}
				activeIndex={state.activeIndex[currentName]}
				name={currentName}
				setButtons={setButtons}
			/>
		</>
	);
};
