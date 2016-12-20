let snowModule = (function() {
  /**
   * Helper
   */
  const maybe = (probability) => !!probability && Math.random() <= probability;
  const randomBetween = (min, max) => min + Math.random() * ( max + 1 - min);

  /**
   * Classes: Scene and SnowFlake
   */
  class Scene {
    constructor(containerElement) {
      this.scene = containerElement;
      this.snowFlakes = [];

      this._containerDefaultStyles();
      this._containerParentDefaultStyles();

      this.scene.addEventListener('snowenter', function() {
        // console.log('snow entering container!');
      });

      this.scene.addEventListener('snowleave', (event) => {
        let flakeOut = event.details;
        this.snowFlakes = this.snowFlakes.filter(flake => flake === flakeOut);
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
      let newSnowFlake = new SnowFlake(this.scene);
      this.snowFlakes.push(newSnowFlake);
    }

    frame() {
      setTimeout(() => {
        requestAnimationFrame(this.frame.bind(this));
        this.addSnowFlakeToScene();
      }, 800);
    }
  }

  class SnowFlake {
    constructor(scene) {
      this.scene = scene;
      this.isFalling = false;
      this.element = document.createElement('div');

      this.snowEnterEvent = new Event('snowenter');
      this.snowLeaveEvent = new CustomEvent('snowleave', {detail: this});

      let styles = [
        'position: absolute',
        'top: 0',
        `left: ${Math.floor(randomBetween(0, this.scene.parentNode.offsetWidth))}px`,
        'width: 4px',
        'height: 4px',
        'background-color: white',
        'display: inline-block'
      ].join(';');

      this.element.setAttribute('style', styles);
      this.scene.appendChild(this.element);
      this.scene.dispatchEvent(this.snowEnterEvent);
      this.frame();
    }

    frame() {
      setTimeout(() => {
        requestAnimationFrame(this.frame.bind(this));

        let newTopValue = parseInt(this.element.style.top) + randomBetween(0, 10);

        let swayAmount = Math.floor(randomBetween(-15, 15)) + parseInt(this.element.style.left);
        let swaySide = Math.floor(randomBetween(0, 1)) ? 'left' : 'right';

        let parentHeight = parseInt(this.element.parentNode.style.height);

        this.element.style.top = `${newTopValue}px`;
        this.element.style[swaySide] = `${swayAmount}px`;

        if (newTopValue > parentHeight) {
          this.element.remove();
          this.scene.dispatchEvent(this.snowLeaveEvent);
          clearInterval(this.interval);
        }
      }, 1000 / 17);
    }
  }

  /**
   * Module Methods
   */

  function init({
      selector = '#snow-layer',
      density = 'normal'
    } = {}) {
    let container;

    switch(true) {
      case typeof selector === 'string':
        new Scene(document.querySelector(selector), density);
        break;
      case Array.isArray(selector):
        let containers = document.querySelectorAll(selector);

        for (var i = containers.length - 1; i >= 0; i--) {
          new Scene(containers[i], density);
        }
      default:
        throw new Error('WHY ARE YOU SEEING THIS?!');
        break;
    }
  }

  // export
  return {
    init
  };
})();