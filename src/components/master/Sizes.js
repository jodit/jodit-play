import React from 'react';
import CheckBox from '../checkbox/CheckBox';
import Number from '../number/Number';
import List from '../list/List';

export default function Sizes(props) {
	return (
		<>
			<fieldset>
				<legend>Sizes</legend>

				{props.state.height === 'auto' || (
					<CheckBox
						popupKey={'allowResizeY'}
						right
						name="allowResizeY"
						onChange={props.setOption}
						checked={props.state.allowResizeY}
						label="Allow Height resize"
					/>
				)}
				<CheckBox
					popupKey={'height'}
					name="height"
					onChange={props.setHeight}
					checked={props.state.height === 'auto'}
					label="Auto height"
				/>

				{props.state.height === 'auto' || (
					<Number
						label="Height in pixels"
						name="height"
						onChange={props.setOption}
						value={props.state.height}
					/>
				)}
				<Number
					label="Min height(px)"
					name="minHeight"
					onChange={props.setOption}
					value={props.state.minHeight}
				/>
				<Number
					label="Max height(px)"
					name="maxHeight"
					onChange={props.setOption}
					value={props.state.maxHeight}
				/>
				{props.state.width === 'auto' || (
					<CheckBox
						popupKey={'allowResizeX'}
						right
						name="allowResizeX"
						onChange={props.setOption}
						checked={props.state.allowResizeX}
						label="Allow Width resize"
					/>
				)}
				<CheckBox
					popupKey={'width'}
					name="width"
					onChange={props.setWidth}
					checked={props.state.width === 'auto'}
					label="Auto width"
				/>
				<Number
					label="Min width(px)"
					name="minWidth"
					onChange={props.setOption}
					value={props.state.minWidth}
				/>
				<Number
					label="Max width(px)"
					name="maxWidth"
					onChange={props.setOption}
					value={props.state.maxWidth}
				/>

				{props.state.width !== 'auto' ? (
					<Number
						label="Width in pixels"
						name="width"
						onChange={props.setOption}
						value={props.state.width}
					/>
				) : (
					''
				)}
			</fieldset>
			<fieldset>
				<legend>Units</legend>
				<List
					name="defaultFontSizePoints"
					value={props.state.defaultFontSizePoints}
					onChange={props.setOption}
					list={{
						pt: 'Points',
						px: 'Pixels'
					}}
					label="Font size units"
				/>
			</fieldset>
		</>
	);
}
