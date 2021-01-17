import { VaultItem } from './../models/vault-item';
import { createAction, props, union } from '@ngrx/store';

export const addVaultItem = createAction(
    '[Add Vault Item Page] Add Vault Item',
    props<{ vaultItem: VaultItem}>()
);


const all = union({
    addVaultItem
});
export type AddVaultItemActionsUnion = typeof all;