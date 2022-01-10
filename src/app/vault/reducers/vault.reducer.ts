import { VaultActions, VaultApiActions } from 'src/app/vault/actions';
import { Action, createReducer, on } from '@ngrx/store';
import { VaultItem } from './../models/vault-item';

const EMPTY_VAULT_ITEM: VaultItem = {
    id: '',
    name: '',
    username: '',
    password: '',
    url: '',
    createdAt: 0,
    updatedAt: 0
};

export enum VaultStatus {
    loading,
    loaded,
    failedLoading,
    loadingItem,
    failedLoadingItem,
    itemLoaded,
    addingItem,
    itemAdded,
    failedAddingItem,
}

export interface State {
    status: VaultStatus;
    currentVaultItem: VaultItem;
    vaultItems: VaultItem[];
    error: any;
}

const initialState: State = {
    status: VaultStatus.loading,
    currentVaultItem: null,
    vaultItems: [],
    error: null,
};

const vaultReducer = createReducer(
    initialState,
    on(VaultActions.loadVault, (state) => ({ ...state, status: VaultStatus.loading })),
    on(VaultApiActions.loadVaultSuccess, (state, { vaultItems }) => ({ ...state, status: VaultStatus.loaded, vaultItems })),
    on(VaultApiActions.loadVaultFailure, (state, { error }) => ({ ...state, status: VaultStatus.failedLoading, error })),
    on(VaultActions.addVaultItem, (state, { vaultItem }) => ({ ...state, currentVaultItem: vaultItem, status: VaultStatus.addingItem })),
    on(VaultApiActions.addVaultItemSuccess, (state, { vaultItem }) =>
        ({ ...state, vaultItems: [...state.vaultItems, vaultItem], status: VaultStatus.itemAdded })),
    on(VaultApiActions.addVaultItemFailure, (state, { error }) => ({ ...state, error, status: VaultStatus.failedAddingItem })),
    on(VaultActions.newVaultItem, (state) => ({ ...state, currentVaultItem: EMPTY_VAULT_ITEM, status: VaultStatus.itemLoaded })),
    on(VaultApiActions.encryptVaultFailure, (state, { error }) => ({ ...state, error })),
    on(VaultApiActions.removeVaultItemSuccess, (state, { vaultItems }) => ({ ...state, vaultItems })),
    on(VaultApiActions.removeVaultItemFailure, (state, { error }) => ({ ...state, error })),
    on(VaultActions.getVaultItem, (state) => ({ ...state, status: VaultStatus.loadingItem })),
    on(VaultApiActions.decryptVaultSuccess, (state, { vaultItem }) =>
        ({ ...state, currentVaultItem: vaultItem, status: VaultStatus.itemLoaded })),
    on(VaultApiActions.decryptVaultFailure, (state, { error }) => ({ ...state, error, status: VaultStatus.failedLoadingItem })),
    on(VaultApiActions.getVaultItemFailure, (state, { error }) => ({ ...state, error })),
);

export const reducer = (state: State, action: Action) => vaultReducer(state, action);

export const getVaultItems = (state: State) => state.vaultItems;

export const getCurrentVaultItem = (state: State) => state.currentVaultItem;

export const getVaultStatus = (state: State) => state.status;
