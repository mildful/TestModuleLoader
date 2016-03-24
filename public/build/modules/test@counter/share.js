System.register(['./src/store', './src/reducers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[
            function (store_1_1) {
                exports_1({
                    "initialState": store_1_1["initialState"],
                    "CounterStore": store_1_1["CounterStore"]
                });
            },
            function (reducers_1_1) {
                exports_1({
                    "test_counter": reducers_1_1["test_counter"]
                });
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=share.js.map