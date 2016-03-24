'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.ModuleAPI = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModuleAPI = exports.ModuleAPI = function () {
   function ModuleAPI() {
      _classCallCheck(this, ModuleAPI);
   }

   _createClass(ModuleAPI, null, [{
      key: 'getModuleRef',
      value: function getModuleRef(moduleInfo) {
         return moduleInfo.namespace + '@' + moduleInfo.name;
      }
   }, {
      key: 'sendModulesState',
      value: function sendModulesState(req, res) {
         var modulesDir = _path2.default.join(__dirname, '../../../public/src/modules');
         var modulesConf = require(modulesDir + '/config.json');

         var installedModules = {};
         var unusedModules = [];
         var obsoleteModules = {}; // ne check pas si la version est trop recente ou trop ancienne.
         var missingModules = Object.assign({}, modulesConf);
         var potentialModules = [];

         /*
          {
             module@withdeps: {
                dep@name: {
                   target: depInfoTarget,
                   current: depInfoCurrent
                }
             }
          }
          */
         var missingDeps = {};
         var disableDeps = {};
         var obsoleteDeps = {};
         var modules = {};

         _fs2.default.readdir(modulesDir, function (err, files) {
            var filesLength = files.length - 1;
            // parcourir les dossiers
            files.forEach(function (file, i) {
               console.log();
               if (file[0] !== '.') {
                  (function () {
                     var modulePath = modulesDir + '/' + file;
                     // on récupere des infos supplémentaires sur le dossier courant
                     _fs2.default.stat(modulePath, function (err, stat) {
                        // si c'est bien un dossier
                        if (stat.isDirectory()) {
                           var moduleInfo = require(modulePath + '/info.json');
                           // ajout du module à la liste de tous les modules présents
                           installedModules[file] = moduleInfo;

                           // si le module est bien dans la conf des modules
                           if (modulesConf[file]) {
                              // remove du module du missingModules
                              delete missingModules[ModuleAPI.getModuleRef(moduleInfo)];
                              // verification si le module chargé est à la bonne version
                              if (moduleInfo.version === modulesConf[file]) {
                                 potentialModules.push(moduleInfo);
                              } else {
                                 obsoleteModules[ModuleAPI.getModuleRef(moduleInfo)] = {
                                    target: modulesConf[file],
                                    current: moduleInfo.version
                                 };
                              }
                           } else {
                              unusedModules.push(moduleInfo);
                           }

                           // Si c'était le dernier, on gere les dep + retourne les modules
                           if (i === filesLength) {
                              // resolve dependencies
                              potentialModules.forEach(function (moduleInfo) {
                                 var currentModuleRef = ModuleAPI.getModuleRef(moduleInfo);
                                 // gestion des dependances
                                 if (moduleInfo.dependencies) {
                                    for (var depRef in moduleInfo.dependencies) {
                                       var depInfo = installedModules[depRef];
                                       var depRequiredVersion = moduleInfo.dependencies[depRef];

                                       // la dep n'est pas installée
                                       if (!installedModules[depRef]) {
                                          if (!missingDeps[currentModuleRef]) missingDeps[currentModuleRef] = [];
                                          missingDeps[currentModuleRef].push(_defineProperty({}, depRef, moduleInfo.dependencies[depRef]));
                                       }
                                       // la dep est installée mais pas activée
                                       else if (!modulesConf[depRef]) {
                                             if (!disableDeps[currentModuleRef]) disableDeps[currentModuleRef] = [];
                                             disableDeps[currentModuleRef].push(depRef);
                                          }
                                          // la dep est activée mais installée à la mauvais version
                                          else if (depInfo.version != depRequiredVersion) {
                                                if (!obsoleteDeps[currentModuleRef]) obsoleteDeps[currentModuleRef] = {};
                                                obsoleteDeps[currentModuleRef][depRef] = {
                                                   target: depRequiredVersion,
                                                   current: depInfo.version
                                                };
                                             } else {
                                                modules[currentModuleRef] = moduleInfo;
                                             }
                                    }
                                 } else {
                                    modules[currentModuleRef] = moduleInfo;
                                 }
                              });

                              res.json({
                                 unusedModules: unusedModules,
                                 missingModules: missingModules,
                                 obsoleteModules: obsoleteModules,
                                 missingDeps: missingDeps,
                                 disableDeps: disableDeps,
                                 obsoleteDeps: obsoleteDeps,
                                 modules: modules
                              });
                           }
                        }
                     });
                  })();
               }
            });
         });
      }
   }]);

   return ModuleAPI;
}();

;