import { MasterPasswordObj } from './../models/masterpassword';
import { User } from '../models/user';
import { createAction, props } from '@ngrx/store';


export const loginSuccess = createAction(
    '[Auth/API] Login Success',
    props<{ user: User }>()
);

export const loginFailure = createAction(
    '[Auth/API] Login Failure',
    props<{ error: any }>()
  );

export const loginRedirect = createAction('[Auth/API] Login Redirect');

export const signupSuccess = createAction(
  '[Auth/API] Sign Success',
  props<{user: User, masterPasswordObj: MasterPasswordObj, masterpassword: string}>()
);

export const signupFailure = createAction(
  '[Auth/API] Sign Failure',
  props<{error: any}>()
);


export type AuthApiActionsUnion = ReturnType<
  | typeof loginSuccess
  | typeof loginFailure
  | typeof loginRedirect
  | typeof signupSuccess
  | typeof signupFailure
>;
