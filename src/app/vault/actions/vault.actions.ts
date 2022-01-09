import { VaultItem } from '../models/vault-item';
import { createAction, props, union } from '@ngrx/store';

export const loadVault = createAction('[Vault] Load Vault Items');

export const getVaultItem = createAction(
    '[Vault] View Vault Item',
    props<{ id: string }>()
);

export const addVaultItem = createAction(
    '[Vault] Add Vault Item',
    props<{ vaultItem: VaultItem }>()
);

export const removeVaultItem = createAction(
    '[Vault] Remove Vault Item',
    props<{ id: string }>()
);

export const newVaultItem = createAction(
    '[Vault] new Vault Item'
)

const all = union({
    loadVault,
    getVaultItem,
    addVaultItem,
    removeVaultItem,
});
export type VaultActionsUnion = typeof all;
