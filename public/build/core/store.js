System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var initialState;
    return {
        setters:[],
        execute: function() {
            exports_1("initialState", initialState = {
                env: {
                    modules: ModuleLoader.moduleData
                }
            });
        }
    }
});
//# sourceMappingURL=store.js.map