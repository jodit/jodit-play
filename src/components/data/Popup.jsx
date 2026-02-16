import React, { useCallback, useEffect } from 'react';
import style from './style.module.css';

export default function Popup(props) {
	const [state, setState] = React.useState({
		content: ''
	});

	const updateContent = useCallback(() => {
		const content = findInfo(props.needle, DATA, checkInfo) || 'Not found';

		if (state.content !== content) {
			setState({
				content
			});
		}
	}, [props.needle, state.content]);

	useEffect(() => {
		if (!DATA && !LOADINGSTATE) {
			LOADINGSTATE = true;
			loadData(() => {
				updateContent();
			});
		}
		if (DATA) {
			updateContent();
		}
	}, [updateContent]);

	return (
		<div className={style.box}>
			<div className={style.popup}>
				{state.content || <span>Loading ...</span>}
			</div>
		</div>
	);
}

let LOADINGSTATE = false;
let DATA = null;

function getMyPath() {
	if (typeof window === 'undefined') {
		return process.env.PUBLIC_URL ?? '';
	}

	return window.JoditPlayConfig.dataURL || process.env.PUBLIC_URL;
}

function loadData(success) {
	fetch(getMyPath() + 'data.json')
		.then((data) => data.json())
		.then((data) => {
			DATA = data;
			success();
		});
}

function checkInfo(needle, haystack) {
	if (
		haystack.name !== undefined &&
		haystack.name.replace(/"/g, '') === needle
	) {
		return findInfo(needle, haystack, (needle, haystack) => {
			if (
				haystack.shortText &&
				haystack.shortText.replace(/\s/g, '').length
			) {
				return haystack.shortText;
			}
		});
	}
}
function findInfo(needle, haystack, callback) {
	const info = callback(needle, haystack);

	if (info) {
		return info;
	}

	if (typeof haystack === 'object') {
		let result;

		Object.keys(haystack).some((key) => {
			result = findInfo(needle, haystack[key], callback);
			return !!result;
		});

		return result;
	}
}
