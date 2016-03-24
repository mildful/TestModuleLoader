import { Component, View, Injectable } from 'angular2/core';
import { incrementCounter } from 'test@counter/actions';
import { CounterStore } from 'test@counter/share';
import { Store } from '@ngrx/store';

@Injectable()
@Component({ selector: 'helloWorld-cmp' })
@View({
    template: `
        <h2>Hello world !</h2>
        <button (click)="onIncrement()">Increment Counter</button>
    `
})
export class HelloWorldComponent {
    constructor(private store:Store<CounterStore>) { }

    onIncrement() {
        this.store.dispatch(incrementCounter());
    }
}