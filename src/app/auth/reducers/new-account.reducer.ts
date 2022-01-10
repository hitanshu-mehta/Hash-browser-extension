import { createReducer, on, Action } from '@ngrx/store';
import { AuthApiActions, NewAccountPageActions } from '../actions';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

const newAccountPageReducer = createReducer(
  initialState,
  on(NewAccountPageActions.signup, (state) => ({
    ...state,
    error: null,
    pending: true,
  })),
  on(AuthApiActions.signupSuccess, (state) => ({
    ...state,
    error: null,
    pending: false,
  })),
  on(AuthApiActions.signupFailure, (state, { error }) => ({
    ...state,
    error,
    pending: true,
  }))
);

export const reducer = (state: State | undefined, action: Action) => newAccountPageReducer(state, action);

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
