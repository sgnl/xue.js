
import {randomBetween} from './helpers';

export default class SnowFlake {
	constructor(scene, color) {
		this.rqf = null;
		this.scene = scene;
		this.isFalling = false;
		this.element = document.createElement('div');
		this.color = color;

		this.snowEnterEvent = new Event('snowenter');
		this.snowLeaveEvent = new CustomEvent('snowleave', {detail: this});

		const styles = [
			'position: absolute',
			'top: 0',
			`left: ${Math.floor(randomBetween(0, this.scene.parentNode.offsetWidth))}px`,
			'width: 4px',
			'height: 4px',
			`background-color: ${this.color}`,
			'display: inline-block'
		].join(';');

		this.element.setAttribute('style', styles);
		this.scene.appendChild(this.element);
		this.scene.dispatchEvent(this.snowEnterEvent);
		this.frame();
	}

	frame() {
		setTimeout(() => {
			this.rqf = requestAnimationFrame(this.frame.bind(this));

			const newTopValue = parseInt(this.element.style.top, 10) + randomBetween(-2, 10);

			const swayAmount = Math.floor(randomBetween(-25, 25)) + parseInt(this.element.style.left, 10);
			const swaySide = Math.floor(randomBetween(0, 1)) ? 'left' : 'right';

			const parentHeight = parseInt(this.element.parentNode.style.height, 10);

			this.element.style.top = `${newTopValue}px`;
			this.element.style[swaySide] = `${swayAmount}px`;

			if (newTopValue > parentHeight) {
				this.element.remove();
				this.scene.dispatchEvent(this.snowLeaveEvent);
				cancelAnimationFrame(this.rqf);
			}
		}, 1000 / 17);
	}
}
