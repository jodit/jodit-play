declare module 'react-color' {
	import { Component } from 'react';

	export interface ColorResult {
		hex: string;
		rgb: { r: number; g: number; b: number; a: number };
		hsl: { h: number; s: number; l: number; a: number };
	}

	interface SketchPickerProps {
		color?: string | { r: number; g: number; b: number; a?: number };
		onChange?: (color: ColorResult) => void;
		onChangeComplete?: (color: ColorResult) => void;
		disableAlpha?: boolean;
		presetColors?: string[];
		width?: string;
		[key: string]: unknown;
	}

	export class SketchPicker extends Component<SketchPickerProps> {}
}

declare module 'react-syntax-highlighter' {
	import { Component } from 'react';

	interface SyntaxHighlighterProps {
		language?: string;
		style?: Record<string, React.CSSProperties>;
		showLineNumbers?: boolean;
		customStyle?: React.CSSProperties;
		children: string;
		PreTag?: string;
		[key: string]: unknown;
	}

	export class Prism extends Component<SyntaxHighlighterProps> {}
}

declare module 'react-syntax-highlighter/dist/cjs/styles/prism' {
	const tomorrow: Record<string, React.CSSProperties>;
	export { tomorrow };
}
