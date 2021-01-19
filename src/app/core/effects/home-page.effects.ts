import { AuthService } from './../../auth/services/auth.service';
import { exhaustMap, catchError,map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { HomePageActions } from '../actions';
import {of} from 'rxjs';


@Injectable()
export class HomePageEffects{

    checkMasterpasswordPresent$ = createEffect(()=>
        this.actions$.pipe(
            ofType(HomePageActions.checkMasterPasswordPresent),
            exhaustMap(()=> {
               return this.authService.checkMasterPasswordPresent().pipe(
                   map(present => {console.log(present);return HomePageActions.checkMasterPasswordPresentSuccess({present})}),
                   catchError(error => of(HomePageActions.checkMasterPasswordPresentFailure({error})))
               )
            })
        )
    )

    constructor(
        private actions$: Actions<HomePageActions.HomePageActionsUnion>,
        private authService: AuthService
    ){}
}