import { VaultItem } from '../models/vault-item';
import { createAction, props, union } from '@ngrx/store';

export const loadVault = createAction('[Vault] Load Vault Items');

export const viewVaultItem = createAction(
    '[Vault] View Vault Item',
    props<{ id: string }>()
);

export const addVaultItem = createAction(
    '[Vault] Add Vault Item',
    props<{ id: VaultItem }>()
);

export const removeVaultItem = createAction(
    '[Vault] Remove Vault Item',
    props<{ id: string }>()
);

const all = union({
    loadVault,
    viewVaultItem,
    addVaultItem,
    removeVaultItem,
});
export type VaultActionsUnion = typeof all;
