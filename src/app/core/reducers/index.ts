import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromHomePage from './home-page.reducers';
import * as fromRoot from '../../reducers';


export interface CoreState{
    homePageStatus: fromHomePage.State;
}

export interface State extends fromRoot.State {
    core: CoreState;
}

export const reducers: ActionReducerMap<
    CoreState
> = {
    homePageStatus: fromHomePage.reducer
};

export const selectCoreState = createFeatureSelector<State,CoreState>('core');

export const selectHomePageStatusState = createSelector(
    selectCoreState,
    (state: CoreState) => state?.homePageStatus
);

export const getMasterPasswordPresent = createSelector(selectHomePageStatusState, fromHomePage.getMasterPasswordPresent);