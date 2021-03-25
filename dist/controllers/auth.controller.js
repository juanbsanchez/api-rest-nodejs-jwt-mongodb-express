"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signIn = exports.signUp = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _Role = _interopRequireDefault(require("../models/Role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, username, email, password, roles, newUser, foundRoles, role, savedUser, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, roles = _req$body.roles;
            _context.t0 = _User["default"];
            _context.t1 = username;
            _context.t2 = email;
            _context.next = 7;
            return _User["default"].encryptPassword(password);

          case 7:
            _context.t3 = _context.sent;
            _context.t4 = {
              username: _context.t1,
              email: _context.t2,
              password: _context.t3
            };
            newUser = new _context.t0(_context.t4);

            if (!roles) {
              _context.next = 17;
              break;
            }

            _context.next = 13;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 13:
            foundRoles = _context.sent;
            newUser.roles = foundRoles.map(function (role) {
              return role._id;
            });
            _context.next = 21;
            break;

          case 17:
            _context.next = 19;
            return _Role["default"].findOne({
              name: "user"
            });

          case 19:
            role = _context.sent;
            newUser.roles = [role._id];

          case 21:
            _context.next = 23;
            return newUser.save();

          case 23:
            savedUser = _context.sent;
            _context.next = 26;
            return _jsonwebtoken["default"].sign({
              id: savedUser._id
            }, _config["default"].SECRET, {
              expiresIn: 86400 //24h

            });

          case 26:
            token = _context.sent;
            res.status(200).json({
              token: token
            });
            _context.next = 33;
            break;

          case 30:
            _context.prev = 30;
            _context.t5 = _context["catch"](0);
            console.log(_context.t5);

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 30]]);
  }));

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var signIn = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var userFound, matchPassword, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _User["default"].findOne({
              email: req.body.email
            }).populate("roles");

          case 3:
            userFound = _context2.sent;

            if (userFound) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: "User not found"
            }));

          case 6:
            _context2.next = 8;
            return _User["default"].comparePassword(req.body.password, userFound.password);

          case 8:
            matchPassword = _context2.sent;

            if (matchPassword) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              token: null,
              message: 'invalid password'
            }));

          case 11:
            token = _jsonwebtoken["default"].sign({
              id: userFound._id
            }, _config["default"].SECRET, {
              expiresIn: 86400
            });
            res.json({
              token: token
            });
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  }));

  return function signIn(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signIn = signIn;