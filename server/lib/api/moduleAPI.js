import fs from 'fs';
import path from 'path';

export class ModuleAPI {

   // moduleInfo is an object : {namespace, name, version, ?dependencies}
   static getModuleRef(moduleInfo) {
      return `${moduleInfo.namespace}@${moduleInfo.name}`;
   }

   // API to get informations about modules.
   static sendModulesState(req, res) {
      const modulesDir = path.join(__dirname, '../../../public/src/modules');
      const modulesConf = require(modulesDir + '/config.json');

      let installedModules = {};
      let unusedModules = [];
      let obsoleteModules = {}; // just check if the version of the installed module is the same as the one in the config.json
      let missingModules = Object.assign({}, modulesConf);
      let potentialModules = [];

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
      let missingDeps = {};
      let disableDeps = {};
      let obsoleteDeps = {};
      let modules = {};

      fs.readdir(modulesDir, function(err, files) {
         const filesLength = files.length - 1;
         // iterate over folders inside modules/
         files.forEach(function (file, i) {
            console.log(); // @fix: remove this log will make the app crash, sometimes.
            if(file[0] !== '.') {
               const modulePath = `${modulesDir}/${file}`;
               // retrieve information about the current file/folder
               fs.stat(modulePath, function(err, stat) {
                  if(stat.isDirectory()) {
                     let moduleInfo = require(`${modulePath}/info.json`);
                     // add the module to the list of installed modules
                     installedModules[file] = moduleInfo;

                     // if the module is required by the config file
                     if(modulesConf[file]) {
                        // remove it from missing modules
                        delete missingModules[ModuleAPI.getModuleRef(moduleInfo)];
                        // check if installed module is at the same version as the config file
                        if(moduleInfo.version === modulesConf[file]) {
                           potentialModules.push(moduleInfo);
                        } else {
                           obsoleteModules[ModuleAPI.getModuleRef(moduleInfo)] = {
                              target: modulesConf[file],
                              current: moduleInfo.version
                           };
                        }
                     } else { unusedModules.push(moduleInfo); }

                     // Iterate over files is over. Resolve dependencies and return something
                     if(i === filesLength) {
                        // resolve dependencies
                        potentialModules.forEach(function(moduleInfo) {
                           const currentModuleRef = ModuleAPI.getModuleRef(moduleInfo);
                           // only if module has dependencies
                           if(moduleInfo.dependencies) {
                              for(let depRef in moduleInfo.dependencies) {
                                 let depInfo = installedModules[depRef];
                                 let depRequiredVersion = moduleInfo.dependencies[depRef];

                                 // dep isn't installed
                                 if(!installedModules[depRef]) {
                                    if(!missingDeps[currentModuleRef]) missingDeps[currentModuleRef] = [];
                                    missingDeps[currentModuleRef].push({
                                       [depRef]: moduleInfo.dependencies[depRef]
                                    });
                                 }
                                 // dep installed but disable
                                 else if (!modulesConf[depRef]) {
                                    if(!disableDeps[currentModuleRef]) disableDeps[currentModuleRef] = [];
                                    disableDeps[currentModuleRef].push(depRef);
                                 }
                                 // dep installed, enabled but at the wrong version
                                 else if (depInfo.version != depRequiredVersion) {
                                    if(!obsoleteDeps[currentModuleRef]) obsoleteDeps[currentModuleRef] = {};
                                    obsoleteDeps[currentModuleRef][depRef] = {
                                       target: depRequiredVersion,
                                       current: depInfo.version
                                    };
                                 } else {
                                    modules[currentModuleRef] = moduleInfo;
                                 }
                              }
                           } else { modules[currentModuleRef] = moduleInfo; }
                        });

                        res.json({
                           unusedModules,
                           missingModules,
                           obsoleteModules,
                           missingDeps,
                           disableDeps,
                           obsoleteDeps,
                           modules
                        });
                     }
                  }
               });
            }
         });
      });
   }

};