import { Component, View } from "angular2/core";
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({ selector: 'nav-cmp' })
@View({
    directives: [ROUTER_DIRECTIVES],
    template: `
        <nav>
            <a [routerLink]="['Home']">Home</a>
            <a [routerLink]="['Medias']">Médias</a>
        </nav>
    `
})
export class NavComponent { }