import { LoadingSpinnerService } from './../../core/services/loading-spinner.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Credentials } from './../../model/credentials';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { LoginPageActions, AuthApiActions, AuthActions, NewAccountPageActions } from '../actions';

import { LogoutConfirmationDialogComponent } from '../components/logout-confirmation-dialog.component';

@Injectable()
export class AuthEffects{

    login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(LoginPageActions.login.type),
            map(action => action.credentials),
            exhaustMap((auth: Credentials) =>  {
                return this.authService.login(auth).pipe(
                    map(user => AuthApiActions.loginSuccess({ user })),
                    catchError(error =>of(AuthApiActions.loginFailure({ error })))
                    )
            })
        )
    );

    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthApiActions.loginSuccess.type),
            tap(() => this.router.navigate(['/main']))
        ),
        {dispatch : false}
    );

    loginRedirect$ = createEffect(()=>
        this.actions$.pipe(
            ofType(AuthApiActions.loginRedirect,AuthActions.logout),
            tap(()=> this.router.navigate(['/login']))
        ),
        {dispatch: false}
    );

    loginConfirmation$ = createEffect(()=>
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

    signup$ = createEffect(()=>
        this.actions$.pipe(
            ofType(NewAccountPageActions.signup.type),
            map(action => action.credentials),
            exhaustMap((auth: Credentials) =>
                this.authService.signup(auth).pipe(
                    map(user => AuthApiActions.signupSuccess({user})),
                    catchError(error => of(AuthApiActions.signupFailure({error})))
                )
            )
        )
    );

    signupSuccess$ = createEffect(()=>
        this.actions$.pipe(
            ofType(AuthApiActions.signupSuccess.type),
            tap(()=> this.router.navigate(['/main'])),
            ),
        {dispatch: false}
    );

    constructor(
        private actions$: Actions<LoginPageActions.LoginPageActionsUnion | NewAccountPageActions.NewAccountPageActionsUnion>,
        private authService: AuthService,
        private router: Router,
        private dialog: MatDialog,
        private spinner: LoadingSpinnerService
    ){}
}
