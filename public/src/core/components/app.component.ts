import { Component, View } from "angular2/core";
import { RouteConfig, ROUTER_DIRECTIVES } from "angular2/router";
import { Devtools } from '@ngrx/devtools';

import { HomeComponent } from "./home.component";
import { NavComponent } from "./nav.component";
import { MediasComponent } from "./medias.component";

@Component({ selector: 'app-view' })
@View({
    directives: [ Devtools, ROUTER_DIRECTIVES, NavComponent ],
    template: `
        <ngrx-devtools></ngrx-devtools>
        <h1>App</h1>
        <nav-cmp></nav-cmp>
        <router-outlet></router-outlet>
    `
})
@RouteConfig([
    { path: '/home',    name: 'Home',   component: HomeComponent,   useAsDefault: true },
    { path: '/medias',  name: 'Medias', component: MediasComponent }
])
export class AppComponent { }