import { Reducer, Action } from '@ngrx/store';

export const rootReducer:Reducer<any> = (state: any = {}, {type, payload}:Action) => {
    switch (type) {
        default:
            return state;
    }
};