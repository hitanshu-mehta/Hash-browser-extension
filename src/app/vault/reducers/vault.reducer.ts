import { Action, createReducer, on } from '@ngrx/store';
import { VaultActions, VaultApiActions } from '../actions';
import { VaultItem } from './../models/vault-item';

export enum VaultStatus {
    LOADING,
    LOADED,
    FAILED_LOADING
}

export interface State {
    status: VaultStatus;
    currentSelectedId: string | null;
    vaultItems: VaultItem[];
    error: any;
}

const initialState: State = {
    status: VaultStatus.LOADING,
    currentSelectedId: null,
    vaultItems: [],
    error: null,
};

const vaultReducer = createReducer(
    initialState,
    on(VaultActions.loadVault, (state) => ({ ...state, loading: true })),
    on(VaultApiActions.loadVaultSuccess, (state, { vaultItems }) => ({ ...state, status: VaultStatus.LOADED, vaultItems })),
    on(VaultApiActions.loadVaultFailure, (state, { error }) => ({ ...state, status: VaultStatus.FAILED_LOADING, vaultItems: [], error })),
    on(VaultApiActions.addVaultItemSuccess, (state, { vaultItem }) => ({ ...state, vaultItems: [...state.vaultItems, vaultItem] })),
    on(VaultApiActions.removeVaultItemSuccess, (state, { vaultItem }) => ({
        ...state,
        vaultItems: state.vaultItems.filter(v => v.id !== vaultItem.id
        )
    })),
    on(VaultApiActions.updateVaultItemSuccess, (state, { oldVaultItem, updatedVaultItem }) => {
        state.vaultItems = state.vaultItems.filter(v => v.id !== oldVaultItem.id);
        state.vaultItems.push(updatedVaultItem);
        return state;
    }),
    on(VaultActions.viewVaultItem, (state, { id }) => ({ ...state, currentSelectedId: id })),
    on(VaultApiActions.addVaultItem, (state, { vaultItem }) => ({ ...state, itemToAdd: vaultItem }))
    // on(VaultApiActions.encryptLoginPasswordSuccess, (state, {encryptionKeyObj: EncryptionKeyObj}) => {

    // })
);

export const reducer = (state: State, action: Action) => vaultReducer(state, action);

export const getVaultItems = (state: State) => state.vaultItems;

export const getSelectedItemId = (state: State) => state.currentSelectedId;

export const getVaultStatus = (state: State) => state.status;