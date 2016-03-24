// angular
import { bootstrap } from 'angular2/platform/browser';
import { ROUTER_PROVIDERS } from "angular2/router";
// devtools
import { instrumentStore } from '@ngrx/devtools';
// @ngrx/store
import { provideStore } from '@ngrx/store';
import { rootReducer } from './reducers/rootReducer';
import { initialState } from './store';
// components
import { AppComponent } from "./components/app.component";

const reducers = ModuleLoader.mergeReducers({ rootReducer });
const baseState = ModuleLoader.buildInitialState(initialState);
console.log(reducers);
console.log(baseState);

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    provideStore(reducers, baseState),
    instrumentStore()
]).catch(console.error);