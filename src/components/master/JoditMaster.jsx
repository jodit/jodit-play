import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';

import * as history from 'history';

import Tabs from '../tab/Tabs';
import Tab from '../tab/Tab';
import { Options } from './Options';
import URL from '../url/URL';
import Text from '../text/Text';
import URLS from '../url/URLS';
import { State } from './State';
import { http_build_query } from '../../App';
import { Plugins } from '../plugins/Plugins';
import Themes from '../themes/Themes';
import { LoremIpsum } from './LoremIpsum';
import Sizes from './Sizes';
import List from '../list/List';

import style from './style.module.css';
import { ViewEditor } from './ViewEditor';
import { GeneratedCode } from './GeneratedCode';
import { TabButtons } from './tabs/TabButtons';

let __history;

function getHistory() {
	if (__history) {
		return __history;
	}
	const createHistory = history.createBrowserHistory;
	__history = createHistory();
	return __history;
}

const HEIGHT = 150;
const WIDTH = 500;

function JoditMaster(props) {
	const { Jodit, config } = props;

	const ref = useRef(null);
	const [isDefault, setIsDefault] = useState(true);
	const [tick, setTick] = useState(0);

	const [sizes, setSizes] = useState({
		height: HEIGHT,
		width: WIDTH
	});

	const [state, setState] = useState(() => {
		const defaultState = getDefaultState(Jodit, config);
		return {
			...defaultState,
			css: defaultState.css || config.initialCSS || '',
			config: {
				...defaultState.config,
				...config.initialConfig
			}
		};
	});

	const [value, setValue] = useState('');

	useEffect(() => {
		const jodit = Jodit.make(ref.current, {
			disablePlugins: 'mobile'
		});

		const buttonsList = jodit.toolbar.getButtonsNames();

		setState((state) => ({
			...state,
			buttons: {
				...state.buttons,
				buttons: buttonsList
			}
		}));

		jodit.destruct();
	}, [Jodit, tick]);

	const setButtonsTab = useCallback((value) => {
		setState((state) => ({
			...state,
			currentButtonsTab: value
		}));
	}, []);

	const setTab = useCallback((v) => {
		setState((state) => ({
			...state,
			currentTab: v
		}));
	}, []);

	const setOption = useMemo(
		() =>
			debounce((value, name) => {
				switch (name) {
					case 'height':
					case 'width':
						if (value !== 'auto') {
							setSizes((sizes) => ({
								...sizes,
								[name]: value
							}));
						}
						break;
					default:
				}

				setState((prevState) => {
					if (
						JSON.stringify(prevState[name]) ===
						JSON.stringify(value)
					) {
						return prevState;
					}

					let newStage = { ...prevState.config };

					if (name === 'iframe' && value === false) {
						newStage.iframeStyle = Jodit.defaultOptions.iframeStyle;
						newStage.iframeCSSLinks =
							Jodit.defaultOptions.iframeCSSLinks;
						newStage.iframeBaseUrl =
							Jodit.defaultOptions.iframeBaseUrl;
					}

					let link = newStage,
						keys = name.split('.');

					keys.forEach((key, index) => {
						if (index !== keys.length - 1) {
							link[key] = { ...link[key] };
							link = link[key];
						}
					});

					name = keys[keys.length - 1];

					link[name] = value;

					return {
						...prevState,
						config: newStage
					};
				});
			}, 100),
		[Jodit]
	);

	const setHeight = useCallback(
		(v) => {
			setOption(v === true ? 'auto' : sizes.height, 'height');
		},
		[setOption, sizes.height]
	);

	const setWidth = useCallback(
		(v) => {
			setOption(v === true ? 'auto' : sizes.width, 'width');
		},
		[setOption, sizes.width]
	);

	const setButtons = useCallback(
		(name, buttons, removeButtons, activeIndex) => {
			const st = { ...state };
			let change = false;

			if (st.buttons[name] !== buttons) {
				st.buttons[name] = buttons;
				change = true;
			}

			if (st.removeButtons[name] !== removeButtons) {
				st.removeButtons[name] = removeButtons;
				change = true;
			}

			if (change) {
				st.config = {
					...st.config,
					[name]: buttons.filter(
						(key) => removeButtons.indexOf(key) === -1
					)
				};
			}

			if (st.activeIndex[name] !== activeIndex) {
				st.activeIndex[name] = activeIndex;
				change = true;
			}

			if (change) {
				setState(st);
			}
		},
		[state]
	);

	const toggleLoremIpsum = useCallback(
		(showLoremIpsum) => {
			if (!showLoremIpsum && value === LoremIpsum) {
				setValue(value);
			}

			setState((state) => ({
				...state,
				showLoremIpsum
			}));
		},
		[value]
	);

	const onEditorChange = useCallback((value) => {
		setValue(value);
	}, []);

	const setWorkboxWidth = useCallback((tab) => {
		setState((state) => ({
			...state,
			workBoxWidth: tab.props.width
		}));

		if (typeof document !== 'undefined') {
			setTimeout(() => {
				const event = document.createEvent('HTMLEvents');
				event.initEvent('resize', true, true);
				window.dispatchEvent(event);
			}, 100);
		}
	}, []);

	const setCSS = useCallback(
		(css, theme) => {
			setState((state) => ({
				...state,
				css: css || config.initialCSS,
				theme
			}));
		},
		[config.initialCSS]
	);

	const restoreDefault = useCallback(() => {
		if (
			window.confirm(
				'Are you certain you want to revert to the default settings?'
			)
		) {
			Themes.resetStyles = {};
			setState({ ...getDefaultState(Jodit, config) });
			setTick((tick) => tick + 1);
		}
	}, [config, Jodit]);

	const code = useMemo(
		() => getCode(Jodit, config, state, setIsDefault),
		[Jodit, config, state, setIsDefault]
	);

	useEffect(() => {
		if (typeof config.setCode === 'function') {
			config.setCode(code);
		}

		if (typeof config.setCSS === 'function' && state.css) {
			config.setCSS(state.css);
		}
	}, [config, code, state.css]);

	return (
		<div className={style.layout}>
			<div className={style.leftside}>
				<div ref={ref} />
				{config.showEditor && (
					<ViewEditor
						state={state}
						onChange={toggleLoremIpsum}
						jodit={props.Jodit}
						onChange1={onEditorChange}
						value={value}
					/>
				)}
				{config.showCode && <GeneratedCode code={code} state={state} />}
				{state.css && <style>{state.css}</style>}
			</div>
			<div className={style.rightside}>
				<div className={style.item}>
					<Tabs currentTab={state.currentTab} setTab={setTab}>
						<Tab label="Options">
							{isDefault || (
								<div className={style.defaultRestore}>
									<button
										onClick={restoreDefault}
										type={'button'}
									>
										Restore defaults
									</button>
								</div>
							)}

							<Options
								Jodit={Jodit}
								state={state.config}
								height={sizes.height}
								width={sizes.width}
								setOption={setOption}
								setHeight={setHeight}
								setWidth={setWidth}
							/>
						</Tab>
						<Tab label="Sizes">
							<Sizes
								state={state.config}
								height={sizes.height}
								width={sizes.width}
								setOption={setOption}
								setHeight={setHeight}
								setWidth={setWidth}
							/>
						</Tab>
						{config.showButtonsTab === false ||
							state.config.toolbar === false || (
								<Tab label="Buttons">
									<TabButtons
										setOption={setOption}
										state={state}
										setButtonsTab={setButtonsTab}
										setWorkboxWidth={setWorkboxWidth}
										Jodit={Jodit}
										setButtons={setButtons}
									/>
								</Tab>
							)}
						{state.config.iframe === false || (
							<Tab label="Iframe mode">
								<URL
									label="Iframe Base URL"
									name="iframeBaseUrl"
									onChange={setOption}
									value={state.config.iframeBaseUrl}
								/>
								<Text
									label="iframe Default Style"
									name="iframeStyle"
									onChange={setOption}
									value={state.config.iframeStyle}
								/>
								<URLS
									label="Iframe external stylesheets files"
									name="iframeCSSLinks"
									onChange={setOption}
									value={state.config.iframeCSSLinks}
								/>
							</Tab>
						)}
						<Tab label="State">
							<State
								Jodit={Jodit}
								config={state.config}
								setOption={setOption}
							/>
						</Tab>
						<Tab label="Plugins">
							<Plugins
								Jodit={Jodit}
								config={state.config}
								setOption={setOption}
							/>
						</Tab>
						<Tab label="Themes">
							<List
								value={state.config.theme}
								name="theme"
								onChange={setOption}
								list={{
									default: 'Default',
									dark: 'Dark'
								}}
								label="Theme"
							/>

							{state.config.theme === 'default' && (
								<Themes theme={state.theme} setCSS={setCSS} />
							)}
						</Tab>
					</Tabs>
				</div>
			</div>
		</div>
	);
}

