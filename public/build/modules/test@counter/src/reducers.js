System.register(['./actions', './store'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var actions_1, store_1;
    var test_counter;
    return {
        setters:[
            function (actions_1_1) {
                actions_1 = actions_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            }],
        execute: function() {
            exports_1("test_counter", test_counter = function (state, action) {
                if (state === void 0) { state = store_1.initialState.count; }
                switch (action.type) {
                    case actions_1.COUNTER_INCREMENT:
                        return state + 1;
                    case actions_1.COUNTER_DECREMENT:
                        return state - 1;
                    default:
                        return state;
                }
            });
        }
    }
});
//# sourceMappingURL=reducers.js.map