import {Reducer, Action} from '@ngrx/store';
import { COUNTER_INCREMENT, COUNTER_DECREMENT } from './actions';
import { initialState, CounterStore } from './store';

export const test_counter:Reducer<number> = (state:number = initialState.count, action:Action) => {
    switch(action.type) {
        case COUNTER_INCREMENT:
            return state + 1;

        case COUNTER_DECREMENT:
            return state - 1;

        default:
            return state;
    }
};