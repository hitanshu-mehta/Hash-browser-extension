import { VaultItem } from './../models/vault-item';
import { createAction, props, union } from '@ngrx/store';

export const updateVaultItem = createAction(
    '[Selected Vault Item Page] Update selected vault item',
    props<{vaultItem:VaultItem}>()
);


const all = union({
    updateVaultItem
});
export type SelectedVaultItemActionsUnion = typeof all;