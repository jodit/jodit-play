import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';

import type {
	JoditStatic,
	PlaygroundState,
	PlaygroundConfig,
	AppConfig,
	ThemeState,
	ButtonSetName
} from '../../types';
import { LOREM_IPSUM } from '../../constants/lorem-ipsum';
import { debounce } from '../../utils/debounce';
import { buildQueryString } from '../../utils/query-params';
import { getChangedOptions, generateCode } from '../../utils/code-generator';
import { EditorPreview } from './EditorPreview';
import { CodeOutput } from './CodeOutput';
import { ConfigPanel } from '../config-panel/ConfigPanel';

import s from './Playground.module.css';

interface PlaygroundProps {
	Jodit: JoditStatic;
	config: AppConfig;
}

const DEFAULT_HEIGHT = 150;
const DEFAULT_WIDTH = 500;

function getDefaultState(
	Jodit: JoditStatic,
	config: AppConfig
): PlaygroundState {
	const defaults = Jodit.defaultOptions;

	return {
		showLoremIpsum: true,
		currentButtonsTab: null,
		buttons: {
			buttons: [],
			buttonsMD: [],
			buttonsSM: [],
			buttonsXS: []
		},
		removeButtons: {
			buttons: [],
			buttonsMD: [],
			buttonsSM: [],
			buttonsXS: []
		},
		activeIndex: {
			buttons: 0,
			buttonsMD: 0,
			buttonsSM: 0,
			buttonsXS: 0
		},
		css: config.initialCSS || '',
		theme: {
			'--jd-color-background-default': '#ffffff',
			'--jd-color-border': '#dadada',
			'--jd-color-panel': '#f9f9f9',
			'--jd-color-icon': '#4c4c4c'
		},
		config: {
			preset: defaults.preset,
			autofocus: defaults.autofocus,
			useSearch: defaults.useSearch,
			spellcheck: defaults.spellcheck,
			iframe: defaults.iframe,
			direction: defaults.direction,
			language: defaults.language,
			enter: defaults.enter,
			defaultMode: defaults.defaultMode,
			toolbar: defaults.toolbar,
			textIcons: defaults.textIcons,
			toolbarButtonSize: defaults.toolbarButtonSize,
			toolbarSticky: defaults.toolbarSticky,
			toolbarStickyOffset: defaults.toolbarStickyOffset,
			toolbarAdaptive: defaults.toolbarAdaptive,
			defaultFontSizePoints: defaults.defaultFontSizePoints,
			readonly: defaults.readonly,
			askBeforePasteHTML: defaults.askBeforePasteHTML,
			askBeforePasteFromWord: defaults.askBeforePasteFromWord,
			defaultActionOnPaste: defaults.defaultActionOnPaste,
			showCharsCounter: defaults.showCharsCounter,
			showWordsCounter: defaults.showWordsCounter,
			showXPathInStatusbar: defaults.showXPathInStatusbar,
			saveHeightInStorage: defaults.saveHeightInStorage,
			saveModeInStorage: defaults.saveModeInStorage,
			disablePlugins: defaults.disablePlugins,
			theme: defaults.theme,
			height: defaults.height,
			minHeight: defaults.minHeight,
			maxHeight: defaults.maxHeight,
			width: defaults.width,
			minWidth: defaults.minWidth,
			maxWidth: defaults.maxWidth,
			allowResizeX: defaults.allowResizeX,
			allowResizeY: defaults.allowResizeY,
			uploader: { ...defaults.uploader },
			iframeStyle: defaults.iframeStyle,
			iframeCSSLinks: defaults.iframeCSSLinks
				? [...defaults.iframeCSSLinks]
				: [],
			iframeBaseUrl: defaults.iframeBaseUrl,

			// New options (use defaults if available)
			placeholder: defaults.placeholder,
			showPlaceholder: defaults.showPlaceholder,
			disabled: defaults.disabled,
			inline: defaults.inline,
			tabIndex: defaults.tabIndex,
			cursorAfterAutofocus: defaults.cursorAfterAutofocus,
			cache: defaults.cache,
			showTooltip: defaults.showTooltip,
			showTooltipDelay: defaults.showTooltipDelay as number | undefined,
			useNativeTooltip: defaults.useNativeTooltip,
			toolbarInline: defaults.toolbarInline,
			toolbarInlineForSelection: defaults.toolbarInlineForSelection,
			statusbar: defaults.statusbar,
			hidePoweredByJodit: defaults.hidePoweredByJodit,
			fullsize: defaults.fullsize,
			beautifyHTML: defaults.beautifyHTML,
			nl2brInPlainText: defaults.nl2brInPlainText,
			addNewLine: defaults.addNewLine,
			limitWords: defaults.limitWords,
			limitChars: defaults.limitChars,
			memorizeChoiceWhenPasteFragment:
				defaults.memorizeChoiceWhenPasteFragment,
			scrollToPastedContent: defaults.scrollToPastedContent,
			zIndex: defaults.zIndex,
			className: defaults.className,
			editorClassName: defaults.editorClassName,
			defaultLineHeight: defaults.defaultLineHeight,

			sizeLG: 800
		}
	};
}

