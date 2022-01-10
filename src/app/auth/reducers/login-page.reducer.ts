import { Action, createReducer, on } from '@ngrx/store';
import { LoginPageActions, AuthApiActions } from '../actions';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

const loginPageReducer = createReducer(
  initialState,
  on(LoginPageActions.login, (state) => ({
    ...state,
    error: null,
    pending: true,
  })),
  on(AuthApiActions.loginSuccess, (state) => ({
    ...state,
    error: null,
    pending: false,
  })),
  on(AuthApiActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    pending: false,
  }))
);

export const reducer = (state: State | undefined, action: Action) => loginPageReducer(state, action);

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
