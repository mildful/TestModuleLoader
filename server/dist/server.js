'use strict';

var _moduleAPI = require('./api/moduleAPI');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use('/node_modules', _express2.default.static(_path2.default.join(__dirname, '../../node_modules')));
app.use(_express2.default.static(_path2.default.join(__dirname, '../../public')));

app.get('/api/modules', _moduleAPI.ModuleAPI.sendModulesState);

app.listen(8080);
console.log("app is listening on port 8080");