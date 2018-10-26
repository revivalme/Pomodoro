/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/task */ \"./src/js/task.js\");\n/* harmony import */ var _js_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/timer */ \"./src/js/timer.js\");\n/* harmony import */ var _js_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/ui */ \"./src/js/ui.js\");\n\n\n // Init UI\n\nvar ui = new _js_ui__WEBPACK_IMPORTED_MODULE_2__[\"default\"](); // Init timer\n\nvar timer = new _js_timer__WEBPACK_IMPORTED_MODULE_1__[\"default\"](); // DOM Elements\n\nvar startBtn = document.querySelector('#btnStart');\nvar stopBtn = document.querySelector('#btnStop');\nvar form = document.querySelector('#form'); // Events\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  ui.updateTime(\"\".concat(timer.getTime('default')));\n});\nstartBtn.addEventListener('click', function () {\n  return timer.start();\n});\nstopBtn.addEventListener('click', function () {\n  return timer.stop();\n});\nform.addEventListener('submit', function (e) {\n  return addTask(e);\n}); // Add task\n\nfunction addTask(e) {\n  var taskCategory = form.querySelector('#input-category');\n  var taskDescr = form.querySelector('#input-descr');\n\n  if (taskCategory.value !== '' && taskDescr.value !== '') {\n    // Get table element\n    var table = document.querySelector('#todoTable'); // Create task obj\n\n    var task = new _js_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"](taskCategory.value, taskDescr.value); // Put new task to todoTable\n\n    ui.putTask(ui.createTask(task), table); // Clear inputs\n\n    taskCategory.value = '';\n    taskDescr.value = ''; // Show alert\n\n    ui.showAlert('Task added', 'alert-success');\n  } else {\n    // Show alert\n    ui.showAlert('Task must contain info', 'alert-danger');\n  } // Prevent default event\n\n\n  e.preventDefault();\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/js/task.js":
/*!************************!*\
  !*** ./src/js/task.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Task; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Task = function Task(category, description) {\n  var done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n\n  _classCallCheck(this, Task);\n\n  this.category = category;\n  this.description = description;\n  this.done = done;\n};\n\n\n\n//# sourceURL=webpack:///./src/js/task.js?");

/***/ }),

/***/ "./src/js/timer.js":
/*!*************************!*\
  !*** ./src/js/timer.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Timer; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Timer =\n/*#__PURE__*/\nfunction () {\n  // Default time = 25min\n  function Timer() {\n    var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1500 * 1000;\n\n    _classCallCheck(this, Timer);\n\n    this.default = new Date(ms);\n    this.diff;\n    this.end;\n    this.status = 0;\n  }\n\n  _createClass(Timer, [{\n    key: \"getTime\",\n    value: function getTime(type) {\n      return \"\".concat(this.zeroBase(this[type].getMinutes()), \" : \").concat(this.zeroBase(this[type].getSeconds()));\n    }\n  }, {\n    key: \"setDefaultTime\",\n    value: function setDefaultTime(ms) {\n      this.default = new Date(ms);\n    }\n  }, {\n    key: \"start\",\n    value: function start() {\n      // If timer isn't active\n      if (!this.status) {\n        var step = function step() {\n          // If timer is active\n          if (self.status) {\n            // Difference between end and now\n            self.diff = new Date(self.end.getTime() - new Date().getTime());\n\n            if (self.diff.getTime() > 0) {\n              ui.updateTime(\"\".concat(self.getTime('diff')));\n            } else {\n              // Time left - clear interval and reset\n              clearInterval(timerId);\n              self.reset();\n            }\n          } else {\n            clearInterval(timerId);\n          }\n        };\n\n        // Change status\n        this.status = 1; // Change buttons text\n\n        startBtn.textContent = 'Pause';\n        stopBtn.textContent = 'Stop';\n\n        if (this.diff === undefined) {\n          this.diff = this.default;\n        } // Set end time\n\n\n        this.end = new Date(new Date().getTime() + this.diff.getTime()); // Declare this for async func\n\n        var self = this;\n        var timerId = setInterval(step, 100);\n      } else {\n        // Change status\n        this.status = 0; // Change buttons text\n\n        startBtn.textContent = 'Resume';\n        stopBtn.textContent = 'Done';\n      }\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      // Reset\n      this.reset();\n    }\n  }, {\n    key: \"reset\",\n    value: function reset() {\n      // Change status\n      this.status = 0; // Change buttons text\n\n      startBtn.textContent = 'Start';\n      stopBtn.textContent = 'Stop'; // Change timer value to default\n\n      this.diff = new Date(this.default); // Update UI\n\n      ui.updateTime(\"\".concat(this.getTime('default')));\n    } // Pass minutes or seconds val\n\n  }, {\n    key: \"zeroBase\",\n    value: function zeroBase(val) {\n      return val < 10 ? '0' + val : val;\n    }\n  }]);\n\n  return Timer;\n}();\n\n\n\n//# sourceURL=webpack:///./src/js/timer.js?");

/***/ }),

