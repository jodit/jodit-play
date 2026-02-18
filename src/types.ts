import { ReactElement } from 'react';

// --- Jodit library types (external, untyped) ---

export interface JoditInstance {
	readonly toolbar: {
		getButtonsNames(): string[];
	};
	readonly workplace: {
		tabIndex: number;
	};
	readonly events: {
		on(event: string, callback: (value: string) => void): void;
	};
	value: string;
	destruct(): void;
}

export interface JoditDefaultOptions {
	autofocus: boolean;
	useSearch: boolean;
	spellcheck: boolean;
	iframe: boolean;
	direction: string;
	language: string;
	enter: string;
	defaultMode: number;
	toolbar: boolean;
	textIcons: boolean;
	toolbarButtonSize: string;
	toolbarSticky: boolean;
	toolbarStickyOffset: number;
	toolbarAdaptive: boolean;
	defaultFontSizePoints: string;
	readonly: boolean;
	askBeforePasteHTML: boolean;
	askBeforePasteFromWord: boolean;
	defaultActionOnPaste: string;
	showCharsCounter: boolean;
	showWordsCounter: boolean;
	showXPathInStatusbar: boolean;
	saveHeightInStorage: boolean;
	saveModeInStorage: boolean;
	disablePlugins: string | string[];
	theme: string;
	height: number | string;
	minHeight: number;
	maxHeight: number;
	width: number | string;
	minWidth: number;
	maxWidth: number;
	allowResizeX: boolean;
	allowResizeY: boolean;
	uploader: { insertImageAsBase64URI: boolean };
	iframeStyle: string;
	iframeCSSLinks: string[];
	iframeBaseUrl: string;

	// New options (may not exist in all Jodit versions)
	placeholder?: string;
	showPlaceholder?: boolean;
	disabled?: boolean;
	inline?: boolean;
	tabIndex?: number;
	cursorAfterAutofocus?: string;
	cache?: boolean;
	showTooltip?: boolean;
	showTooltipDelay?: number;
	useNativeTooltip?: boolean;
	toolbarInline?: boolean;
	toolbarInlineForSelection?: boolean;
	statusbar?: boolean;
	hidePoweredByJodit?: boolean;
	fullsize?: boolean;
	beautifyHTML?: boolean;
	nl2brInPlainText?: boolean;
	addNewLine?: boolean;
	limitWords?: number | false;
	limitChars?: number | false;
	memorizeChoiceWhenPasteFragment?: boolean;
	scrollToPastedContent?: boolean;
	zIndex?: number;
	className?: string;
	editorClassName?: string;
	defaultLineHeight?: number;
	preset?: string;

	buttons: string[];
	buttonsMD: string[];
	buttonsSM: string[];
	buttonsXS: string[];

	[key: string]: unknown;
}

export interface JoditConstants {
	MODE_WYSIWYG: number;
	MODE_SOURCE: number;
	MODE_SPLIT: number;
	INSERT_AS_HTML: string;
	INSERT_CLEAR_HTML: string;
	INSERT_AS_TEXT: string;
	INSERT_ONLY_TEXT: string;
}

export interface JoditStatic {
	make(
		element: HTMLElement | HTMLTextAreaElement,
		config: Record<string, unknown>
	): JoditInstance;
	defaultOptions: JoditDefaultOptions;
	lang: Record<string, unknown>;
	constants: JoditConstants;
	plugins: {
		__items: Map<string, unknown>;
	};
	modules: {
		Icon: {
			get(name: string): string;
		};
	};
}

// --- Playground state types ---

export type ButtonSetName = 'buttons' | 'buttonsMD' | 'buttonsSM' | 'buttonsXS';

export interface ButtonsState {
	buttons: string[];
	buttonsMD: string[];
	buttonsSM: string[];
	buttonsXS: string[];
}

export interface PlaygroundConfig {
	preset?: string;
	autofocus: boolean;
	useSearch: boolean;
	spellcheck: boolean;
	iframe: boolean;
	direction: string;
	language: string;
	enter: string;
	defaultMode: number;
	toolbar: boolean;
	textIcons: boolean;
	toolbarButtonSize: string;
	toolbarSticky: boolean;
	toolbarStickyOffset: number;
	toolbarAdaptive: boolean;
	defaultFontSizePoints: string;
	readonly: boolean;
	askBeforePasteHTML: boolean;
	askBeforePasteFromWord: boolean;
	defaultActionOnPaste: string;
	showCharsCounter: boolean;
	showWordsCounter: boolean;
	showXPathInStatusbar: boolean;
	saveHeightInStorage: boolean;
	saveModeInStorage: boolean;
	disablePlugins: string | string[];
	theme: string;
	height: number | string;
	minHeight: number;
	maxHeight: number;
	width: number | string;
	minWidth: number;
	maxWidth: number;
	allowResizeX: boolean;
	allowResizeY: boolean;
	uploader: { insertImageAsBase64URI: boolean };
	iframeStyle: string;
	iframeCSSLinks: string[];
	iframeBaseUrl: string;

	// New options
	placeholder?: string;
	showPlaceholder?: boolean;
	disabled?: boolean;
	inline?: boolean;
	tabIndex?: number;
	cursorAfterAutofocus?: string;
	cache?: boolean;
	showTooltip?: boolean;
	showTooltipDelay?: number;
	useNativeTooltip?: boolean;
	toolbarInline?: boolean;
	toolbarInlineForSelection?: boolean;
	statusbar?: boolean;
	hidePoweredByJodit?: boolean;
	fullsize?: boolean;
	beautifyHTML?: boolean;
	nl2brInPlainText?: boolean;
	addNewLine?: boolean;
	limitWords?: number | false;
	limitChars?: number | false;
	memorizeChoiceWhenPasteFragment?: boolean;
	scrollToPastedContent?: boolean;
	zIndex?: number;
	className?: string;
	editorClassName?: string;
	defaultLineHeight?: number;

	buttons?: string[];
	buttonsMD?: string[];
	buttonsSM?: string[];
	buttonsXS?: string[];
	sizeLG: number;

	[key: string]: unknown;
}

export interface ThemeState {
	'--jd-color-background-default': string;
	'--jd-color-border': string;
	'--jd-color-panel': string;
	'--jd-color-icon': string;
	[key: string]: string;
}

export interface PlaygroundState {
	showLoremIpsum: boolean;
	currentButtonsTab: string | null;
	buttons: ButtonsState;
	removeButtons: ButtonsState;
	activeIndex: Record<ButtonSetName, number>;
	css: string;
	theme: ThemeState;
	config: PlaygroundConfig;
}

export type SetOptionFn = (value: unknown, name: string) => void;

// --- App-level types ---

export interface AppConfig {
	showCode: boolean;
	showEditor: boolean;
	showButtonsTab: boolean;
	historyAPI: boolean;
	dataURL: string;
	setCSS: (css: string) => void;
	setCode: (code: string) => void;
	setConfig: (config: Record<string, unknown>) => void;
	ready: () => void;
	initialCSS: string;
	initialConfig: Record<string, unknown>;
	currentTab: string | null;
}

export interface AppProps {
	loadJodit: () => Promise<JoditStatic>;
	loading: ReactElement;
}
