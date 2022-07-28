"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var promises_1 = require("fs/promises");
var fs = require("fs");
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var uuid_1 = require("uuid");
var app = express();
var environ = require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);
//check if file exists and create one if needed
var fileName = process.env.FILENAME;
var fileExists = fs.existsSync(fileName);
console.log("".concat(fileName, " exists:"), fileExists);
if (!fileExists) {
    console.log("Creating the file");
    fs.writeFileSync(fileName, JSON.stringify({}));
}
//create new user with post()
router.post('/users/new', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, database, string, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, promises_1.readFile)(fileName, 'utf-8')];
            case 1:
                contents = _a.sent();
                database = JSON.parse(contents);
                database[(0, uuid_1.v4)()] = req.body;
                string = JSON.stringify(database);
                return [4 /*yield*/, (0, promises_1.writeFile)(fileName, string)];
            case 2:
                _a.sent();
                res.send(Object.keys(database)[Object.keys(database).length - 1]);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(500).send('Failed to create new user.');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//delete user data with user/id
router["delete"]('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, database, check, dataString, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, (0, promises_1.readFile)(fileName, 'utf-8')];
            case 1:
                contents = _a.sent();
                database = JSON.parse(contents);
                check = database.hasOwnProperty(req.params.id);
                if (!(check == false)) return [3 /*break*/, 2];
                res.status(404).send('No such data');
                return [3 /*break*/, 4];
            case 2:
                delete database[req.params.id];
                dataString = JSON.stringify(database);
                return [4 /*yield*/, (0, promises_1.writeFile)(fileName, dataString)];
            case 3:
                _a.sent();
                res.send('One entry deleted from the database.');
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_2 = _a.sent();
                res.status(500).send('Failed to delete user data.');
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//update user data with put()
router.put('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, database, dataString, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, (0, promises_1.readFile)(fileName, 'utf-8')];
            case 1:
                contents = _a.sent();
                database = JSON.parse(contents);
                if (!(database.hasOwnProperty(req.params.id) == false)) return [3 /*break*/, 2];
                res.status(404).send('No such data');
                return [3 /*break*/, 4];
            case 2:
                database[req.params.id] = req.body;
                dataString = JSON.stringify(database);
                return [4 /*yield*/, (0, promises_1.writeFile)(fileName, dataString)];
            case 3:
                _a.sent();
                res.send('User updated.');
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_3 = _a.sent();
                res.status(500).send('Failed to update user data.');
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//display user data for user/specific id
router.get('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, database, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, promises_1.readFile)(fileName, 'utf-8')];
            case 1:
                contents = _a.sent();
                database = JSON.parse(contents);
                if (database.hasOwnProperty(req.params.id) == false) {
                    res.status(404).send('No such data');
                }
                else {
                    res.send(__assign({}, database[req.params.id]));
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(500).send('Failed to retrieve user data.');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//dispaly all user data, all users
router.get('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, database, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, promises_1.readFile)(fileName, 'utf-8')];
            case 1:
                contents = _a.sent();
                database = JSON.parse(contents);
                if (Object.keys(database).length === 0) {
                    res.status(404).send('Database seems to be empty.');
                }
                else {
                    res.send(database);
                }
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(500).send('Failed to retrieve user data.');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(process.env.PORT);
