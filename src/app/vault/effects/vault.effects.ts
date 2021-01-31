import { Router } from '@angular/router';
import { VaultItem } from './../models/vault-item';
import { VaultService } from './../services/vault.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { SelectedVaultItemActions, VaultActions, VaultApiActions, AddVaultItemActions } from '../actions';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class VaultEffects {

    loadVault$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VaultActions.loadVault.type),
            mergeMap(() => this.vaultService.loadVault().pipe(
                map((vaultItems: VaultItem[]) =>
                    VaultApiActions.loadVaultSuccess({ vaultItems })
                ),
                catchError(error =>
                    of(VaultApiActions.loadVaultFailure({ error }))
                )
            ))
        )
    );


    addVaultItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddVaultItemActions.addVaultItem.type),
            map(action => action.vaultItem),
            exhaustMap((vaultItem: VaultItem) => this.vaultService.addVaultItem(vaultItem).pipe(
                map(() => VaultApiActions.addVaultItemSuccess({ vaultItem })),
                catchError(error => of(VaultApiActions.addVaultItemFailure({ error })))
            ))
        )
    );

    addVaultItemSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VaultApiActions.addVaultItemSuccess.type),
            tap(() => this.router.navigate(['/vault-list']))
        ),
        { dispatch: false }
    );

    addVaultItemNavigate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VaultActions.addVaultItem.type),
            tap(() => this.router.navigate(['/new-vault-item']))
        ),
        { dispatch: false }
    );

    removeVaultItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VaultActions.removeVaultItem.type),
            map(action => action.vaultItem),
            exhaustMap((vaultItem: VaultItem) => this.vaultService.removeVaultItem(vaultItem).pipe(
                map(() => VaultApiActions.removeVaultItemSuccess({ vaultItem })),
                catchError((error) => of(VaultApiActions.removeVaultItemFailure({ error })))
            ))
        )
    );

    updateVaultItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SelectedVaultItemActions.updateVaultItem.type),
            map(action => action.vaultItem),
            exhaustMap((oldVaultItem: VaultItem) => this.vaultService.updateVaultItem(oldVaultItem).pipe(
                map((updatedVaultItem: VaultItem) => VaultApiActions.updateVaultItemSuccess({ oldVaultItem, updatedVaultItem })),
                catchError((error) => of(VaultApiActions.updateVaultItemFailure({ error })))
            ))
        )
    );


    constructor(
        private actions$:
            Actions<VaultActions.VaultActionsUnion
                | VaultApiActions.VaultApiActionsUnion
                | SelectedVaultItemActions.SelectedVaultItemActionsUnion
                | AddVaultItemActions.AddVaultItemActionsUnion>,
        private vaultService: VaultService,
        private router: Router
    ) { }

}
