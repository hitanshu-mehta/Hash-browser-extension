import { MasterPasswordObj } from './../models/masterpassword';
import { User } from '../models/user';
import { createAction, props } from '@ngrx/store';


export const loginSuccess = createAction(
    '[Auth/API] Login Success',
    props<{ user: User; masterPasswordObj: MasterPasswordObj; masterpassword: string }>()
);

export const loginFailure = createAction(
    '[Auth/API] Login Failure',
    props<{ error: any }>()
);

export const loginRedirect = createAction('[Auth/API] Login Redirect');

export const signupSuccess = createAction(
    '[Auth/API] Signup Success',
    props<{ user: User; masterPasswordObj: MasterPasswordObj; masterpassword: string }>()
);

export const signupFailure = createAction(
    '[Auth/API] Signup Failure',
    props<{ error: any }>()
);

export const loadMasterPasswordObjSuccess = createAction(
    '[Login Page] Load Masterpassword Obj Success',
    props<{ masterPasswordObj: MasterPasswordObj }>()
)

export const loadMasterPasswordObjFailure = createAction(
        '[Login Page] Load Masterpassword Obj Failure',
        props<{ error: any }>()
)

export type AuthApiActionsUnion = ReturnType<
    | typeof loginSuccess
    | typeof loginFailure
    | typeof loginRedirect
    | typeof signupSuccess
    | typeof signupFailure
    | typeof loadMasterPasswordObjSuccess
    | typeof loadMasterPasswordObjFailure
>;
