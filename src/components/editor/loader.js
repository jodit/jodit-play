import 'jodit/build/jodit.es2018.min.css';

function isIE() {
	return typeof navigator !== 'undefined' &&
		(navigator.userAgent.match(/MSIE|Internet Explorer/i) ||
			navigator.userAgent.match(/Trident\/7\..*?rv:11/i));
}

let loadJoditPromise;
export async function loadJoditEditor() {

	if (!loadJoditPromise) {
		if (!isIE()) {
			loadJoditPromise = import('jodit/build/jodit.es2018.min');
		} else {
			loadJoditPromise = import('jodit/build/jodit.min');
		}
	}

	const { Jodit } = await loadJoditPromise;

	return Jodit;
}
