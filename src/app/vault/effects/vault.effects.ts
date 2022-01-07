import { catchError, map, mergeMap } from 'rxjs/operators';
import { VaultService } from './../services/vault.service';
import { VaultActions, VaultApiActions } from 'src/app/vault/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { VaultItem } from '../models/vault-item';

@Injectable()
export class VaultEffects {

    constructor(
        private actions$: Actions<VaultActions.VaultActionsUnion>,
        private vaultService: VaultService
    ) { }

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

}