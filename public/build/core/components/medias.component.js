System.register(["angular2/core", 'test@helloWorld/components'], function(exports_1, context_1) {
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
    var core_1, components_1;
    var MediasComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (components_1_1) {
                components_1 = components_1_1;
            }],
        execute: function() {
            MediasComponent = (function () {
                function MediasComponent() {
                }
                MediasComponent = __decorate([
                    core_1.Component(),
                    core_1.View({
                        directives: [components_1.HelloWorldComponent],
                        template: "\n        <h2>Medias.</h2>\n        <p>Some other content right here</p>\n        <p>Module :</p>\n        <helloWorld-cmp></helloWorld-cmp>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], MediasComponent);
                return MediasComponent;
            }());
            exports_1("MediasComponent", MediasComponent);
        }
    }
});
//# sourceMappingURL=medias.component.js.map