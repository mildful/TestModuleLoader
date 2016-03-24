import { Component, View } from "angular2/core";
import { CounterComponent } from 'test@counter/components';

@Component()
@View({
    directives: [ CounterComponent ],
    template: `
        <h2>Home.</h2>
        <p>Some content right here</p>

        <p>Module :</p>
        <counter-cmp></counter-cmp>
    `
})
export class HomeComponent { }