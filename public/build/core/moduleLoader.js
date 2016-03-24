var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var ModuleLoader = (function () {
    function ModuleLoader() {
    }
    ModuleLoader.loadAll = function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.moduleData = yield fetch('/api/modules').then(function (res) { return res.json(); });
            ModuleLoader.debug(this.moduleData);
            this.modulesList = this.moduleData.modules;
            for (var moduleRef in this.modulesList) {
                // map the module with SystemJS
                var path = "build/modules/" + moduleRef;
                System.config({
                    map: (_a = {}, _a[moduleRef] = path, _a),
                    packages: (_b = {},
                        _b[moduleRef] = {
                            main: 'share.js',
                            defaultExtension: 'js'
                        },
                        _b
                    )
                });
                //todo !
                var shared = yield System.import(moduleRef).then(function (share) { return share; });
                var moduleInfo = this.modulesList[moduleRef];
                // update modulesStates
                var moduleStore = shared.initialState;
                if (moduleStore) {
                    ModuleLoader.modulesStates[moduleRef] = {};
                    //Object.assign(ModuleLoader.modulesStates[moduleRef], moduleStore, {_info: moduleInfo});
                    Object.assign(ModuleLoader.modulesStates[moduleRef], moduleStore);
                }
                // update modulesReducers
                var rootReducerFormat = moduleInfo.namespace + "_" + moduleInfo.name;
                var moduleReducer = shared[rootReducerFormat];
                if (moduleReducer) {
                    ModuleLoader.modulesReducers[rootReducerFormat] = moduleReducer;
                }
            }
            var _a, _b;
        });
    };
    ModuleLoader.debug = function (moduleData) {
        if (moduleData.unusedModules.length) {
            console.warn('Les modules suivants sont installés mais désactivés:');
            console.warn(moduleData.unusedModules);
        }
        if (Object.keys(moduleData.obsoleteModules).length) {
            console.warn("Les modules suivants ne sont pas à la version indiquée par 'modules/config.json':");
            console.warn(moduleData.obsoleteModules);
        }
        if (Object.keys(moduleData.missingDeps).length) {
            console.warn("Il manques des dépendances pour les modules suivants:");
            console.warn(moduleData.missingDeps);
        }
        if (Object.keys(moduleData.disableDeps).length) {
            console.warn("Les modules suivants ont leur dépendances installées mais non-activées:");
            console.warn(moduleData.disableDeps);
        }
        if (Object.keys(moduleData.obsoleteDeps).length) {
            console.warn("Les dépendances des modules suivants ne sont pas à la bonne version:");
            console.warn(moduleData.obsoleteDeps);
        }
        if (Object.keys(moduleData.missingModules).length) {
            console.warn("Les modules suivants ne sont pas installées et pourtant spécifiés dans 'modules/config.json':");
            console.warn(moduleData.missingModules);
        }
    };
    ModuleLoader.mergeReducers = function (reducers) {
        return Object.assign.apply(Object, [{}].concat(reducers, ModuleLoader.modulesReducers));
    };
    ModuleLoader.buildInitialState = function (initialState) {
        return Object.assign.apply(Object, [{}].concat(initialState, [{ modules: ModuleLoader.modulesStates }]));
    };
    ModuleLoader.moduleData = {};
    ModuleLoader.modulesStates = {};
    ModuleLoader.modulesReducers = {};
    return ModuleLoader;
}());
//# sourceMappingURL=moduleLoader.js.map