const bootstrap:()=>void = async function() {
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
    await ModuleLoader.loadAll();
    System.import('core/app').then(null, console.error.bind(console));
};