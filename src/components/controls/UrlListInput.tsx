import React, { useCallback, useRef } from 'react';

import s from './UrlListInput.module.css';

interface UrlListInputProps {
	label: string;
	name: string;
	value: string[];
	onChange: (value: string[], name: string) => void;
}

export const UrlListInput: React.FC<UrlListInputProps> = ({
	label,
	name,
	value,
	onChange
}) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const collectUrls = useCallback((extra?: string[]): string[] => {
		if (!containerRef.current) {
			return [];
		}

		const inputs =
			containerRef.current.querySelectorAll<HTMLInputElement>(
				'input[type="url"]'
			);

		const urls: string[] = [];

		for (let i = 0; i < inputs.length; i++) {
			if (inputs[i].value) {
				urls.push(inputs[i].value);
			}
		}

		if (extra) {
			return urls.concat(extra);
		}

		return urls;
	}, []);

	const handleBlur = useCallback(() => {
		onChange(collectUrls(), name);
	}, [collectUrls, onChange, name]);

	const handleAdd = useCallback(() => {
		onChange(collectUrls(['']), name);
	}, [collectUrls, onChange, name]);

	const handleRemove = useCallback(
		(index: number) => {
			const urls = Array.isArray(value) ? [...value] : [];
			urls.splice(index, 1);

			if (urls.length === 0) {
				urls.push('');
			}

			onChange(urls, name);
		},
		[value, onChange, name]
	);

	const urls = Array.isArray(value) && value.length > 0 ? value : [''];

	return (
		<div className={s.field}>
			<label className={s.label}>{label}</label>
			<div ref={containerRef} className={s.list}>
				{urls.map((url, index) => (
					<div key={index + '-' + url} className={s.row}>
						<input
							type="url"
							defaultValue={url}
							onBlur={handleBlur}
							className={s.input}
							placeholder="https://"
						/>
						<div className={s.actions}>
							<button
								type="button"
								className={s.btn}
								onClick={handleAdd}
								title="Add URL"
							>
								+
							</button>
							<button
								type="button"
								className={s.btnDanger}
								onClick={() => handleRemove(index)}
								title="Remove URL"
							>
								&times;
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
