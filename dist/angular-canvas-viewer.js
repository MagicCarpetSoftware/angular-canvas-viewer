(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["angular-canvas-viewer"] = factory(require("angular"));
	else
		root["angular-canvas-viewer"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _angular = __webpack_require__(2);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _FormatReader = __webpack_require__(3);
	
	var _FormatReader2 = _interopRequireDefault(_FormatReader);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _angular2.default.module('canvasViewer', []).directive('canvasViewer', ['$window', '$http', '$timeout', '$q', function ($window, $http, $timeout, $q) {
	  var formatReader = new _FormatReader2.default();
	
	  return {
	    // name: '',
	    // terminal: true,
	    scope: {
	      imageSource: '=src',
	      overlays: '=overlays',
	      title: '@title',
	      options: '=options'
	    }, // {} = isolate, true = child, false/undefined = no change
	    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
	    restrict: 'E',
	    template: '\n    <div class="viewer-container">\n      <canvas class="viewer" ng-mouseleave="canMove=false" ng-mousedown="mousedown($event)" ng-mouseup="mouseup($event)" ng-init="canMove=false"\n        ng-mousemove="mousedrag($event,canMove)">\n      </canvas>\n      <div class="title" ng-if="title!=null">{{title}}</div>\n      <div class="command" ng-if="options.controls.image">\n        <button class="btn btn-info" ng-click="options.controls.numPage=options.controls.numPage-1" ng-hide="options.controls.totalPage==1"\n          title="Previous Page"><i class="fa fa-minus"></i></button>\n          <button class="btn btn-info" ng-hide="options.controls.totalPage==1">{{options.controls.numPage}}/{{options.controls.totalPage}}</button>\n          <button class="btn btn-info" ng-click="options.controls.numPage=options.controls.numPage+1" ng-hide="options.controls.totalPage==1"\n            title="Next Page"><i class="fa fa-plus"></i></button>\n            <button class="btn btn-info" ng-click="resizeTo(\'page\')" title="Fit to page"><i class="fa fa-file-o"></i></button>\n            <button class="btn btn-info" ng-click="rotate(-1)" ng-hide="options.controls.disableRotate" title="Rotate left"><i class="fa fa-rotate-left"></i></button>\n            <button class="btn btn-info" ng-click="rotate(1)" ng-hide="options.controls.disableRotate" title="Rotate right"><i class="fa fa-rotate-right"></i></button>\n            <button class="btn btn-info" ng-click="zoom(-1)" ng-hide="options.controls.disableZoom" title="Zoom out"><i class="fa fa-search-minus"></i></button>\n            <button class="btn btn-info" ng-click="zoom(1)" ng-hide="options.controls.disableZoom" title="Zoom in"><i class="fa fa-search-plus"></i></button>\n      </div>\n      <div class="command" ng-if="options.controls.sound">\n        <button class="btn btn-info" ng-click="stop()" title="Stop"><i class="fa fa-stop"></i></button>\n        <button class="btn btn-info" ng-click="play()" title="Play"><i class="fa fa-play"></i></button>\n      </div>\n    </div>\n    ',
	    // replace: true,
	    // transclude: true,
	    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
	    link: function link(scope, iElm, iAttrs, controller) {
	      var canvasEl = iElm.find('canvas')[0];
	      var ctx = canvasEl.getContext('2d');
	      // look for
	      var inNode = _angular2.default.element(iElm.find('div')[0])[0];
	      var directiveParentNode = inNode.parentNode.parentNode;
	      // orce correct canvas size
	      var canvasSize = canvasEl.parentNode;
	      ctx.canvas.width = canvasSize.clientWidth;
	      ctx.canvas.height = canvasSize.clientHeight;
	      var resize = { height: canvasSize.clientHeight, width: canvasSize.clientWidth };
	      // initialize variable
	      var img = null;
	      var curPos = { x: 0, y: 0 };
	      var picPos = { x: 0, y: 0 };
	      var mousePos = { x: 0, y: 0 };
	      var overlays = [];
	      var reader = null;
	
	      // Merge scope with default values
	      scope.options = _angular2.default.merge({}, {
	        ctx: null,
	        adsrc: null,
	        zoom: {
	          value: 1.0,
	          step: 0.1,
	          min: 0.05,
	          max: 6,
	          scrollStep: 0.01
	        },
	        rotate: {
	          value: 0,
	          step: 90
	        },
	        controls: {
	          toolbar: true,
	          image: true,
	          sound: false,
	          fit: 'page',
	          disableZoom: false,
	          disableMove: false,
	          disableRotate: false,
	          numPage: 1,
	          totalPage: 1,
	          filmStrip: false
	        },
	        info: {}
	      }, scope.options);
	
	      scope.options.ctx = ctx;
	
	      function onload() {
	        if (reader == null) {
	          return;
	        }
	
	        if (reader.rendered) {
	          applyTransform();
	        } else {
	          scope.resizeTo(scope.options.controls.fit);
	        }
	      }
	
	      scope.$watch('imageSource', function (value) {
	        if (value === undefined || value === null) return;
	        // initialize values on load
	        scope.options.zoom.value = 1.0;
	        scope.options.rotate.value = 0;
	        curPos = { x: 0, y: 0 };
	        picPos = { x: 0, y: 0 };
	
	        // test if object or string is input of directive
	        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	          // Object type file
	          if (formatReader.IsSupported(value.type)) {
	            // get object
	            var decoder = formatReader.CreateReader(value.type, value);
	            // Create image
	            reader = decoder.create(value, scope.options, onload, $q, $timeout, ctx);
	          } else {
	            console.log(value.type, ' not supported !');
	          }
	        } else if (typeof value === 'string') {
	          reader = formatReader.CreateReader("image/jpeg").create(value, scope.options, onload, $q, $timeout);
	        }
	      });
	
	      scope.$watch('overlays', function (newarr, oldarr) {
	        // initialize new overlay
	        if (newarr === null || oldarr === null) return;
	
	        // new added
	        overlays = [];
	        _angular2.default.forEach(newarr, function (item) {
	          overlays.push(item);
	        });
	
	        applyTransform();
	      }, true);
	
	      scope.$watch('options.zoom.value', function () {
	        if (!scope.options.controls.disableZoom) {
	          applyTransform();
	        }
	      });
	
	      scope.$watch('options.rotate.value', function () {
	        if (!scope.options.controls.disableRotate) {
	          applyTransform();
	        }
	      });
	
	      scope.$watch('options.controls.fit', function (value) {
	        scope.resizeTo(value);
	      });
	
	      scope.$watch('options.controls.filmStrip', function (position) {
	
	        if (position) {
	          scope.options.controls.disableMove = true;
	          scope.options.controls.disableRotate = true;
	        } else {
	          scope.options.controls.disableMove = false;
	          scope.options.controls.disableRotate = false;
	        }
	        if (reader.refresh != null) {
	          reader.refresh();
	        }
	      });
	
	      scope.$watch('options.controls.numPage', function (value) {
	        // Limit page navigation
	        if (scope.options.controls.numPage < 1) scope.options.controls.numPage = 1;
	        if (scope.options.controls.numPage > scope.options.controls.totalPage) scope.options.controls.numPage = scope.options.controls.totalPage;
	        if (reader != null) {
	          if (scope.options.controls.filmStrip) {
	            // All pages are already rendered so go to correct page
	            picPos.y = (scope.options.controls.numPage - 1) * -(reader.height + 15);
	            applyTransform();
	          } else {
	            if (reader.refresh != null) {
	              reader.refresh();
	            }
	          }
	        }
	      });
	
	      // Bind mousewheel
	      _angular2.default.element(canvasEl).bind("DOMMouseScroll mousewheel onmousewheel", function ($event) {
	
	        // cross-browser wheel delta
	        var event = $window.event || $event; // old IE support
	        var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
	        if (scope.options.controls.filmStrip) {
	          picPos.y += 50 * delta;
	          // Limit range
	          if (picPos.y > 15) {
	            picPos.y = 15;
	          }
	          if (reader.images) {
	            if (picPos.y - reader.height * scope.options.zoom.value < -(reader.height + 15) * reader.images.length * scope.options.zoom.value) {
	              picPos.y = -(reader.height + 15) * reader.images.length + reader.height;
	            }
	          } else {
	            if (picPos.y - reader.height * scope.options.zoom.value < -reader.height * scope.options.zoom.value) {
	              picPos.y = -reader.height * scope.options.zoom.value;
	            }
	          }
	          //
	          scope.$applyAsync(function () {
	            applyTransform();
	          });
	        } else {
	          if (delta > 0) {
	            scope.zoom(1, event);
	          } else {
	            scope.zoom(-1, event);
	          }
	        }
	        // for IE
	        event.returnValue = false;
	        // for Chrome and Firefox
	        if (event.preventDefault) {
	          event.preventDefault();
	        }
	      });
	
	      function applyTransform() {
	        if (reader == null) {
	          return;
	        }
	        if (!reader.rendered) {
	          return;
	        }
	        var options = scope.options;
	        var canvas = ctx.canvas;
	        var centerX = reader.width * options.zoom.value / 2;
	        var centerY = reader.height * options.zoom.value / 2;
	        // Clean before draw
	        ctx.clearRect(0, 0, canvas.width, canvas.height);
	        // Save context
	        ctx.save();
	        // move to mouse position
	        ctx.translate(picPos.x + centerX, picPos.y + centerY);
	        // Rotate canvas
	        ctx.rotate(options.rotate.value * Math.PI / 180);
	        // Go back
	        ctx.translate(-centerX, -centerY);
	        // Change scale
	        if (reader.isZoom) ctx.scale(options.zoom.value, options.zoom.value);
	        if (!options.controls.filmStrip || options.controls.totalPage == 1) {
	          if (reader.img != null) {
	            ctx.drawImage(reader.img, 0, 0, reader.width, reader.height);
	            ctx.beginPath();
	            ctx.rect(0, 0, reader.width, reader.height);
	            ctx.lineWidth = 0.2;
	            ctx.strokeStyle = "#000000";
	            ctx.stroke();
	          }
	          // Draw image at correct position with correct scale
	          if (reader.data != null) {
	            ctx.putImageData(reader.data, picPos.x, picPos.y);
	            ctx.beginPath();
	            ctx.rect(0, 0, reader.width, reader.height);
	            ctx.lineWidth = 0.2;
	            ctx.strokeStyle = "#000000";
	            ctx.stroke();
	          }
	        } else {
	          if (reader.images != null) {
	            _angular2.default.forEach(reader.images, function (image) {
	              ctx.drawImage(image, 0, 0, image.width, image.height);
	              ctx.beginPath();
	              ctx.rect(0, 0, image.width, image.height);
	              ctx.lineWidth = 0.2;
	              ctx.strokeStyle = "#000000";
	              ctx.stroke();
	              ctx.translate(0, image.height + 15);
	            });
	          }
	          // Draw image at correct position with correct scale
	          if (reader.data != null) {
	            var offsetY = 0;
	            _angular2.default.forEach(reader.data, function (data) {
	              ctx.putImageData(data, picPos.x, picPos.y + offsetY);
	              ctx.beginPath();
	              ctx.rect(0, 0, reader.width, reader.height);
	              ctx.lineWidth = 0.2;
	              ctx.strokeStyle = "#000000";
	              ctx.stroke();
	              offsetY += reader.height + 15;
	              ctx.translate(0, offsetY);
	            });
	          }
	        }
	        // Restore
	        ctx.restore();
	
	        // Draw overlays
	        if (overlays.length > 0) {
	          _angular2.default.forEach(overlays, function (item) {
	            ctx.save();
	            // move to mouse position
	            ctx.translate(picPos.x + centerX, picPos.y + centerY);
	            // Rotate canvas
	            ctx.rotate(options.rotate.value * Math.PI / 180);
	            // Go back
	            ctx.translate(-centerX, -centerY);
	            // Change scale
	            ctx.scale(options.zoom.value, options.zoom.value);
	            // Start rect draw
	            ctx.beginPath();
	            ctx.rect(item.x, item.y, item.w, item.h);
	            ctx.fillStyle = item.color;
	            ctx.globalAlpha = 0.4;
	            ctx.fill();
	            ctx.lineWidth = 1;
	            ctx.strokeStyle = item.color;
	            ctx.stroke();
	            ctx.restore();
	          });
	        }
	      }
	
	      _angular2.default.element(canvasEl).bind('mousedown', function ($event) {
	        if (scope.options.controls.disableMove) {
	          return;
	        }
	
	        scope.canMove = true;
	        curPos.x = $event.offsetX;
	        curPos.y = $event.offsetY;
	      });
	
	      _angular2.default.element(canvasEl).bind('mouseup', function ($event) {
	        if (scope.options.controls.disableMove) {
	          return;
	        }
	
	        scope.canMove = false;
	      });
	
	      _angular2.default.element(canvasEl).bind('mousemove', function ($event) {
	        mousePos.x = $event.offsetX;
	        mousePos.y = $event.offsetY;
	        if (scope.options.controls.disableMove) {
	          return;
	        }
	
	        if (reader !== null && scope.canMove) {
	          var coordX = $event.offsetX;
	          var coordY = $event.offsetY;
	          var translateX = coordX - curPos.x;
	          var translateY = coordY - curPos.y;
	          picPos.x += translateX;
	          picPos.y += translateY;
	          applyTransform();
	          curPos.x = coordX;
	          curPos.y = coordY;
	        }
	      });
	
	      function getMousePositionBasedOnImage(event, container) {
	        if (!event) {
	          // triggered by click zoom-in and zoom-out buttons
	          return {
	            x: container.clientWidth / 2 - picPos.x,
	            y: container.clientHeight / 2 - picPos.y
	          };
	        }
	
	        return {
	          x: event.offsetX - picPos.x,
	          y: event.offsetY - picPos.y
	        };
	      }
	
	      scope.zoom = function (direction, event) {
	        scope.$applyAsync(function () {
	          var oldWidth,
	              newWidth = 0;
	          var oldHeight,
	              newHeight = 0;
	          // Does reader support zoom ?
	          // Compute correct width
	          if (!reader.isZoom) {
	            oldWidth = reader.oldwidth;
	            oldHeight = reader.height;
	          } else {
	            oldWidth = reader.width * scope.options.zoom.value;
	            oldHeight = reader.height * scope.options.zoom.value;
	          }
	
	          // Compute new zoom
	          var step = event ? scope.options.zoom.scrollStep : scope.options.zoom.step;
	          scope.options.zoom.value += step * direction * scope.options.zoom.value;
	
	          if (scope.options.zoom.value >= scope.options.zoom.max) {
	            scope.options.zoom.value = scope.options.zoom.max;
	          }
	          if (scope.options.zoom.value <= scope.options.zoom.min) {
	            scope.options.zoom.value = scope.options.zoom.min;
	          }
	          // Refresh picture
	          if (reader.refresh != null) {
	            reader.refresh();
	          }
	
	          // Compute new image size
	          if (!reader.isZoom) {
	            newWidth = reader.width;
	            newHeight = reader.height;
	          } else {
	            newWidth = reader.width * scope.options.zoom.value;
	            newHeight = reader.height * scope.options.zoom.value;
	          }
	
	          // new image position after zoom
	          var mousePosition = getMousePositionBasedOnImage(event, ctx.canvas);
	          picPos.x = picPos.x - (newWidth - oldWidth) * (mousePosition.x / oldWidth);
	          picPos.y = picPos.y - (newHeight - oldHeight) * (mousePosition.y / oldHeight);
	        });
	      };
	
	      scope.rotate = function (direction) {
	        scope.$applyAsync(function () {
	          scope.options.rotate.value += scope.options.rotate.step * direction;
	          if (scope.options.rotate.value <= -360 || scope.options.rotate.value >= 360) {
	            scope.options.rotate.value = 0;
	          }
	          applyTransform();
	        });
	      };
	
	      var centerPics = function centerPics() {
	        // Position to canvas center
	        var centerX = ctx.canvas.width / 2;
	        var picPosX = 0;
	        var centerY = ctx.canvas.height / 2;
	        var picPosY = 0;
	
	        picPosX = centerX - reader.width * scope.options.zoom.value / 2;
	        picPosY = centerY - reader.height * scope.options.zoom.value / 2;
	        curPos = { x: picPosX, y: picPosY };
	        picPos = { x: picPosX, y: picPosY };
	      };
	
	      scope.resizeTo = function (value) {
	        if (ctx.canvas == null || reader == null) {
	          return;
	        }
	        // Compute page ratio
	        var options = scope.options;
	        var ratioH = ctx.canvas.height / reader.height;
	        var ratioW = ctx.canvas.width / reader.width;
	        // If reader render zoom itself
	        // Precompute from its ratio
	        if (!reader.isZoom) {
	          ratioH *= scope.options.zoom.value;
	          ratioW *= scope.options.zoom.value;
	        }
	        // Adjust value
	        var defaultSize = function defaultSize() {
	          var windowMinSize = Math.min(ctx.canvas.height, ctx.canvas.width);
	          var contentMinSize = Math.min(reader.height, reader.width);
	          return windowMinSize < contentMinSize ? Math.min(ratioH, ratioW) : 1;
	        };
	
	        switch (value) {
	          case 'width':
	            scope.options.zoom.value = ratioW;
	            break;
	          case 'height':
	            scope.options.zoom.value = ratioH;
	            break;
	          case 'page':
	          default:
	            scope.options.zoom.value = defaultSize();
	        }
	        scope.$applyAsync(function () {
	          // Round zoom value
	          scope.options.zoom.value = Math.round(scope.options.zoom.value * 100) / 100;
	          // Update options state
	          scope.options.controls.fit = value;
	          if (!reader.isZoom) {
	            if (reader.refresh != null) {
	              reader.refresh();
	            }
	
	            // Re center image
	            centerPics();
	          } else {
	            // Re center image
	            centerPics();
	            applyTransform();
	          }
	        });
	
	        // Rotate to default
	        scope.options.rotate.value = 0;
	      };
	
	      scope.play = function () {
	        if (scope.options.adsrc != null) {
	          scope.options.adsrc.start(0);
	        }
	      };
	
	      scope.stop = function () {
	        if (scope.options.adsrc != null) {
	          scope.options.adsrc.stop(0);
	        }
	      };
	
	      function resizeCanvas() {
	        scope.$applyAsync(function () {
	          var canvasSize = canvasEl.parentNode;
	          ctx.canvas.width = canvasSize.clientWidth;
	          ctx.canvas.height = canvasSize.clientHeight;
	          applyTransform();
	        });
	      }
	
	      // Keep object
	      function parentChange() {
	        if (resize.width != canvasEl.parentNode.clientWidth) {
	          resize.width = canvasEl.parentNode.clientWidth;
	        }
	
	        if (resize.height != canvasEl.parentNode.clientHeight) {
	          resize.height = canvasEl.parentNode.clientHeight;
	        }
	        return resize;
	      }
	
	      //
	      scope.$watch(parentChange, function () {
	        resizeCanvas();
	      }, true);
	      //      	// resize canvas on window resize to keep aspect ratio
	      // angular.element($window).bind('resize', function() {
	      //  	resizeCanvas();
	      // });
	    }
	  };
	}]).name;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = FormatReader;
	function FormatReader() {
		this.mimetype = ["image/png", "image/jpeg"];
		// Test supported mime types
		// Is PDF module present
		if (typeof PDFJS !== "undefined") {
			// Remove it from list
			this.mimetype.push("application/pdf");
			PDFJS.disableWorker = false;
		}
		// Is Tiff module present
		if (typeof Tiff !== "undefined") {
			// Remove it from list
			this.mimetype.push("image/tif");
			this.mimetype.push("image/tiff");
		}
		// Test for audio support
		try {
			var audioTest = $window.AudioContext || $window.webkitAudioContext || $window.mozAudioContext || $window.msAudioContext;
			if (typeof audioTest !== "undefined") {
				this.mimetype.push("audio/x-wav");
				this.mimetype.push("audio/wav");
				this.mimetype.push("audio/x-ogg");
				this.mimetype.push("audio/ogg");
				this.mimetype.push("audio/x-mpeg");
				this.mimetype.push("audio/mpeg");
			}
		} catch (ex) {}
	}
	
	FormatReader.prototype = {
		pdfReader: function pdfReader(data, options, callback, $q, $timeout, ctx) {
			if (options.controls.toolbar) {
				options.controls.image = true;
				options.controls.sound = false;
			}
			this.reader = new FileReader();
			// read image object
			var that = this;
			that.context = ctx;
			that.$q = $q;
			that._pdfDoc = null;
			that.viewport = null;
			that.img = new Image();
			that.rendered = false;
			that.width = -1;
			that.height = -1;
			that.oldwidth = -1;
			that.oldheight = -1;
			that.data = null;
			that.page = null;
			that.options = options;
			that.currentPage = -1;
			that.rendering = false;
			that.isZoom = false;
			that.data = [];
			that.triggerRefresh = false;
			function renderPage(parent, pageNum, pageObj) {
				if (pageNum == undefined) {
					pageNum = that.currentPage;
				}
	
				if (pageObj == undefined) {
					pageObj = parent.page;
				}
				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				if (pageObj != null) /* && !parent.rendering*/{
						parent.rendering = true;
						parent.oldwidth = parent.width;
						parent.oldheight = parent.height;
						// set viewport only on 1st page with filmstrip
						if (Math.abs(parent.options.zoom.value) == 0) parent.options.zoom.value = 1.0;
						var viewport = pageObj.getViewport(parent.options.zoom.value, 0);
						context.canvas.width = viewport.width;
						context.canvas.height = viewport.height;
						// render to canvas
						return pageObj.render({ canvasContext: context, viewport: viewport, intent: 'display' }).then(function () {
							// restore canvas
							// var img = new Image();
							// img.onload = function() {
							// 	parent.width = img.width;
							// 	parent.height = img.height;
							// 	if (options.controls.filmStrip) {
							// 		// Add rendered image
							// 		img.pageNum = pageNum;
							// 		parent.images.push(img);
							// 		that.img = img;
							// 		if (parent.images.length == options.controls.totalPage) {
							// 			// Do sorting of all pictures
							// 			parent.images.sort( function(objA, objB) {
							// 				return objA.pageNum - objB.pageNum;
							// 			});
							// 			// Do drawing on rendering ended
							// 			parent.rendered = true;
							// 			callback();
							// 			//
							// 		}
							// 	} else {
							// 		// Single image rendering
							// 		that.img = img;
							// 		that.rendered = true;
							// 		// Do drawing on rendering ended
							// 		callback();
							// 	}
							// 	parent.rendering = false;
	
							// };
							// img.src = canvas.toDataURL();
							parent.width = viewport.width;
							parent.height = viewport.height;
	
							if (options.controls.filmStrip) {
								var item = context.getImageData(0, 0, viewport.width, viewport.height);
								item.pageNum = pageNum;
								parent.data.push(item);
								if (parent.data.length == options.controls.totalPage) {
									// Do sorting of all pictures
									parent.data.sort(function (objA, objB) {
										return objA.pageNum - objB.pageNum;
									});
									// Do drawing on rendering ended
									parent.rendered = true;
									callback();
									parent.rendering = false;
								}
							} else {
								that.data = context.getImageData(0, 0, viewport.width, viewport.height);
								that.rendered = true;
								callback();
								parent.rendering = false;
							}
						});
					}
			}
	
			this.refresh = function () {
				if (that._pdfDoc == null) {
					return;
				}
				if (parent.rendering) {
					return;
				}
				that.rendered = false;
				if (options.controls.filmStrip) {
					var p = 1;
					var promises = [];
					that.data = [];
					for (var p = 1; p <= options.controls.totalPage; p++) {
						promises.push(that._pdfDoc.getPage(p));
					}
					that.$q.all(promises).then(function (pages) {
						for (var p = 0; p < pages.length; p++) {
							renderPage(that, pages[p].pageIndex, pages[p]);
						}
					});
				} else {
					if (that.currentPage != that.options.controls.numPage) {
						that._pdfDoc.getPage(that.options.controls.numPage).then(function (page) {
							renderPage(that, that.options.controls.numPage, page);
						});
					} else {
						renderPage(that, that.options.controls.numPage, page);
					}
				}
			};
	
			this.reader.onload = function () {
				var data = new Uint8Array(that.reader.result);
				PDFJS.getDocument({ data: data }).then(function (_pdfDoc) {
					that._pdfDoc = _pdfDoc;
					options.controls.totalPage = _pdfDoc.numPages;
					options.controls.numPage = 1;
					that._pdfDoc.getMetadata().then(function (data) {
						options.info = data.info;
						options.info.metadata = data.metadata;
					});
					that.refresh();
				});
			};
	
			this.reader.readAsArrayBuffer(data);
			return this;
		},
	
		tiffReader: function tiffReader(data, options, callback) {
			if (options.controls.toolbar) {
				options.controls.image = true;
				options.controls.sound = false;
			}
			this.reader = new FileReader();
			var that = this;
			that.rendered = false;
			that.tiff = null;
			that.img = null;
			that.data = null;
			that.width = -1;
			that.height = -1;
			that.options = options;
			that.images = [];
			that.currentPage = -1;
			that.isZoom = true;
			this.refresh = function () {
				if (that.reader.result == undefined) return;
				if (that.tiff == null) {
					that.tiff = new Tiff({ buffer: that.reader.result });
					that.options.controls.totalPage = that.tiff.countDirectory();
					that.options.controls.numPage = 1;
					that.options.info = {
						width: that.tiff.width(),
						height: that.tiff.height(),
						compression: that.tiff.getField(Tiff.Tag.COMPRESSION),
						document: that.tiff.getField(Tiff.Tag.DOCUMENTNAME),
						description: that.tiff.getField(Tiff.Tag.IMAGEDESCRIPTION),
						orientation: that.tiff.getField(Tiff.Tag.ORIENTATION),
						xresolution: that.tiff.getField(Tiff.Tag.XRESOLUTION),
						yresolution: that.tiff.getField(Tiff.Tag.YRESOLUTION)
	
					};
				}
	
				// Limit page number if upper
				if (that.options.controls.numPage > that.options.controls.totalPage) {
					that.options.controls.numPage = that.options.controls.totalPage;
				}
				// Set to correct page
				if (that.options.controls.filmStrip) {
					that.images = [];
					for (var p = 0; p < that.tiff.countDirectory(); p++) {
						that.tiff.setDirectory(p);
						// Set only first page @TODO
						if (p == 0) {
							that.width = that.tiff.width();
							that.height = that.tiff.height();
						}
						that.images[p] = new Image();
						that.images[p].onload = function () {
							if (that.images.length == 1) {
								that.img = that.images[0];
							}
							callback();
							that.rendered = true;
						};
						that.images[p].src = that.tiff.toDataURL();
						that.images[p].pageNum = p;
						//that.currentPage = that.options.controls.numPage;
					}
				} else {
					if (that.currentPage != that.options.controls.numPage) {
						that.tiff.setDirectory(that.options.controls.numPage - 1);
						that.width = that.tiff.width();
						that.height = that.tiff.height();
						that.img = new Image();
						that.img.onload = function () {
							callback();
							that.rendered = true;
						};
						that.img.src = that.tiff.toDataURL();
						that.currentPage = that.options.controls.numPage;
					}
				}
			};
	
			this.reader.onload = function () {
				if (that.tiff != null) {
					that.tiff.close();
					that.tiff = null;
				}
				Tiff.initialize({ TOTAL_MEMORY: 16777216 * 5 });
				that.refresh();
			};
			this.reader.readAsArrayBuffer(data);
			return this;
		},
	
		imageReader: function imageReader(data, options, callback) {
			if (options.controls.toolbar) {
				options.controls.image = true;
				options.controls.sound = false;
			}
			this.reader = new FileReader();
			var that = this;
			that.img = new Image();
			that.img.onload = function () {
				that.width = that.img.width;
				that.height = that.img.height;
				callback();
				that.rendered = true;
			};
			that.data = null;
			that.width = -1;
			that.height = -1;
			options.info = {};
			that.isZoom = true;
			that.rendered = false;
			this.reader.onload = function () {
				that.img.src = that.reader.result;
			};
			if (typeof data === 'string') {
				that.img.src = data;
			} else {
				this.reader.readAsDataURL(data);
			}
			// PNG or JPEG are one page only
			options.controls.totalPage = 1;
			options.controls.numPage = 1;
			this.refresh = function () {
				// do nothing
			};
			return this;
		},
	
		mpegReader: function mpegReader(data, options, callback) {},
	
		wavReader: function wavReader(data, options, callback) {
			if (options.controls.toolbar) {
				options.controls.image = false;
				options.controls.sound = true;
			}
	
			this.reader = new FileReader();
			var that = this;
			var ctx = options.ctx;
			this.width = ctx.canvas.width;
			this.height = ctx.canvas.height;
			try {
				// Fix up for prefixing
				$window.AudioContext = $window.AudioContext || $window.webkitAudioContext || $window.mozAudioContext || $window.msAudioContext;
				$window.requestAnimationFrame = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame || $window.mozRequestAnimationFrame || $window.msRequestAnimationFrame;
				$window.cancelAnimationFrame = $window.cancelAnimationFrame || $window.webkitCancelAnimationFrame || $window.mozCancelAnimationFrame || $window.msCancelAnimationFrame;
				var adctx = new AudioContext();
				// update options context audio
				this.reader.onload = function () {
					// creates a sound source
					adctx.decodeAudioData(that.reader.result, function (buffer) {
						var gradient = ctx.createLinearGradient(0, 0, 0, that.height);
						gradient.addColorStop(1, '#000000');
						gradient.addColorStop(0.75, '#ff0000');
						gradient.addColorStop(0.25, '#ffff00');
						gradient.addColorStop(0, '#ffffff');
						// setup a javascript node
						var javascriptNode = adctx.createScriptProcessor(2048, 1, 1);
						var source = adctx.createBufferSource();
						options.adsrc = source;
						// tell the source which sound to play
						source.buffer = buffer;
						// setup a analyzer
						var analyser = adctx.createAnalyser();
						analyser.smoothingTimeConstant = 0.3;
						analyser.fftSize = 512;
						// connect the source to the analyser
						source.connect(analyser);
						// we use the javascript node to draw at a specific interval.
						analyser.connect(javascriptNode);
						javascriptNode.onaudioprocess = function () {
							// get the average for the first channel
							var array = new Uint8Array(analyser.frequencyBinCount);
							analyser.getByteFrequencyData(array);
							// clear the current state
							ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
							// set the fill style
							ctx.fillStyle = gradient;
							for (var i = 0; i < array.length; i++) {
								var value = array[i];
								ctx.fillRect(i * 5, that.height - value, 3, that.height);
							}
						};
						// connect to destination, else it isn't called
						javascriptNode.connect(adctx.destination);
						// connect the source to the context's destination (the speakers)
						source.connect(adctx.destination);
					});
				};
				this.reader.readAsArrayBuffer(data);
			} catch (e) {}
		},
		// Runs during compile
		CreateReader: function CreateReader(mimeType, obj) {
			var reader = null;
	
			if (mimeType == "") {
				mimeType = this.GuessMimeType(obj);
			}
	
			switch (mimeType.toLowerCase()) {
				case "image/tif":
				case "image/tiff":
					reader = { create: this.tiffReader };break;
				case "application/pdf":
					reader = { create: this.pdfReader };break;
				case "image/png":
				case "image/jpeg":
					reader = { create: this.imageReader };break;
				case "audio/x-wav":
				case "audio/wav":
				case "audio/x-ogg":
				case "audio/ogg":
					reader = { create: this.wavReader };break;
				case "audio/x-mpeg":
				case "audio/mpeg":
					reader = { create: this.mpegReader };break;
			};
			return reader;
		},
		IsSupported: function IsSupported(mimeType) {
			return this.mimetype.indexOf(mimeType) != -1;
		},
		GuessMimeType: function GuessMimeType(obj) {
			// try to guess mime type if not available
			var mimeType = "";
			if (obj.type == "") {
				var fileName = obj.name;
				mimeType = "image/" + fileName.substring(fileName.indexOf('.') + 1);
			}
			return mimeType.toLowerCase();
		}
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=angular-canvas-viewer.js.map