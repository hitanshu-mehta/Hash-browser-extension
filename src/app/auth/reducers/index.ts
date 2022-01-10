import * as fromAuth from './auth.reducer';
import * as fromLoginPage from './login-page.reducer';
import * as fromNewAccountPage from './new-account.reducer';
import * as fromRoot from '../../reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface AuthState {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
  newAccountPage: fromNewAccountPage.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  status: fromAuth.reducer,
  loginPage: fromLoginPage.reducer,
  newAccountPage: fromNewAccountPage.reducer,
};

export const selectAuthState = createFeatureSelector<State, AuthState>('auth');

export const selectAuthStatusState = createSelector(selectAuthState, (state: AuthState) => state.status);
export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);
export const getLoggedIn = createSelector(getUser, (user) => !!user);

export const selectLoginPageState = createSelector(selectAuthState, (state: AuthState) => state.loginPage);

export const getLoginPageError = createSelector(selectLoginPageState, fromLoginPage.getError);

export const getLoginPagePending = createSelector(selectLoginPageState, fromLoginPage.getPending);

export const selectNewAccountPageState = createSelector(selectAuthState, (state: AuthState) => state.newAccountPage);

export const getNewAccountPagePending = createSelector(selectNewAccountPageState, fromNewAccountPage.getPending);

export const getNewAccountPageError = createSelector(selectNewAccountPageState, fromNewAccountPage.getError);

export const getMasterpasswordObj = createSelector(selectAuthStatusState, fromAuth.getMasterPasswordObj);

export const getMasterpassword = createSelector(selectAuthStatusState, fromAuth.getMasterPassword);
