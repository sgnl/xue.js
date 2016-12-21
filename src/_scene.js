
import SnowFlake from './SnowFlake';

export default class Scene {
	constructor(containerElement, color) {
		this.scene = containerElement;
		this.snowflakeColor = color;
		this.snowflakes = [];

		this._containerDefaultStyles();
		this._containerParentDefaultStyles();

		// this.scene.addEventListener('snowenter', function() {
		//   // console.log('snow entering container!');
		// });

		this.scene.addEventListener('snowleave', (event) => {
			const flakeOut = event.details;
			this.snowflakes = this.snowflakes.filter(flake => flake === flakeOut);
		});

		this.frame();
	}

	_containerDefaultStyles() {
		let parentWidth = this.scene.parentNode.offsetWidth;
		let parentHeight = this.scene.parentNode.offsetHeight;

		let styles = [
			'position: absolute',
			'top:0',
			'left:0',
			`width:${parentWidth}px`,
			`height:${parentHeight}px`
		].join(';');

		this.scene.setAttribute('style', styles);
	}

	_containerParentDefaultStyles() {
		this.scene.parentNode.setAttribute('style', 'position: relative;');
	}

	addSnowFlakeToScene() {
		let newSnowFlake = new SnowFlake(this.scene, this.snowflakeColor);
		this.snowflakes.push(newSnowFlake);
	}

	frame() {
		setTimeout(() => {
			requestAnimationFrame(this.frame.bind(this));
			this.addSnowFlakeToScene();
		}, 800);
	}
}