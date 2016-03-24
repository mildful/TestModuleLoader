import { Action } from '@ngrx/store'

export const COUNTER_INCREMENT = 'COUNTER.INCREMENT';
export const COUNTER_DECREMENT = 'COUNTER.DECREMENT';

export const incrementCounter:()=>Action = () => {
    return {
        type: COUNTER_INCREMENT
    };
};
export const decrementCounter:()=>Action = () => {
    return {
        type: COUNTER_DECREMENT
    };
};