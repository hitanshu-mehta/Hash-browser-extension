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
}

export enum VaultStatus {
    LOADING,
    LOADED,
    FAILED_LOADING,
    LOADING_ITEM,
    FAILED_LOADING_ITEM,
    ITEM_LOADED,
    ADDING_ITEM,
    ITEM_ADDED,
    FAILED_ADDING_ITEM,
}

export interface State {
    status: VaultStatus;
    currentVaultItem: VaultItem;
    vaultItems: VaultItem[];
    error: any;
}

const initialState: State = {
    status: VaultStatus.LOADING,
    currentVaultItem: null,
    vaultItems: [],
    error: null,
};

const vaultReducer = createReducer(
    initialState,
    on(VaultActions.loadVault, (state) => ({ ...state, status: VaultStatus.LOADING })),
    on(VaultApiActions.loadVaultSuccess, (state, { vaultItems }) => ({ ...state, status: VaultStatus.LOADED, vaultItems })),
    on(VaultApiActions.loadVaultFailure, (state, { error }) => ({ ...state, status: VaultStatus.FAILED_LOADING, error })),
    on(VaultActions.addVaultItem, (state, { vaultItem }) => ({ ...state, currentVaultItem: vaultItem, status: VaultStatus.ADDING_ITEM })),
    on(VaultApiActions.addVaultItemSuccess, (state, { vaultItem }) => ({ ...state, vaultItems: [...state.vaultItems, vaultItem], status: VaultStatus.ITEM_ADDED })),
    on(VaultApiActions.addVaultItemFailure, (state, { error }) => ({ ...state, error, status: VaultStatus.FAILED_ADDING_ITEM })),
    on(VaultActions.newVaultItem, (state) => ({ ...state, currentVaultItem: EMPTY_VAULT_ITEM, status: VaultStatus.ITEM_LOADED })),
    on(VaultApiActions.encryptVaultFailure, (state, { error }) => ({ ...state, error })),
    on(VaultApiActions.removeVaultItemSuccess, (state, { vaultItems }) => ({ ...state, vaultItems: vaultItems })),
    on(VaultApiActions.removeVaultItemFailure, (state, { error }) => ({ ...state, error })),
    on(VaultActions.getVaultItem, (state) => ({ ...state, status: VaultStatus.LOADING_ITEM })),
    on(VaultApiActions.decryptVaultSuccess, (state, { vaultItem }) => ({ ...state, currentVaultItem: vaultItem, status: VaultStatus.ITEM_LOADED })),
    on(VaultApiActions.decryptVaultFailure, (state, { error }) => ({ ...state, error, status: VaultStatus.FAILED_LOADING_ITEM })),
    on(VaultApiActions.getVaultItemFailure, (state, { error }) => ({ ...state, error })),
);

export const reducer = (state: State, action: Action) => vaultReducer(state, action);

export const getVaultItems = (state: State) => state.vaultItems;

export const getCurrentVaultItem = (state: State) => state.currentVaultItem;

export const getVaultStatus = (state: State) => state.status;