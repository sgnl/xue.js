
import Scene from './Scene';

(function(window) {
  /**
   * Module Methods
   */

  function init({
      selector = '#snow-layer',
      density = 'normal',
      color = 'snow'
    } = {}) {
    switch(true) {
      case typeof selector === 'string':
        new Scene(document.querySelector(selector), color);
        break;
      case Array.isArray(selector):
        let containers = document.querySelectorAll(selector);

        for (var i = containers.length - 1; i >= 0; i--) {
          new Scene(containers[i], density);
        }
      default:
        throw new Error('WHY ARE YOU SEEING THIS?!');
    }
  }

  // export
  window.Xue = {init};
  return window;
})(window);
