import { MasterPasswordObj } from './../models/masterpassword';
import { createAction, props } from '@ngrx/store';
import { Credentials } from '../models/user';

export const login = createAction('[Login Page] Login', props<{ credentials: Credentials }>());

export const loadMasterPasswordObj = createAction('[Login Page] Load Masterpassword Obj');

export type LoginPageActionsUnion = ReturnType<typeof login>;
