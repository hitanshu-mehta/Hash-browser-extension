import { createAction, props } from '@ngrx/store';


export const checkMasterPasswordPresent = createAction('[Home Page] Check if Masterpassword is present')
export const checkMasterPasswordPresentSuccess = createAction(
    '[Home Page] Masterpassword is present',
    props<{present: boolean}>()
)
export const checkMasterPasswordPresentFailure = createAction(
    '[Home Page] Masterpassword is not present',
    props<{error: any}>()
)


export type HomePageActionsUnion = ReturnType< 
    | typeof checkMasterPasswordPresent
    | typeof checkMasterPasswordPresentSuccess
    | typeof checkMasterPasswordPresentFailure
>;