export const Playground: React.FC<PlaygroundProps> = ({ Jodit, config }) => {
	const hiddenRef = useRef<HTMLDivElement>(null);
	const [tick, setTick] = useState(0);
	const [configPanelOpen, setConfigPanelOpen] = useState(true);

	const [sizes, setSizes] = useState({
		height: DEFAULT_HEIGHT,
		width: DEFAULT_WIDTH
	});

	const [state, setState] = useState<PlaygroundState>(() => {
		const defaultState = getDefaultState(Jodit, config);

		return {
			...defaultState,
			css: defaultState.css || config.initialCSS || '',
			config: {
				...defaultState.config,
				...config.initialConfig
			} as PlaygroundConfig
		};
	});

	const [value, setValue] = useState('');

	// Initialize button list from a temporary Jodit instance
	useEffect(() => {
		const element = hiddenRef.current;

		if (!element) {
			return;
		}

		const jodit = Jodit.make(element, {
			disablePlugins: 'mobile'
		});

		const buttonsList = jodit.toolbar.getButtonsNames();

		setState(prev => ({
			...prev,
			buttons: {
				...prev.buttons,
				buttons: buttonsList
			}
		}));

		jodit.destruct();
	}, [Jodit, tick]);

	const setOption = useMemo(
		() =>
			debounce((value: unknown, name: string) => {
				if (name === 'height' || name === 'width') {
					if (value !== 'auto') {
						setSizes(prev => ({
							...prev,
							[name]: value as number
						}));
					}
				}

				setState(prev => {
					const newConfig = { ...prev.config };

					// Handle iframe reset
					if (name === 'iframe' && value === false) {
						newConfig.iframeStyle =
							Jodit.defaultOptions.iframeStyle;
						newConfig.iframeCSSLinks = Jodit.defaultOptions
							.iframeCSSLinks
							? [...Jodit.defaultOptions.iframeCSSLinks]
							: [];
						newConfig.iframeBaseUrl =
							Jodit.defaultOptions.iframeBaseUrl;
					}

					// Handle nested keys like "uploader.insertImageAsBase64URI"
					const keys = name.split('.');
					let target: Record<string, unknown> =
						newConfig as unknown as Record<string, unknown>;

					for (let i = 0; i < keys.length - 1; i++) {
						target[keys[i]] = {
							...(target[keys[i]] as Record<string, unknown>)
						};
						target = target[keys[i]] as Record<string, unknown>;
					}

					target[keys[keys.length - 1]] = value;

					return {
						...prev,
						config: newConfig
					};
				});
			}, 100),
		[Jodit]
	);

	const setHeight = useCallback(
		(auto: boolean) => {
			setOption(auto ? 'auto' : sizes.height, 'height');
		},
		[setOption, sizes.height]
	);

	const setWidth = useCallback(
		(auto: boolean) => {
			setOption(auto ? 'auto' : sizes.width, 'width');
		},
		[setOption, sizes.width]
	);

	const setButtons = useCallback(
		(
			name: string,
			buttons: string[],
			removeButtons: string[],
			activeIndex: number
		) => {
			setState(prev => {
				const key = name as ButtonSetName;
				const newState = {
					...prev,
					buttons: { ...prev.buttons, [key]: buttons },
					removeButtons: {
						...prev.removeButtons,
						[key]: removeButtons
					},
					activeIndex: {
						...prev.activeIndex,
						[key]: activeIndex
					},
					config: {
						...prev.config,
						[key]: buttons.filter(
							b => removeButtons.indexOf(b) === -1
						)
					}
				};

				return newState;
			});
		},
		[]
	);

	const toggleLoremIpsum = useCallback((showLoremIpsum: boolean) => {
		setState(prev => ({
			...prev,
			showLoremIpsum
		}));
	}, []);

	const onEditorChange = useCallback((v: string) => {
		setValue(v);
	}, []);

	const setCSS = useCallback(
		(css: string, theme: ThemeState) => {
			setState(prev => ({
				...prev,
				css: css || config.initialCSS,
				theme
			}));
		},
		[config.initialCSS]
	);

	const restoreDefaults = useCallback(() => {
		if (
			window.confirm(
				'Are you certain you want to revert to the default settings?'
			)
		) {
			setState(getDefaultState(Jodit, config));
			setTick(t => t + 1);
		}
	}, [config, Jodit]);

	// Derive changed options and code
	const changedOptions = useMemo(
		() => getChangedOptions(state.config, Jodit.defaultOptions),
		[Jodit, state.config]
	);

	const isDefault =
		Object.keys(changedOptions).length === 0 && state.css === '';

	const code = useMemo(() => generateCode(changedOptions), [changedOptions]);

	// Sync code/CSS/config callbacks
	useEffect(() => {
		if (typeof config.setConfig === 'function') {
			config.setConfig(changedOptions);
		}

		if (typeof config.setCode === 'function') {
			config.setCode(code);
		}

		if (typeof config.setCSS === 'function' && state.css) {
			config.setCSS(state.css);
		}
	}, [config, code, state.css, changedOptions]);

	// URL history sync
	useEffect(() => {
		if (!config.historyAPI || typeof window === 'undefined') {
			return;
		}

		const options = getChangedOptions(state.config, Jodit.defaultOptions);
		const query = buildQueryString(options);
		const route = window.location.pathname + (query ? '?' + query : '');
		const oldRoute = window.location.pathname + window.location.search;

		if (oldRoute !== route) {
			window.history.replaceState(options, '', route);
		}
	}, [Jodit, config.historyAPI, state.config]);

	const editorValue = state.showLoremIpsum ? LOREM_IPSUM : value;

	const toggleConfigPanel = useCallback(() => {
		setConfigPanelOpen(prev => !prev);
	}, []);

	return (
		<div className={s.layout}>
			<div ref={hiddenRef} style={{ display: 'none' }} />
			{state.css && <style>{state.css}</style>}

			<div className={s.main}>
				{config.showEditor && (
					<EditorPreview
						Jodit={Jodit}
						config={state.config}
						value={editorValue}
						showLoremIpsum={state.showLoremIpsum}
						onToggleLoremIpsum={toggleLoremIpsum}
						onEditorChange={onEditorChange}
					/>
				)}

				{config.showCode && <CodeOutput code={code} css={state.css} />}
			</div>

			<button
				type="button"
				className={s.toggleBtn}
				onClick={toggleConfigPanel}
				title={
					configPanelOpen
						? 'Hide configuration'
						: 'Show configuration'
				}
			>
				{configPanelOpen ? '\u00BB' : '\u00AB'}
			</button>

			{configPanelOpen && (
				<div className={s.sidebar}>
					<ConfigPanel
						Jodit={Jodit}
						state={state}
						height={sizes.height}
						width={sizes.width}
						setOption={setOption}
						setHeight={setHeight}
						setWidth={setWidth}
						setButtons={setButtons}
						setCSS={setCSS}
						isDefault={isDefault}
						onRestoreDefaults={restoreDefaults}
					/>
				</div>
			)}
		</div>
	);
};
