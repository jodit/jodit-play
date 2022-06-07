import React, { PureComponent } from 'react';
import './App.css';
import JoditMaster from './components/master/JoditMaster';

export const urlencode = function (str) {
	str = str + '';

	return encodeURIComponent(str)
		.replace(/!/g, '%21')
		.replace(/'/g, '%27')
		.replace(/\(/g, '%28')
		.replace(/\)/g, '%29')
		.replace(/\*/g, '%2A');
};

export function http_build_query(formdata, numericPrefix, argSeparator) {
	let encodeFunc = urlencode;

	let value;
	let key;
	let tmp = [];

	let _httpBuildQueryHelper = function (key, val, argSeparator) {
		let k;
		let tmp = [];
		if (val === true) {
			val = true;
		} else if (val === false) {
			val = false;
		}
		if (val !== null) {
			if (typeof val === 'object') {
				for (k in val) {
					if (val[k] !== null) {
						tmp.push(
							_httpBuildQueryHelper(
								key + '[' + k + ']',
								val[k],
								argSeparator
							)
						);
					}
				}
				return tmp.join(argSeparator);
			} else if (typeof val !== 'function') {
				return encodeFunc(key) + '=' + encodeFunc(val);
			} else {
				throw new Error(
					'There was an error processing for http_build_query().'
				);
			}
		} else {
			return '';
		}
	};

	if (!argSeparator) {
		argSeparator = '&';
	}
	for (key in formdata) {
		value = formdata[key];
		if (numericPrefix && !isNaN(key)) {
			key = String(numericPrefix) + key;
		}
		let query = _httpBuildQueryHelper(key, value, argSeparator);
		if (query !== '') {
			tmp.push(query);
		}
	}

	return tmp.join(argSeparator);
}

const getParams = (query) => {
	if (!query) {
		return {};
	}

	return (/^[?#]/.test(query) ? query.slice(1) : query)
		.split('&')
		.reduce((params, param) => {
			let [key, value] = param.split('=');

			key = key.replace(/%5B/g, '.').replace(/%5D/g, '');

			let link = params,
				keys = key.split('.');
			keys.forEach((name, index) => {
				if (index !== keys.length - 1) {
					if (!link[name]) {
						link[name] = {};
					}
					link = link[name];
				}
			});

			key = keys[keys.length - 1];

			link[key] = value
				? decodeURIComponent(value.replace(/\+/g, ' '))
				: '';

			if (link[key].toString().match(/^[0-9]+$/)) {
				link[key] = parseInt(link[key], 10);
			}

			if (link[key] === 'true') {
				link[key] = true;
			}
			if (link[key] === 'false') {
				link[key] = false;
			}

			return params;
		}, {});
};

class App extends PureComponent {
	config;

	state = {
		Jodit: null
	};

	componentDidMount() {
		const loadJodit = this.props.loadJodit;

		loadJodit().then((Jodit) => {
			this.setState({
				Jodit
			});
		});
	}

	constructor() {
		super();

		this.config = {
			...{
				currentTab: null,
				showCode: true,
				showEditor: true,
				showButtonsTab: true,
				historyAPI: true,
				dataURL: './',
				setCSS: (css) => {},
				setCode: (code) => {},
				setConfig: (config) => {},
				ready: () => {},
				initialCSS: '',
				initialConfig: {},
				...window.JoditPlayConfig
			}
		};

		this.config.currentTab =
			getParams(window.location.search.substring(1))['currentTab'] ||
			null;
		this.config.initialConfig = {
			...this.config.initialConfig,
			...getParams(window.location.search.substr(1))
		};
	}

	render() {
		return (
			<div className="App">
				{this.state.Jodit && (
					<JoditMaster
						Jodit={this.state.Jodit}
						config={this.config}
					/>
				)}
			</div>
		);
	}
}

export default App;