/***/ "./src/js/ui.js":
/*!**********************!*\
  !*** ./src/js/ui.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return UI; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar UI =\n/*#__PURE__*/\nfunction () {\n  function UI() {\n    _classCallCheck(this, UI);\n  }\n\n  _createClass(UI, [{\n    key: \"updateTime\",\n    value: function updateTime(val) {\n      document.querySelector('#timer').textContent = val;\n    }\n  }, {\n    key: \"createTask\",\n    value: function createTask(task) {\n      // Create elements\n      var taskContainer = document.createElement('tr');\n      var taskCategory = document.createElement('td');\n      var taskDescription = document.createElement('td');\n      var taskOptions = document.createElement('td');\n      taskCategory.textContent = task.category;\n      taskDescription.textContent = task.description;\n      taskOptions.className = 'd-flex justify-content-end align-items-center'; // Get time in AM PM format\n\n      var time = new Date().toLocaleString('en-US', {\n        hour: '2-digit',\n        minute: '2-digit'\n      }); // If hour < 10, then add zero at begin\n\n      if (time.split(':')[0] < 10) {\n        time = '0' + time;\n      }\n\n      taskOptions.innerHTML = \"\\n      <i class=\\\"far fa-star mr-3\\\"></i>\\n      <i class=\\\"fas fa-check mr-3 text-success\\\"></i>\\n      <i class=\\\"fas fa-minus mr-3 text-danger\\\"></i>\\n      <i class=\\\"fas fa-edit mr-4 text-dark\\\"></i>\\n      <span>\".concat(time, \"</span>\\n    \");\n      taskContainer.appendChild(taskCategory);\n      taskContainer.appendChild(taskDescription);\n      taskContainer.appendChild(taskOptions);\n      return taskContainer;\n    }\n  }, {\n    key: \"deleteTask\",\n    value: function deleteTask(taskElement) {\n      taskElement.remove();\n    }\n  }, {\n    key: \"putTask\",\n    value: function putTask(taskElement, tableElement) {\n      var table = tableElement.querySelector('tbody');\n      table.appendChild(taskElement);\n    }\n  }, {\n    key: \"showAlert\",\n    value: function showAlert(text, className) {\n      // create alert\n      var alert = document.createElement('div');\n      alert.textContent = text;\n      alert.className = \"alert \".concat(className); // Get alerts NodeElement\n\n      var alerts = document.querySelector('#alerts');\n      alerts.appendChild(alert); // Clear alert after 1.5s\n\n      setTimeout(this.clearAlert, 1500);\n    }\n  }, {\n    key: \"clearAlert\",\n    value: function clearAlert() {\n      var alertEl = document.querySelector('.alert'); // If alert exist - remove it\n\n      if (alertEl) {\n        alertEl.remove();\n      }\n    }\n  }]);\n\n  return UI;\n}();\n\n\n\n//# sourceURL=webpack:///./src/js/ui.js?");

/***/ })

/******/ });