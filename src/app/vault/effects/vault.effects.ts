import { catchError, exhaustMap, map, mergeMap, switchMap, tap, pluck } from 'rxjs/operators';
import { VaultService } from './../services/vault.service';
import { VaultActions, VaultApiActions } from 'src/app/vault/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { from, of } from 'rxjs';
import { VaultItem } from '../models/vault-item';
import { EncryptionKeyObj } from '../models/encryption-key';

@Injectable()
export class VaultEffects {

    constructor(
        private actions$: Actions<VaultActions.VaultActionsUnion>,
        private vaultService: VaultService,
    ) { }

    loadVault$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VaultActions.loadVault.type),
            mergeMap(() => this.vaultService.loadVault().pipe(
                map((vaultItems: VaultItem[]) => VaultApiActions.loadVaultSuccess({ vaultItems })),
                catchError(error => of(VaultApiActions.loadVaultFailure({ error })))
            ))
        )
    );

    addVaultItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VaultActions.addVaultItem.type),
            pluck('vaultItem'),
            switchMap(vaultItem => of(VaultApiActions.encryptVault({ vaultItem })))
        )
    );

    encryptVault$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VaultApiActions.encryptVault.type),
            pluck('vaultItem'),
            exhaustMap((vaultItem: VaultItem) => from(this.vaultService.encryptPassword(vaultItem.password as string)).pipe(
                map((encryptionKeyObj: EncryptionKeyObj) => {
                    let encVaultItem: VaultItem = Object.assign({}, vaultItem);
                    encVaultItem.password = encryptionKeyObj;
                    return VaultApiActions.encryptVaultSuccess({ vaultItem: encVaultItem })
                }),
                catchError(error => of(VaultApiActions.encryptVaultFailure({ error })))
            ))
        ),
    );

    encryptVaultSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VaultApiActions.encryptVaultSuccess.type),
            exhaustMap(({ vaultItem }) => of(VaultApiActions.addVaultItem(vaultItem)))
        )
    );

    encryptVaultFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VaultApiActions.encryptVaultFailure.type),
            switchMap(error => of(VaultApiActions.addVaultItemFailure(error)))
        )
    );

    addVaultItemAPI$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VaultApiActions.addVaultItem.type),
            exhaustMap(vaultItem => this.vaultService.addVaultItem(vaultItem).pipe(
                map((vaultItem: VaultItem) => VaultApiActions.addVaultItemSuccess({ vaultItem })),
                catchError(error => of(VaultApiActions.addVaultItemFailure({ error })))
            ))
        )
    );

    removeVaultItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VaultActions.removeVaultItem.type),
            pluck('id'),
            switchMap(id => of(VaultApiActions.removeVaultItem({ id })))
        )
    );

    removeVaultItemAPI$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VaultApiActions.removeVaultItem.type),
            pluck('id'),
            exhaustMap(id => this.vaultService.removeVaultItem(id).pipe(
                map(vaultItems => VaultApiActions.removeVaultItemSuccess({ vaultItems })),
                catchError(error => of(VaultApiActions.removeVaultItemFailure({ error })))
            ))
        )
    );

    getVaultItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VaultActions.getVaultItem.type),
            pluck('id'),
            switchMap(id => {
                if (id === '-1')
                    return of(VaultActions.newVaultItem());
                return of(VaultApiActions.getVaultItem({ id }))
            })
        )
    );

    getVaultItemAPI$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VaultApiActions.getVaultItem.type),
            pluck('id'),
            exhaustMap(id => this.vaultService.getVaultItem(id).pipe(
                map(vaultItem => VaultApiActions.decryptVault({ vaultItem })),
                catchError(error => of(VaultApiActions.getVaultItemFailure({ error })))
            ))
        )
    );

    decryptVault$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VaultApiActions.decryptVault.type),
            pluck('vaultItem'),
            exhaustMap((vaultItem: VaultItem) => this.vaultService.decryptPassword(vaultItem.password as EncryptionKeyObj).pipe(
                map(password => {
                    let decVaultItem: VaultItem = Object.assign({}, vaultItem);
                    decVaultItem.password = password;
                    return VaultApiActions.decryptVaultSuccess({ vaultItem: decVaultItem })
                }),
                catchError(error => of(VaultApiActions.decryptVaultFailure({ error })))
            ))
        )
    );
}