function getDefaultState(Jodit, config) {
	return {
		showLoremIpsum: true,
		currentButtonsTab: null,
		currentTab: config.currentTab,
		workBoxWidth: 'auto',

		buttons: {
			buttons: [],
			buttonsMD: getButtons('buttonsMD'),
			buttonsSM: getButtons('buttonsSM'),
			buttonsXS: getButtons('buttonsXS')
		},

		removeButtons: {
			buttons: [],
			buttonsMD: getRemoveButtons('buttonsMD'),
			buttonsSM: getRemoveButtons('buttonsSM'),
			buttonsXS: getRemoveButtons('buttonsXS')
		},

		activeIndex: {
			buttons: 0,
			buttonsMD: 0,
			buttonsSM: 0,
			buttonsXS: 0
		},

		css: '',

		theme: {
			'--jd-color-background-default': '#ffffff',
			'--jd-color-border': '#dadada',
			'--jd-color-panel': '#f9f9f9',
			'--jd-color-icon': '#4c4c4c'
		},

		config: {
			autofocus: Jodit.defaultOptions.autofocus,
			useSearch: Jodit.defaultOptions.useSearch,
			defaultFontSizePoints: Jodit.defaultOptions.defaultFontSizePoints,
			toolbar: Jodit.defaultOptions.toolbar,
			iframe: Jodit.defaultOptions.iframe,
			iframeStyle: Jodit.defaultOptions.iframeStyle,

			uploader: Jodit.defaultOptions.uploader,

			textIcons: Jodit.defaultOptions.textIcons,
			readonly: Jodit.defaultOptions.readonly,
			spellcheck: Jodit.defaultOptions.spellcheck,
			language: Jodit.defaultOptions.language,
			direction: Jodit.defaultOptions.direction,
			theme: Jodit.defaultOptions.theme,
			toolbarButtonSize: Jodit.defaultOptions.toolbarButtonSize,
			enter: Jodit.defaultOptions.enter,
			defaultMode: Jodit.defaultOptions.defaultMode,
			allowResizeY: Jodit.defaultOptions.allowResizeY,
			allowResizeX: Jodit.defaultOptions.allowResizeX,

			toolbarAdaptive: Jodit.defaultOptions.toolbarAdaptive,
			toolbarSticky: Jodit.defaultOptions.toolbarSticky,
			toolbarStickyOffset: Jodit.defaultOptions.toolbarStickyOffset,

			showCharsCounter: Jodit.defaultOptions.showCharsCounter,
			showWordsCounter: Jodit.defaultOptions.showWordsCounter,
			showXPathInStatusbar: Jodit.defaultOptions.showXPathInStatusbar,

			saveHeightInStorage: Jodit.defaultOptions.saveHeightInStorage,
			saveModeInStorage: Jodit.defaultOptions.saveModeInStorage,

			askBeforePasteHTML: Jodit.defaultOptions.askBeforePasteHTML,
			askBeforePasteFromWord: Jodit.defaultOptions.askBeforePasteFromWord,
			defaultActionOnPaste: Jodit.defaultOptions.defaultActionOnPaste,

			disablePlugins: Jodit.defaultOptions.disablePlugins,

			height: Jodit.defaultOptions.height,
			minHeight: Jodit.defaultOptions.minHeight,
			maxHeight: Jodit.defaultOptions.maxHeight,
			width: Jodit.defaultOptions.width,
			minWidth: Jodit.defaultOptions.minWidth,
			maxWidth: Jodit.defaultOptions.maxWidth,
			sizeLG: 800
		}
	};
}

