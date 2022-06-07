import List from '../list/List';
import Number from '../number/Number';
import CheckBox from '../checkbox/CheckBox';

export function Options(props) {
	return (
		<div>
			<List
				name="preset"
				value={props.state.preset}
				onChange={props.setOption}
				list={{
					custom: 'None',
					inline: 'Inline Mode'
				}}
				label="Presets"
			/>

			<fieldset>
				<legend>Toolbar</legend>

				<CheckBox
					popupKey={'toolbar'}
					name="toolbar"
					onChange={props.setOption}
					checked={props.state.toolbar}
					label="Show Toolbar"
				/>

				{props.state.toolbar === false || (
					<CheckBox
						popupKey={'textIcons'}
						name="textIcons"
						onChange={props.setOption}
						checked={props.state.textIcons}
						label="Text Icons"
					/>
				)}
				{props.state.toolbar === false || (
					<List
						value={props.state.toolbarButtonSize}
						name="toolbarButtonSize"
						onChange={props.setOption}
						list={['tiny', 'xsmall', 'small', 'middle', 'large']}
						label="Size of icons"
					/>
				)}
				{props.state.toolbar === false || (
					<CheckBox
						popupKey={'toolbarSticky'}
						name="toolbarSticky"
						onChange={props.setOption}
						checked={props.state.toolbarSticky}
						label="Sticky Toolbar"
					/>
				)}

				{props.state.toolbar === false ||
					props.state.toolbarSticky === false || (
						<Number
							label="Sticky offset"
							name="toolbarStickyOffset"
							onChange={props.setOption}
							value={props.state.toolbarStickyOffset}
						/>
					)}
			</fieldset>
			<CheckBox
				popupKey={'autofocus'}
				name="autofocus"
				onChange={props.setOption}
				checked={props.state.autofocus}
				label="Autofocus"
			/>

			<CheckBox
				popupKey={'useSearch'}
				name="useSearch"
				onChange={props.setOption}
				checked={props.state.useSearch}
				label="Use search"
			/>

			<CheckBox
				popupKey={'spellcheck'}
				name="spellcheck"
				onChange={props.setOption}
				checked={props.state.spellcheck}
				label="Spell Check"
			/>
			<CheckBox
				popupKey={'iframe'}
				name="iframe"
				onChange={props.setOption}
				checked={props.state.iframe}
				label="Iframe mode"
			/>

			<List
				value={props.state.direction}
				name="direction"
				onChange={props.setOption}
				list={{ '': 'auto', rtl: 'rtl', ltr: 'ltr' }}
				label="Direction"
			/>
			<List
				value={props.state.language}
				name="language"
				onChange={props.setOption}
				list={['Auto', ...Object.keys(props.Jodit.lang)]}
				label="Language"
			/>

			<List
				name="enter"
				value={props.state.enter}
				onChange={props.setOption}
				list={{
					P: 'Paragraph (P)',
					DIV: 'Block (DIV)',
					BR: 'Break (BR)'
				}}
				label="Element that will be created on Enter"
			/>

			<List
				name="defaultMode"
				value={props.state.defaultMode}
				onChange={props.setOption}
				list={{
					[props.Jodit.constants.MODE_WYSIWYG]: 'WYSIWYG',
					[props.Jodit.constants.MODE_SOURCE]: 'Source code',
					[props.Jodit.constants.MODE_SPLIT]: 'Split code'
				}}
				label="Default mode"
			/>

			<fieldset>
				<legend>Status bar</legend>
				<CheckBox
					popupKey={'showCharsCounter'}
					name="showCharsCounter"
					onChange={props.setOption}
					checked={props.state.showCharsCounter}
					label="Show chars counter"
				/>
				<CheckBox
					popupKey={'showWordsCounter'}
					name="showWordsCounter"
					onChange={props.setOption}
					checked={props.state.showWordsCounter}
					label="Show words counter"
				/>
				<CheckBox
					popupKey={'showXPathInStatusbar'}
					name="showXPathInStatusbar"
					onChange={props.setOption}
					checked={props.state.showXPathInStatusbar}
					label="Show path to selected element"
				/>
			</fieldset>
			<fieldset>
				<legend>Uploader</legend>
				<CheckBox
					name="uploader.insertImageAsBase64URI"
					onChange={props.setOption}
					checked={props.state.uploader.insertImageAsBase64URI}
					label="Insert image as Base64 URI"
				/>
			</fieldset>
		</div>
	);
}
