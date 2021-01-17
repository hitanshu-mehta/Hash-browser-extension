import { Action, createReducer,on } from '@ngrx/store';
import { User } from './../models/user';
import { AuthApiActions} from '../actions';

export interface State {
    user: User | null;
}

export const initialState: State = {
    user: null,
};

const authReducer = createReducer(
    initialState,
    on(AuthApiActions.loginSuccess, (state, { user }) => ({...state, user })),
    on(AuthApiActions.signupSuccess, (state, { user }) => ({...state, user}))
);

export const reducer = (state: State, action: Action) => authReducer(state, action);

export const getUser = (state: State) => state.user;
