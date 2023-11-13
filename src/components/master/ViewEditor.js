import React from 'react';
import * as PropTypes from 'prop-types';

import CheckBox from '../checkbox/CheckBox';
import JoditEditor from '../editor/editor';
import { LoremIpsum } from './LoremIpsum';
import style from './style.module.css';

export function ViewEditor(props) {
	return (
		<div
			className={style.workbox}
			style={{ width: props.state.workBoxWidth }}
		>
			<div className={style.exampleHeader}>
				<CheckBox
					name="showLoremIpsum"
					onChange={props.onChange}
					defaultChecked={props.state.showLoremIpsum}
					label="Show lorem ipsum text"
				/>

				<a href="https://xdsoft.net/jodit/pro/">Try Jodit PRO</a>
			</div>

			<JoditEditor
				Jodit={props.jodit}
				onChange={props.onChange1}
				config={props.state.config}
				value={props.state.showLoremIpsum ? LoremIpsum : props.value}
			/>
		</div>
	);
}
