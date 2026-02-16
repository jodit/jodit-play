import React from 'react';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import CopyText from '../copytext/CopyText';

export function GeneratedCode(props) {
	return (
		<div>
			<h2>Code</h2>
			<CopyText>
				<SyntaxHighlighter
					showLineNumbers={false}
					language="javascript"
					style={tomorrow}
				>
					{props.code}
				</SyntaxHighlighter>
			</CopyText>
			{props.state.css && (
				<React.Fragment>
					<h2>CSS</h2>
					<CopyText>
						<SyntaxHighlighter
							showLineNumbers={false}
							language="css"
							style={tomorrow}
						>
							{props.state.css}
						</SyntaxHighlighter>
					</CopyText>
				</React.Fragment>
			)}
		</div>
	);
}
