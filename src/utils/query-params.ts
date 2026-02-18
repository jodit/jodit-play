function urlencode(str: string): string {
	return encodeURIComponent(str)
		.replace(/!/g, '%21')
		.replace(/'/g, '%27')
		.replace(/\(/g, '%28')
		.replace(/\)/g, '%29')
		.replace(/\*/g, '%2A');
}

export function buildQueryString(
	data: Record<string, unknown>,
	separator = '&'
): string {
	const parts: string[] = [];

	for (const key of Object.keys(data)) {
		const query = serializeParam(key, data[key], separator);
		if (query !== '') {
			parts.push(query);
		}
	}

	return parts.join(separator);
}

function serializeParam(
	key: string,
	value: unknown,
	separator: string
): string {
	if (value === null || value === undefined) {
		return '';
	}

	if (typeof value === 'object' && !Array.isArray(value)) {
		const parts: string[] = [];
		const obj = value as Record<string, unknown>;

		for (const k of Object.keys(obj)) {
			if (obj[k] !== null && obj[k] !== undefined) {
				const sub = serializeParam(
					key + '[' + k + ']',
					obj[k],
					separator
				);
				if (sub !== '') {
					parts.push(sub);
				}
			}
		}

		return parts.join(separator);
	}

	if (Array.isArray(value)) {
		const parts: string[] = [];

		for (let i = 0; i < value.length; i++) {
			const sub = serializeParam(
				key + '[' + i + ']',
				value[i],
				separator
			);
			if (sub !== '') {
				parts.push(sub);
			}
		}

		return parts.join(separator);
	}

	if (typeof value === 'function') {
		return '';
	}

	return urlencode(key) + '=' + urlencode(String(value));
}

export function parseQueryParams(query: string): Record<string, unknown> {
	if (!query) {
		return {};
	}

	const cleaned = /^[?#]/.test(query) ? query.slice(1) : query;

	return cleaned
		.split('&')
		.reduce<Record<string, unknown>>((params, param) => {
			const [rawKey, rawValue] = param.split('=');
			const normalizedKey = rawKey
				.replace(/%5B/g, '.')
				.replace(/%5D/g, '');
			const keys = normalizedKey.split('.');

			let link = params as Record<string, unknown>;

			for (let i = 0; i < keys.length - 1; i++) {
				const name = keys[i];

				if (!link[name] || typeof link[name] !== 'object') {
					link[name] = {};
				}

				link = link[name] as Record<string, unknown>;
			}

			const finalKey = keys[keys.length - 1];
			const decoded = rawValue
				? decodeURIComponent(rawValue.replace(/\+/g, ' '))
				: '';

			// Auto-cast types
			if (/^\d+$/.test(decoded)) {
				link[finalKey] = parseInt(decoded, 10);
			} else if (decoded === 'true') {
				link[finalKey] = true;
			} else if (decoded === 'false') {
				link[finalKey] = false;
			} else {
				link[finalKey] = decoded;
			}

			return params;
		}, {});
}
