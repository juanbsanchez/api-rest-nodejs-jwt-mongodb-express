"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = exports.isModerator = exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var verifyToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var token, decoded, userFound;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.headers["x-access-token"];

            if (token) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              message: "No token provided"
            }));

          case 4:
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            req.userId = decoded.id;
            _context.next = 8;
            return _User["default"].findById(req.userId, {
              password: 0
            });

          case 8:
            userFound = _context.sent;

            if (userFound) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: "no user found"
            }));

          case 11:
            next();
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(401).json({
              message: "Unauthorized"
            }));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;

var isModerator = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var userFound, rolesFound, i;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _User["default"].findById(req.userId);

          case 3:
            userFound = _context2.sent;
            _context2.next = 6;
            return _Role["default"].find({
              _id: {
                $in: userFound.roles
              }
            });

          case 6:
            rolesFound = _context2.sent;
            i = 0;

          case 8:
            if (!(i < rolesFound.length)) {
              _context2.next = 15;
              break;
            }

            if (!(rolesFound[i].name === "moderator")) {
              _context2.next = 12;
              break;
            }

            next();
            return _context2.abrupt("return");

          case 12:
            i++;
            _context2.next = 8;
            break;

          case 15:
            return _context2.abrupt("return", res.status(403).json({
              message: "Required Moderator Role"
            }));

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 18]]);
  }));

  return function isModerator(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.isModerator = isModerator;

var isAdmin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var userFound, rolesFound, i;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _User["default"].findById(req.userId);

          case 3:
            userFound = _context3.sent;
            _context3.next = 6;
            return _Role["default"].find({
              _id: {
                $in: userFound.roles
              }
            });

          case 6:
            rolesFound = _context3.sent;
            i = 0;

          case 8:
            if (!(i < rolesFound.length)) {
              _context3.next = 15;
              break;
            }

            if (!(rolesFound[i].name === "admin")) {
              _context3.next = 12;
              break;
            }

            next();
            return _context3.abrupt("return");

          case 12:
            i++;
            _context3.next = 8;
            break;

          case 15:
            return _context3.abrupt("return", res.status(403).json({
              message: "Required Admin Role"
            }));

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 18]]);
  }));

  return function isAdmin(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.isAdmin = isAdmin;