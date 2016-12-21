/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _scene = __webpack_require__(1);

	var _scene2 = _interopRequireDefault(_scene);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {
		var window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		var Scenes = [];
		/**
	  * Module Methods
	  */

		function init() {
			var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
			    _ref$selector = _ref.selector,
			    selector = _ref$selector === undefined ? '#snow-layer' : _ref$selector,
			    _ref$density = _ref.density,
			    density = _ref$density === undefined ? 'normal' : _ref$density,
			    _ref$color = _ref.color,
			    color = _ref$color === undefined ? 'snow' : _ref$color;

			switch (true) {
				case typeof selector === 'string':
					{
						var newScene = new _scene2.default(document.querySelector(selector), color);
						Scenes.push(newScene);
						break;
					}
				case Array.isArray(selector):
					{
						var containers = document.querySelectorAll(selector);

						var _newScene = void 0;
						for (var i = containers.length - 1; i >= 0; i--) {
							_newScene = new _scene2.default(containers[i], density);
							Scenes.push(_newScene);
						}
						break;
					}
				default:
					{
						throw new Error('WHY ARE YOU SEEING THIS?!');
					}
			}
		}

		// export
		window.Xue = { init: init };
		return window;
	})(window);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _snowflake = __webpack_require__(2);

	var _snowflake2 = _interopRequireDefault(_snowflake);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Scene = function () {
		function Scene(containerElement, color) {
			var _this = this;

			_classCallCheck(this, Scene);

			this.scene = containerElement;
			this.snowflakeColor = color;
			this.snowflakes = [];

			this._containerDefaultStyles();
			this._containerParentDefaultStyles();

			// this.scene.addEventListener('snowenter', function() {
			//   // console.log('snow entering container!');
			// });

			this.scene.addEventListener('snowleave', function (event) {
				var flakeOut = event.details;
				_this.snowflakes = _this.snowflakes.filter(function (flake) {
					return flake === flakeOut;
				});
			});

			this.frame();
		}

		_createClass(Scene, [{
			key: '_containerDefaultStyles',
			value: function _containerDefaultStyles() {
				var parentWidth = this.scene.parentNode.offsetWidth;
				var parentHeight = this.scene.parentNode.offsetHeight;

				var styles = ['position: absolute', 'top:0', 'left:0', 'width:' + parentWidth + 'px', 'height:' + parentHeight + 'px'].join(';');

				this.scene.setAttribute('style', styles);
			}
		}, {
			key: '_containerParentDefaultStyles',
			value: function _containerParentDefaultStyles() {
				this.scene.parentNode.setAttribute('style', 'position: relative;');
			}
		}, {
			key: 'addSnowFlakeToScene',
			value: function addSnowFlakeToScene() {
				var newSnowFlake = new _snowflake2.default(this.scene, this.snowflakeColor);
				this.snowflakes.push(newSnowFlake);
			}
		}, {
			key: 'frame',
			value: function frame() {
				var _this2 = this;

				setTimeout(function () {
					requestAnimationFrame(_this2.frame.bind(_this2));
					_this2.addSnowFlakeToScene();
				}, 800);
			}
		}]);

		return Scene;
	}();

	exports.default = Scene;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _helpers = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SnowFlake = function () {
		function SnowFlake(scene, color) {
			_classCallCheck(this, SnowFlake);

			this.rqf = null;
			this.scene = scene;
			this.isFalling = false;
			this.element = document.createElement('div');
			this.color = color;

			this.snowEnterEvent = new Event('snowenter');
			this.snowLeaveEvent = new CustomEvent('snowleave', { detail: this });

			var styles = ['position: absolute', 'top: 0', 'left: ' + Math.floor((0, _helpers.randomBetween)(0, this.scene.parentNode.offsetWidth)) + 'px', 'width: 4px', 'height: 4px', 'background-color: ' + this.color, 'display: inline-block'].join(';');

			this.element.setAttribute('style', styles);
			this.scene.appendChild(this.element);
			this.scene.dispatchEvent(this.snowEnterEvent);
			this.frame();
		}

		_createClass(SnowFlake, [{
			key: 'frame',
			value: function frame() {
				var _this = this;

				setTimeout(function () {
					_this.rqf = requestAnimationFrame(_this.frame.bind(_this));

					var newTopValue = parseInt(_this.element.style.top, 10) + (0, _helpers.randomBetween)(-2, 10);

					var swayAmount = Math.floor((0, _helpers.randomBetween)(-25, 25)) + parseInt(_this.element.style.left, 10);
					var swaySide = Math.floor((0, _helpers.randomBetween)(0, 1)) ? 'left' : 'right';

					var parentHeight = parseInt(_this.element.parentNode.style.height, 10);

					_this.element.style.top = newTopValue + 'px';
					_this.element.style[swaySide] = swayAmount + 'px';

					if (newTopValue > parentHeight) {
						_this.element.remove();
						_this.scene.dispatchEvent(_this.snowLeaveEvent);
						cancelAnimationFrame(_this.rqf);
					}
				}, 1000 / 17);
			}
		}]);

		return SnowFlake;
	}();

	exports.default = SnowFlake;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var maybe = function maybe(probability) {
	  return probability && Math.random() <= probability;
	};
	var randomBetween = function randomBetween(min, max) {
	  return min + Math.random() * (max + 1 - min);
	};

	exports.maybe = maybe;
	exports.randomBetween = randomBetween;

/***/ }
/******/ ]);