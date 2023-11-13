import React from 'react';

import Tab from '../../tab/Tab';
import CheckBox from '../../checkbox/CheckBox';
import Tabs from '../../tab/Tabs';
import { Buttons } from '../Buttons';

export function TabButtons(props) {
	return (
		<>
			<CheckBox
				popupKey="toolbarAdaptive"
				name="toolbarAdaptive"
				onChange={props.setOption}
				defaultChecked={props.state.config.toolbarAdaptive}
				label="Toolbar adaptive"
			/>

			<Tabs setTab={props.setButtonsTab} currentTab={props.state.currentButtonsTab}>
				<Tab onClick={props.setWorkboxWidth} width={'auto'} label="Desktop">
					<Buttons
						Jodit={props.Jodit}
						activeIndex={props.state.activeIndex.buttons}
						removeButtons={props.state.removeButtons.buttons}
						name="buttons"
						setButtons={props.setButtons}
						buttons={props.state.buttons.buttons}
					/>
				</Tab>
				{!props.state.config.toolbarAdaptive || (
					<Tab
						onClick={props.setWorkboxWidth}
						width={799}
						label="Medium(900px)"
					>
						<Buttons
							Jodit={props.Jodit}
							activeIndex={props.state.activeIndex.buttonsMD}
							removeButtons={props.state.removeButtons.buttonsMD}
							name="buttonsMD"
							setButtons={props.setButtons}
							buttons={props.state.buttons.buttonsMD}
						/>
					</Tab>
				)}
				{!props.state.config.toolbarAdaptive || (
					<Tab
						onClick={props.setWorkboxWidth}
						width={699}
						label="Tablet(700px)"
					>
						<Buttons
							Jodit={props.Jodit}
							activeIndex={props.state.activeIndex.buttonsSM}
							removeButtons={props.state.removeButtons.buttonsSM}
							name="buttonsSM"
							setButtons={props.setButtons}
							buttons={props.state.buttons.buttonsSM}
						/>
					</Tab>
				)}
				{!props.state.config.toolbarAdaptive || (
					<Tab
						onClick={props.setWorkboxWidth}
						width={399}
						label="Mobile(400px)"
					>
						<Buttons
							Jodit={props.Jodit}
							activeIndex={props.state.activeIndex.buttonsXS}
							removeButtons={props.state.removeButtons.buttonsXS}
							name="buttonsXS"
							setButtons={props.setButtons}
							buttons={props.state.buttons.buttonsXS}
						/>
					</Tab>
				)}
			</Tabs>
		</>
	);
}
