import { Component, View, Injectable } from 'angular2/core';
import { Observable } from "rxjs/Observable";
import { CounterStore } from './store';
import { Store } from '@ngrx/store';
import { incrementCounter, decrementCounter } from './actions';

@Injectable()
@Component({ selector: 'counter-cmp' })
@View({
    template: `
        <h4>Counter</h4>
        <p>Count: {{count | async}}</p>
        <button (click)="onIncrement()">Increment</button>
        <button (click)="onDecrement()">Decrement</button>
    `
})
export class CounterComponent {
    count:Observable<number>;

    constructor(private store:Store<CounterStore>) {
        // todo !
        console.log(store);
        this.count = store.select('test_counter'); //todo
    }

    onIncrement() {
        this.store.dispatch(incrementCounter());
    }

    onDecrement() {
        this.store.dispatch(decrementCounter());
    }
}