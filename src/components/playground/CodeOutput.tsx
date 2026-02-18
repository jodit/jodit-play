import React, { useCallback, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import s from './CodeOutput.module.css';

interface CodeOutputProps {
	code: string;
	css: string;
}

export const CodeOutput: React.FC<CodeOutputProps> = ({ code, css }) => {
	const [activeTab, setActiveTab] = useState<'js' | 'css'>('js');
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(async () => {
		const text = activeTab === 'js' ? code : css;

		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			// Fallback for older browsers
			const textarea = document.createElement('textarea');
			textarea.value = text;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand('copy');
			document.body.removeChild(textarea);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		}
	}, [code, css, activeTab]);

	return (
		<div className={s.card}>
			<div className={s.header}>
				<div className={s.tabs}>
					<button
						type="button"
						className={activeTab === 'js' ? s.tabActive : s.tab}
						onClick={() => setActiveTab('js')}
					>
						JavaScript
					</button>
					{css && (
						<button
							type="button"
							className={
								activeTab === 'css' ? s.tabActive : s.tab
							}
							onClick={() => setActiveTab('css')}
						>
							CSS
						</button>
					)}
				</div>
				<button
					type="button"
					className={copied ? s.copyBtnDone : s.copyBtn}
					onClick={handleCopy}
				>
					{copied ? 'Copied!' : 'Copy'}
				</button>
			</div>
			<div className={s.code}>
				<SyntaxHighlighter
					showLineNumbers={false}
					language={activeTab === 'js' ? 'javascript' : 'css'}
					style={tomorrow}
					customStyle={{
						margin: 0,
						borderRadius: 0,
						fontSize: '13px'
					}}
				>
					{activeTab === 'js' ? code : css}
				</SyntaxHighlighter>
			</div>
		</div>
	);
};
