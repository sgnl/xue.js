
import Scene from './scene';

(function (window) {
	const Scenes = [];
	/**
	 * Module Methods
	 */

	function init({
			selector = '#snow-layer',
			density = 'normal',
			color = 'snow'
		} = {}) {
		switch (true) {
			case (typeof selector === 'string'): {
				const newScene = new Scene(document.querySelector(selector), color);
				Scenes.push(newScene);
				break;
			}
			case Array.isArray(selector): {
				const containers = document.querySelectorAll(selector);

				let newScene;
				for (let i = containers.length - 1; i >= 0; i--) {
					newScene = new Scene(containers[i], density);
					Scenes.push(newScene);
				}
				break;
			}
			default: {
				throw new Error('WHY ARE YOU SEEING THIS?!');
			}
		}
	}

	// export
	window.Xue = {init};
	return window;
})(window);
