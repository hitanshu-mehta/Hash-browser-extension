import { ActionReducer, ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { environment } from '../../environments/environment';

import { storeFreeze } from 'ngrx-store-freeze';
import * as fromRouter from '@ngrx/router-store';
import * as fromLayout from '../core/reducers/home-page.reducers';

export interface State {
    router: fromRouter.RouterReducerState;
    layout: fromLayout.State;
}

export const reducers: ActionReducerMap<State> = {
    layout: fromLayout.reducer,
    router: fromRouter.routerReducer,
};

// console.log all actions
export const logger = (reducer: ActionReducer<State>): ActionReducer<State> => (state, action) => {
        const result = reducer(state, action);
        console.groupCollapsed(action.type);
        console.log('prev state', state);
        console.log('action', action);
        console.log('next state', result);
        console.groupEnd();

        return result;
    };

export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger, storeFreeze]
    : [];

/**
 * Layout Reducers
 */
export const getLayoutState = createFeatureSelector<State, fromLayout.State>(
    'layout'
);

export const getMasterPasswordPresent = createSelector(
    getLayoutState,
    fromLayout.getMasterPasswordPresent
);
