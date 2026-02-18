import React, { useEffect, useState } from 'react';

import type { AppConfig, AppProps, JoditStatic } from './types';
import { parseQueryParams } from './utils/query-params';
import { Playground } from './components/playground/Playground';

import './App.module.css';

function getAppConfig(): AppConfig {
	const windowConfig =
		typeof window !== 'undefined' && window.JoditPlayConfig
			? window.JoditPlayConfig
			: {};

	const base: AppConfig = {
		showCode: true,
		showEditor: true,
		showButtonsTab: true,
		historyAPI: true,
		dataURL: './',
		currentTab: null,
		setCSS: () => {},
		setCode: () => {},
		setConfig: () => {},
		ready: () => {},
		initialCSS: '',
		initialConfig: {},
		...windowConfig
	};

	if (typeof window !== 'undefined') {
		const params = parseQueryParams(window.location.search.substring(1));

		base.currentTab = (params['currentTab'] as string) ?? null;
		base.initialConfig = {
			...base.initialConfig,
			...params
		};
	}

	return base;
}

declare global {
	interface Window {
		JoditPlayConfig?: Partial<AppConfig>;
	}
}

const appConfig = getAppConfig();

const App: React.FC<AppProps> = ({ loadJodit, loading }) => {
	const [jodit, setJodit] = useState<JoditStatic | null>(null);

	useEffect(() => {
		loadJodit().then(J => {
			setJodit(J);
		});
	}, [loadJodit]);

	if (!jodit) {
		return <div>{loading}</div>;
	}

	return <Playground Jodit={jodit} config={appConfig} />;
};

export default App;
