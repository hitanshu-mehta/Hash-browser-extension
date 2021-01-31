import { createReducer, Action, on } from '@ngrx/store';
import { HomePageActions } from '../actions';


export interface State {
    masterPasswordPresent: boolean;
}

const initialState: State = {
    masterPasswordPresent: false,
};

const homePageReducer = createReducer(
    initialState,
    on(HomePageActions.checkMasterPasswordPresentSuccess, (state, { present }) => ({ ...state, masterPasswordPresent: present }))
);

export const reducer = (state: State, action: Action) => homePageReducer(state, action);

export const getMasterPasswordPresent = (state: State) => state.masterPasswordPresent;
