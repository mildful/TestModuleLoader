System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var COUNTER_INCREMENT, COUNTER_DECREMENT, incrementCounter, decrementCounter;
    return {
        setters:[],
        execute: function() {
            exports_1("COUNTER_INCREMENT", COUNTER_INCREMENT = 'COUNTER.INCREMENT');
            exports_1("COUNTER_DECREMENT", COUNTER_DECREMENT = 'COUNTER.DECREMENT');
            exports_1("incrementCounter", incrementCounter = function () {
                return {
                    type: COUNTER_INCREMENT
                };
            });
            exports_1("decrementCounter", decrementCounter = function () {
                return {
                    type: COUNTER_DECREMENT
                };
            });
        }
    }
});
//# sourceMappingURL=actions.js.map