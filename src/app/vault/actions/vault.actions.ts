import { VaultItem } from '../models/vault-item';
import { createAction, props, union } from '@ngrx/store';

export const loadVault = createAction('[Vault] Load Vault Items');

export const addVaultItem = createAction(
    '[Vault] Add Vault Item'
);

export const removeVaultItem = createAction(
    '[Vault] Remove Vault Item',
    props<{ vaultItem: VaultItem}>()
);

export const viewVaultItem = createAction(
    '[Vault] View Vault Item',
    props<{id: string}>()
);

const all = union({
    removeVaultItem,
    addVaultItem,
    loadVault,
    viewVaultItem
});
export type VaultActionsUnion = typeof all;
