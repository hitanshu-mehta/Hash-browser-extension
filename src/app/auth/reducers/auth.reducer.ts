import { MasterPasswordObj } from './../models/masterpassword';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from './../models/user';
import { AuthApiActions } from '../actions';

export interface State {
    user: User | null;
    masterpassword: string | null;
    masterPasswordObj: MasterPasswordObj | null;
}

export const initialState: State = {
    user: null,
    masterpassword: null,
    masterPasswordObj: null,
};

const authReducer = createReducer(
    initialState,
    on(
        AuthApiActions.loginSuccess,
        (state, { user, masterPasswordObj, masterpassword }) => ({ ...state, user, masterpassword, masterPasswordObj })
    ),
    on(
        AuthApiActions.signupSuccess,
        (state, { user, masterPasswordObj, masterpassword }) => ({ ...state, user, masterPasswordObj, masterpassword })
    )
);

export const reducer = (state: State, action: Action) => authReducer(state, action);

export const getUser = (state: State) => state.user;
export const getMasterPassword = (state: State) => state.masterpassword;
export const getMasterPasswordObj = (state: State) => state.masterPasswordObj;
