import { createAction, props } from '@ngrx/store';
import { Credentials } from './../models/user';

export const signup = createAction('[New Account] Signup', props<{ credentials: Credentials }>());

export type NewAccountPageActionsUnion = ReturnType<typeof signup>;
