import { createAction, props, union } from "@ngrx/store";
import { VaultItem } from "../models/vault-item";

export const loadVaultSuccess = createAction(
    '[Vault/Api] Load vault Success',
    props<{ vaultItems: VaultItem[] }>()
);

export const loadVaultFailure = createAction(
    '[Vault/Api] Load vault Failure',
    props<{ error: any }>()
);

const all = union({
    loadVaultSuccess,
    loadVaultFailure,
});
export type VaultApiActionsUnion = typeof all;