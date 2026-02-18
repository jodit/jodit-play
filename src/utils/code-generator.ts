import type { JoditDefaultOptions, PlaygroundConfig } from '../types';

export function getChangedOptions(
	config: PlaygroundConfig,
	defaultOptions: JoditDefaultOptions
): Record<string, unknown> {
	const keys = Object.keys(config);
	const options: Record<string, unknown> = {};

	for (const key of keys) {
		if (key === 'sizeLG') {
			continue;
		}

		const defaultVal = defaultOptions[key];
		const currentVal = config[key];

		if (
			defaultVal !== undefined &&
			JSON.stringify(currentVal) !== JSON.stringify(defaultVal)
		) {
			if (
				currentVal !== null &&
				typeof currentVal === 'object' &&
				!Array.isArray(currentVal)
			) {
				options[key] = getChangedOptions(
					currentVal as unknown as PlaygroundConfig,
					defaultVal as unknown as JoditDefaultOptions
				);
			} else {
				options[key] = currentVal;
			}
		}
	}

	return options;
}

export function generateCode(options: Record<string, unknown>): string {
	const formatted = { ...options };

	// Convert button arrays to comma-separated strings for display
	const buttonKeys = ['buttons', 'buttonsMD', 'buttonsSM', 'buttonsXS'];

	for (const key of buttonKeys) {
		if (formatted[key] && Array.isArray(formatted[key])) {
			formatted[key] = (formatted[key] as string[]).join(',');
		}
	}

	const json = JSON.stringify(formatted, null, 2);

	if (json === '{}') {
		return 'const editor = Jodit.make("#editor");';
	}

	return 'const editor = Jodit.make("#editor", ' + json + ');';
}
