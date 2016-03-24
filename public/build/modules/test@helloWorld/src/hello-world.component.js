System.register(['angular2/core', 'test@counter/actions', '@ngrx/store'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, actions_1, store_1;
    var HelloWorldComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (actions_1_1) {
                actions_1 = actions_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            }],
        execute: function() {
            HelloWorldComponent = (function () {
                function HelloWorldComponent(store) {
                    this.store = store;
                }
                HelloWorldComponent.prototype.onIncrement = function () {
                    this.store.dispatch(actions_1.incrementCounter());
                };
                HelloWorldComponent = __decorate([
                    core_1.Injectable(),
                    core_1.Component({ selector: 'helloWorld-cmp' }),
                    core_1.View({
                        template: "\n        <h2>Hello world !</h2>\n        <button (click)=\"onIncrement()\">Increment Counter</button>\n    "
                    }), 
                    __metadata('design:paramtypes', [store_1.Store])
                ], HelloWorldComponent);
                return HelloWorldComponent;
            }());
            exports_1("HelloWorldComponent", HelloWorldComponent);
        }
    }
});
//# sourceMappingURL=hello-world.component.js.map