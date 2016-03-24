var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var bootstrap = function () {
    return __awaiter(this, void 0, void 0, function* () {
        System.config({
            map: {
                core: 'build/core',
                modules: 'build/modules',
                '@ngrx/store': 'node_modules/@ngrx/store',
                '@ngrx/devtools': 'node_modules/@ngrx/devtools'
            },
            packages: {
                core: {
                    format: 'register',
                    defaultExtension: 'js'
                },
                modules: {
                    format: 'register',
                    defaultExtension: 'js'
                },
                '@ngrx/store': {
                    main: 'dist/index.js',
                    defaultExtension: 'js'
                },
                '@ngrx/devtools': {
                    main: 'dist/index.js',
                    defaultExtension: 'js'
                }
            }
        });
        yield ModuleLoader.loadAll();
        System.import('core/app').then(null, console.error.bind(console));
    });
};
//# sourceMappingURL=bootstrap.js.map