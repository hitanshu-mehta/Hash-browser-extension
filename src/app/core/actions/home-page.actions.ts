import { createAction, props } from '@ngrx/store';

export const checkMasterPasswordPresent = createAction('[Home Page] Check if Masterpassword is present');
export const checkMasterPasswordPresentSuccess = createAction(
  '[Home Page] Masterpassword check successful',
  props<{ present: boolean }>()
);
export const checkMasterPasswordPresentFailure = createAction(
  '[Home Page] Masterpassword check failure',
  props<{ error: any }>()
);

export type HomePageActionsUnion = ReturnType<
  | typeof checkMasterPasswordPresent
  | typeof checkMasterPasswordPresentSuccess
  | typeof checkMasterPasswordPresentFailure
>;
