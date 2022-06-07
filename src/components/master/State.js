import List from '../list/List';
import CheckBox from '../checkbox/CheckBox';

export function State(props) {
	return (
		<div>
			<CheckBox
				popupKey={'saveHeightInStorage'}
				name="saveHeightInStorage"
				onChange={props.setOption}
				defaultChecked={props.config.saveHeightInStorage}
				label="Save height in storage"
			/>
			<CheckBox
				popupKey={'saveModeInStorage'}
				name="saveModeInStorage"
				onChange={props.setOption}
				defaultChecked={props.config.saveModeInStorage}
				label="Save mode in storage"
			/>
			<CheckBox
				popupKey={'readonly'}
				name="readonly"
				onChange={props.setOption}
				checked={props.config.readonly}
				label="Read Only"
			/>
			<hr />
			<CheckBox
				popupKey={'askBeforePasteHTML'}
				name="askBeforePasteHTML"
				onChange={props.setOption}
				defaultChecked={props.config.askBeforePasteHTML}
				label="Ask before paste HTML"
			/>
			<CheckBox
				popupKey={'askBeforePasteFromWord'}
				name="askBeforePasteFromWord"
				onChange={props.setOption}
				defaultChecked={props.config.askBeforePasteFromWord}
				label="Ask before paste from Word/Excel"
			/>
			<List
				value={props.config.defaultActionOnPaste}
				name="defaultActionOnPaste"
				onChange={props.setOption}
				list={{
					[props.Jodit.constants.INSERT_AS_HTML]: 'Insert as HTML',
					[props.Jodit.constants.INSERT_CLEAR_HTML]: 'Insert cleared HTML',
					[props.Jodit.constants.INSERT_AS_TEXT]: 'Insert as plain text',
					[props.Jodit.constants.INSERT_ONLY_TEXT]: 'Insert only text'
				}}
				label="Default insert method"
			/>
		</div>
	);
}
