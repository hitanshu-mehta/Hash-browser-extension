import { MasterPasswordObj } from './../models/masterpassword';
import { loadMasterPasswordObj } from './../actions/login-page.actions';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Credentials } from './../models/user';
import { exhaustMap, map, catchError, tap, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { LoginPageActions, AuthApiActions, AuthActions, NewAccountPageActions } from '../actions';

import { LogoutConfirmationDialogComponent } from '../components/logout-confirmation-dialog.component';

import * as fromAuth from '../reducers';

@Injectable()
export class AuthEffects {

    loadMasterPasswordObj$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginPageActions.loadMasterPasswordObj),
            mergeMap(() => this.authService.loadMasterPasswordObj().pipe(
                map((obj: MasterPasswordObj) =>
                    AuthApiActions.loadMasterPasswordObjSuccess({ masterPasswordObj: obj })
                ),
                catchError(error =>
                    of(AuthApiActions.loadMasterPasswordObjFailure({ error }))
                )
            ))
        )
    );

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginPageActions.login.type),
            map(action => action.credentials),
            exhaustMap((auth: Credentials) =>
                from(this.authService.login(auth)).pipe(
                    withLatestFrom(this.store.select(fromAuth.getMasterpasswordObj)),
                    map(([user, masterPasswordObj]) =>
                        AuthApiActions.loginSuccess({ user, masterpassword: auth.password, masterPasswordObj })),
                    catchError(error => of(AuthApiActions.loginFailure({ error })))
                ))
        )
    );

    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthApiActions.loginSuccess.type),
            tap(() => this.router.navigate(['/main']))
        ),
        { dispatch: false }
    );

    loginRedirect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthApiActions.loginRedirect, AuthActions.logout),
            tap(() => this.router.navigate(['/login']))
        ),
        { dispatch: false }
    );

    loginConfirmation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logoutConfirmation.type),
            exhaustMap(() => {
                const dialogRef = this.dialog.open<LogoutConfirmationDialogComponent,
                    undefined,
                    boolean
                >(LogoutConfirmationDialogComponent);

                return dialogRef.afterClosed();
            }),
            map(
                result =>
                    result ? AuthActions.logout() : AuthActions.logoutConfirmationDismiss()
            )
        )
    );

    signup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NewAccountPageActions.signup.type),
            map(action => action.credentials),
            exhaustMap((auth: Credentials) =>
                from(this.authService.signup(auth)).pipe(
                    map((obj) => AuthApiActions.signupSuccess(obj)),
                    catchError(error => of(AuthApiActions.signupFailure({ error })))
                )
            )
        )
    );

    signupSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthApiActions.signupSuccess.type),
            tap(() => this.router.navigate(['/main'])),
        ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions<LoginPageActions.LoginPageActionsUnion | NewAccountPageActions.NewAccountPageActionsUnion>,
        private authService: AuthService,
        private router: Router,
        private dialog: MatDialog,
        private store: Store<fromAuth.State>
    ) { }
}
