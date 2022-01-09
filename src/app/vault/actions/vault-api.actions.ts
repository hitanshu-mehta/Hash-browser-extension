import { createAction, props, union } from "@ngrx/store";
import { VaultItem } from "../models/vault-item";

export const loadVaultSuccess = createAction(
    '[Vault/Api] Load Vault Success',
    props<{ vaultItems: VaultItem[] }>()
);

export const loadVaultFailure = createAction(
    '[Vault/Api] Load Vault Failure',
    props<{ error: any }>()
);

export const addVaultItem = createAction(
    '[Vault/Api] Add Vault Item',
    props<{ vaultItem: VaultItem }>()
);

export const addVaultItemSuccess = createAction(
    '[Vault/Api] Add Vault Item Success',
    props<{ vaultItem: VaultItem }>()
);

export const addVaultItemFailure = createAction(
    '[Vault/Api] Add Vault Item Failure',
    props<{ error: any }>()
);

export const encryptVault = createAction(
    '[Vault/Api] Encrypt Vault',
    props<{ vaultItem: VaultItem }>()
);

export const encryptVaultSuccess = createAction(
    '[Vault/Api] Encrypt Vault Success',
    props<{ vaultItem: VaultItem }>()
);

export const encryptVaultFailure = createAction(
    '[Vault/Api] Encrypt Vault Failure',
    props<{ error: any }>()
);

const all = union({
    loadVaultSuccess,
    loadVaultFailure,
    encryptVault,
    encryptVaultSuccess,
    encryptVaultFailure,
    addVaultItem,
    addVaultItemSuccess,
    addVaultItemFailure,
});
export type VaultApiActionsUnion = typeof all;