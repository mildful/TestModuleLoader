interface ModuleInfo {
    namespace: string,
    name: string,
    version: string
}

class ModuleLoader {
    static moduleData:any = {};
    static modulesList:ModuleInfo[];
    static modulesStates:any = {};
    static modulesReducers:any = {};

    static async loadAll():void {
        // call the API
        this.moduleData = await fetch('/api/modules').then(res => res.json());
        // use this only in dev env
        ModuleLoader.debug(this.moduleData);
        this.modulesList = this.moduleData.modules;

        for(let moduleRef:string in this.modulesList) {
            // map the module with SystemJS
            const path:string = `build/modules/${moduleRef}`;
            System.config({
                map: { [moduleRef]: path },
                packages: {
                    [moduleRef]: {
                        main: 'share.js',
                        defaultExtension: 'js'
                    }
                }
            });

            //todo !
            const shared = await System.import(moduleRef).then(share => share);
            const moduleInfo = this.modulesList[moduleRef];
            // update modulesStates
            const moduleStore =  shared.initialState;
            if(moduleStore) {
                ModuleLoader.modulesStates[moduleRef] = {};
                Object.assign(ModuleLoader.modulesStates[moduleRef], moduleStore);
            }

            // update modulesReducers
            const rootReducerFormat = `${moduleInfo.namespace}_${moduleInfo.name}`;
            const moduleReducer =  shared[rootReducerFormat];
            if(moduleReducer) {
                ModuleLoader.modulesReducers[rootReducerFormat] = moduleReducer;
            }
        }
    }

    static debug(moduleData) {
        if(moduleData.unusedModules.length) {
            console.warn('Les modules suivants sont installés mais désactivés:');
            console.warn(moduleData.unusedModules);
        }
        if(Object.keys(moduleData.obsoleteModules).length) {
            console.warn("Les modules suivants ne sont pas à la version indiquée par 'modules/config.json':");
            console.warn(moduleData.obsoleteModules);
        }
        if(Object.keys(moduleData.missingDeps).length) {
            console.warn("Il manques des dépendances pour les modules suivants:");
            console.warn(moduleData.missingDeps);
        }
        if(Object.keys(moduleData.disableDeps).length) {
            console.warn("Les modules suivants ont leur dépendances installées mais non-activées:");
            console.warn(moduleData.disableDeps);
        }
        if(Object.keys(moduleData.obsoleteDeps).length) {
            console.warn("Les dépendances des modules suivants ne sont pas à la bonne version:");
            console.warn(moduleData.obsoleteDeps);
        }
        if(Object.keys(moduleData.missingModules).length) {
            console.warn("Les modules suivants ne sont pas installées et pourtant spécifiés dans 'modules/config.json':");
            console.warn(moduleData.missingModules);
        }
    }

    static mergeReducers(reducers):any {
        return Object.assign({}, ...reducers, ...ModuleLoader.modulesReducers);
    }

    static buildInitialState(initialState):any {
        return Object.assign({}, ...initialState, {modules: ModuleLoader.modulesStates});
    }
}