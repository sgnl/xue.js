let snowModule = (function() {

  /**
   * Classes
   */
  class Scene {
    constructor(containerElement) {
      this.scene = containerElement;
      this.snowFlakes = [];

      this._containerDefaultStyles();
      this._containerParentDefaultStyles();

      this.scene.addEventListener('snowenter', function() {
        console.log('snow entering container!');
      });

      this.scene.addEventListener('snowleave', function() {
        console.log('snow leaving container!');
      });

      this.run();
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

    run() {
      // randomly
      setTimeout(() => {
        this.addSnowFlakeToScene();
      }, 2000);
    }
  }

  class SnowFlake {
    constructor(scene) {
      this.scene = scene;
      this.snowEnterEvent = new Event('snowenter');
      this.snowLeaveEvent = new Event('snowleave');
      this.isFalling = false;
      this.element = document.createElement('div');

      let styles = [
        'position: absolute',
        'top: 0',
        'left: 10px',
        'width: 4px',
        'height: 4px',
        'background-color: white',
        'display: inline-block'
      ].join(';');

      this.element.setAttribute('style', styles);
      this.scene.appendChild(this.element);
      this.scene.dispatchEvent(this.snowEnterEvent);

      this.interval = setInterval(() => {
        this.fall();
      }, 2000);

      this.startFloatingDown();
    }

    startFloatingDown() {
      this.isFalling = true;
    }

    fall() {
      let newTopValue = parseInt(this.element.style.top) + 25;
      this.element.style.top = `${newTopValue}px`;

      let parentHeight = parseInt(this.element.parentNode.style.height);

      if (newTopValue > parentHeight) {
        this.element.remove();
        this.scene.dispatchEvent(this.snowLeaveEvent);
        clearInterval(this.interval);
      }
    }
  }

  /**
   * Module Methods
   */

  function init(containerSelector) {
    let container = document.querySelector(containerSelector);

    if (!container) throw Error('no container given.');

    let scene = new Scene(container);
  }

  // export
  return {
    init
  };
})();