function getButtons(type) {
	return [];
}

function getRemoveButtons(type) {
	return [];
}

function getCode(Jodit, config, state, setDefault) {
	const getChangedOption = (config, defaultOptions) => {
		const keys = Object.keys(config),
			options = Array.isArray(config) ? [] : {};

		keys.forEach((key) => {
			if (
				defaultOptions[key] !== undefined &&
				JSON.stringify(config[key]) !==
					JSON.stringify(defaultOptions[key]) &&
				['sizeLG'].indexOf(key) === -1
			) {
				options[key] =
					typeof config[key] === 'object'
						? getChangedOption(config[key], defaultOptions[key])
						: config[key];
			}
		});

		return options;
	};

	const options = getChangedOption(state.config, Jodit.defaultOptions);

	['buttons', 'buttonsMD', 'buttonsSM', 'buttonsXS'].forEach((key) => {
		if (options[key]) {
			options[key] = options[key].toString();
		}
	});

	if (typeof config.setConfig === 'function') {
		config.setConfig(options);
	}

	setDefault(Object.keys(options).length === 0 && state.css === '');

	const con = JSON.stringify(options, null, 2);

	if (state.currentTab !== 'Options' && state.currentTab !== null) {
		options.currentTab = state.currentTab;
	}

	if (config.historyAPI) {
		const query = http_build_query(options),
			route = window.location.pathname + (query ? '?' + query : '');

		const oldRoute = window.location.pathname + window.location.search;

		if (oldRoute !== route) {
			getHistory().push(route, options);
		}
	}

	return (
		'const editor = Jodit.make("#editor"' +
		(con !== '{}' ? ', ' + con + '' : '') +
		');'
	);
}

function debounce(f, ms) {
	let timer = null;

	return function (...args) {
		const onComplete = () => {
			f.apply(this, args);
			timer = null;
		};

		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(onComplete, ms);
	};
}

export default JoditMaster;
