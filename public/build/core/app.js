System.register(['angular2/platform/browser', "angular2/router", '@ngrx/devtools', '@ngrx/store', './reducers/rootReducer', './store', "./components/app.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, router_1, devtools_1, store_1, rootReducer_1, store_2, app_component_1;
    var reducers, baseState;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (devtools_1_1) {
                devtools_1 = devtools_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (rootReducer_1_1) {
                rootReducer_1 = rootReducer_1_1;
            },
            function (store_2_1) {
                store_2 = store_2_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            reducers = ModuleLoader.mergeReducers({ rootReducer: rootReducer_1.rootReducer });
            baseState = ModuleLoader.buildInitialState(store_2.initialState);
            console.log(reducers);
            console.log(baseState);
            browser_1.bootstrap(app_component_1.AppComponent, [
                router_1.ROUTER_PROVIDERS,
                store_1.provideStore(reducers, baseState),
                devtools_1.instrumentStore()
            ]).catch(console.error);
        }
    }
});
//# sourceMappingURL=app.js.map