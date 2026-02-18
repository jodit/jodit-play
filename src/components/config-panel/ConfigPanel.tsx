import React from 'react';

import type {
	JoditStatic,
	PlaygroundState,
	SetOptionFn,
	ThemeState
} from '../../types';
import { AccordionSection } from './AccordionSection';
import { GeneralSection } from './sections/GeneralSection';
import { ToolbarSection } from './sections/ToolbarSection';
import { ButtonsSection } from './sections/ButtonsSection';
import { DimensionsSection } from './sections/DimensionsSection';
import { ContentSection } from './sections/ContentSection';
import { StatusBarSection } from './sections/StatusBarSection';
import { IframeSection } from './sections/IframeSection';
import { StorageSection } from './sections/StorageSection';
import { UploaderSection } from './sections/UploaderSection';
import { PluginsSection } from './sections/PluginsSection';
import { AppearanceSection } from './sections/AppearanceSection';

import s from './ConfigPanel.module.css';

interface ConfigPanelProps {
	Jodit: JoditStatic;
	state: PlaygroundState;
	height: number;
	width: number;
	setOption: SetOptionFn;
	setHeight: (auto: boolean) => void;
	setWidth: (auto: boolean) => void;
	setButtons: (
		name: string,
		buttons: string[],
		removeButtons: string[],
		activeIndex: number
	) => void;
	setCSS: (css: string, theme: ThemeState) => void;
	isDefault: boolean;
	onRestoreDefaults: () => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
	Jodit,
	state,
	height,
	width,
	setOption,
	setHeight,
	setWidth,
	setButtons,
	setCSS,
	isDefault,
	onRestoreDefaults
}) => {
	return (
		<div className={s.panel}>
			<div className={s.header}>
				<span className={s.title}>Configuration</span>
				{!isDefault && (
					<button
						type="button"
						className={s.resetBtn}
						onClick={onRestoreDefaults}
					>
						&#8635; Reset All
					</button>
				)}
			</div>

			<div className={s.sections}>
				<AccordionSection title="General" icon="&#9881;" defaultOpen>
					<GeneralSection
						Jodit={Jodit}
						config={state.config}
						setOption={setOption}
					/>
				</AccordionSection>

				<AccordionSection title="Toolbar" icon="&#9776;">
					<ToolbarSection
						config={state.config}
						setOption={setOption}
					/>
				</AccordionSection>

				{state.config.toolbar !== false && (
					<AccordionSection title="Buttons" icon="&#9634;">
						<ButtonsSection
							Jodit={Jodit}
							state={state}
							setOption={setOption}
							setButtons={setButtons}
						/>
					</AccordionSection>
				)}

				<AccordionSection title="Dimensions" icon="&#8596;">
					<DimensionsSection
						config={state.config}
						height={height}
						width={width}
						setOption={setOption}
						setHeight={setHeight}
						setWidth={setWidth}
					/>
				</AccordionSection>

				<AccordionSection title="Content & Paste" icon="&#9998;">
					<ContentSection
						Jodit={Jodit}
						config={state.config}
						setOption={setOption}
					/>
				</AccordionSection>

				<AccordionSection title="Status Bar" icon="&#9604;">
					<StatusBarSection
						config={state.config}
						setOption={setOption}
					/>
				</AccordionSection>

				<AccordionSection title="Iframe" icon="&#9634;">
					<IframeSection
						config={state.config}
						setOption={setOption}
					/>
				</AccordionSection>

				<AccordionSection title="Storage" icon="&#128190;">
					<StorageSection
						config={state.config}
						setOption={setOption}
					/>
				</AccordionSection>

				<AccordionSection title="Uploader" icon="&#128247;">
					<UploaderSection
						config={state.config}
						setOption={setOption}
					/>
				</AccordionSection>

				<AccordionSection title="Plugins" icon="&#128268;">
					<PluginsSection
						Jodit={Jodit}
						config={state.config}
						setOption={setOption}
					/>
				</AccordionSection>

				<AccordionSection title="Appearance" icon="&#127912;">
					<AppearanceSection
						config={state.config}
						theme={state.theme}
						setOption={setOption}
						setCSS={setCSS}
					/>
				</AccordionSection>
			</div>
		</div>
	);
};
