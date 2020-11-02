require('source-map-support/register');
module.exports =
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/IceCream.js":
/*!*************************!*\
  !*** ./src/IceCream.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IceCream; });
class IceCream {
  constructor({
    id,
    name,
    addedDate,
    type,
    kcal,
    hasGluten,
    photo
  }) {
    this.id = id;
    this.name = name;
    this.addedDate = addedDate;
    this.type = type;
    this.kcal = kcal;
    this.hasGluten = hasGluten;
    this.photo = photo;
  }

}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IceCream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IceCream */ "./src/IceCream.js");


const Koa = __webpack_require__(/*! koa */ "koa");

const app = new Koa();

const server = __webpack_require__(/*! http */ "http").createServer(app.callback());

const WebSocket = __webpack_require__(/*! ws */ "ws");

const wss = new WebSocket.Server({
  server
});

const Router = __webpack_require__(/*! koa-router */ "koa-router");

const cors = __webpack_require__(/*! koa-cors */ "koa-cors");

const bodyparser = __webpack_require__(/*! koa-bodyparser */ "koa-bodyparser");

app.use(bodyparser());
app.use(cors());
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} ${ctx.response.status} - ${ms}ms`);
});
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.body = {
      issue: [{
        error: err.message || 'Unexpected error'
      }]
    };
    ctx.response.status = 500;
  }
});
const iceCreams = [];

for (let i = 0; i < 3; i++) {
  iceCreams.push(new _IceCream__WEBPACK_IMPORTED_MODULE_0__["default"]({
    id: `${i}`,
    name: `Ice Cream ${i}`,
    addedDate: new Date(Date.now() + i),
    type: 'Chocolate',
    kcal: 180,
    hasGluten: true,
    photo: 'https://recipeland.com/images/r/17839/2dd845aa872d103562c9_1024.jpg'
  }));
}

let lastUpdated = iceCreams[iceCreams.length - 1].addedDate;
let lastId = iceCreams[iceCreams.length - 1].id;
const pageSize = 10;

const broadcast = data => wss.clients.forEach(client => {
  if (client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(data));
  }
});

const router = new Router();
router.get('/icecream', ctx => {
  const text = ctx.request.query.text;
  const page = parseInt(ctx.request.query.page) || 1;
  ctx.response.set('Last-Modified', lastUpdated.toUTCString());
  const offset = (page - 1) * pageSize;
  ctx.response.body = {
    page,
    icecreams: iceCreams,
    more: offset + pageSize < iceCreams.length
  };
  ctx.response.body = iceCreams;
  ctx.response.status = 200;
});
router.get('/icecream/:id', async ctx => {
  const itemId = ctx.request.params.id;
  const item = iceCreams.find(item => itemId === item.id);

  if (item) {
    ctx.response.body = item;
    ctx.response.status = 200; // ok
  } else {
    ctx.response.body = {
      issue: [{
        warning: `Ice Cream with id ${itemId} not found`
      }]
    };
    ctx.response.status = 404; // NOT FOUND (if you know the resource was deleted, then return 410 GONE)
  }
});

const createIceCream = async ctx => {
  const iceCream = ctx.request.body;

  if (!iceCream.name) {
    // validation
    ctx.response.body = {
      issue: [{
        error: 'Name is missing'
      }]
    };
    ctx.response.status = 400; //  BAD REQUEST

    return;
  }

  iceCream.id = `${parseInt(lastId) + 1}`;
  lastId = iceCream.id;
  iceCreams.push(iceCream);
  ctx.response.body = iceCream;
  ctx.response.status = 201; // CREATED

  broadcast({
    event: 'created',
    payload: {
      iceCream
    }
  });
};

router.post('/icecream', async ctx => {
  await createIceCream(ctx);
});
router.put('/icecream/:id', async ctx => {
  const id = ctx.params.id;
  const iceCream = ctx.request.body;
  const iceCreamId = iceCream.id;

  if (iceCreamId && id !== iceCream.id) {
    ctx.response.body = {
      issue: [{
        error: `Param id and body id should be the same`
      }]
    };
    ctx.response.status = 400; // BAD REQUEST

    return;
  }

  if (!iceCreamId) {
    await createIceCream(ctx);
    return;
  }

  const index = iceCreams.findIndex(iceCream => iceCream.id === id);

  if (index === -1) {
    ctx.response.body = {
      issue: [{
        error: `Ice Cream with id ${id} not found`
      }]
    };
    ctx.response.status = 400; // BAD REQUEST

    return;
  }

  iceCreams[index] = iceCream; //lastUpdated = new Date();

  ctx.response.body = iceCream;
  ctx.response.status = 200; // OK

  broadcast({
    event: 'updated',
    payload: {
      iceCream
    }
  });
});
router.del('/icecream/:id', ctx => {
  const id = ctx.params.id;
  const index = iceCreams.findIndex(iceCream => id === iceCream.id);

  if (index !== -1) {
    const iceCream = iceCreams[index];
    iceCreams.splice(index, 1); //lastUpdated = new Date();

    broadcast({
      event: 'deleted',
      payload: {
        iceCream
      }
    });
  }

  ctx.response.status = 204; // no content
}); //
// setInterval(() => {
//   lastUpdated = new Date();
//   lastId = `${parseInt(lastId) + 1}`;
//   const item = new Item({ id: lastId, text: `item ${lastId}`, date: lastUpdated, version: 1 });
//   items.push(item);
//   console.log(`
//    ${item.text}`);
//   broadcast({ event: 'created', payload: { item } });
// }, 15000);

app.use(router.routes());
app.use(router.allowedMethods());
server.listen(3000);

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/nicoletasarosi/Facultate anu 3/MyNodeServer/src/index.js */"./src/index.js");


/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-bodyparser":
/*!*********************************!*\
  !*** external "koa-bodyparser" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),

/***/ "koa-cors":
/*!***************************!*\
  !*** external "koa-cors" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-cors");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ws");

/***/ })

/******/ });
//# sourceMappingURL=main.map