import { VaultActions, VaultApiActions } from 'src/app/vault/actions';
import { Action, createReducer, on } from '@ngrx/store';
import { VaultItem } from './../models/vault-item';

export enum VaultStatus {
    LOADING,
    LOADED,
    FAILED_LOADING
}

export interface State {
    status: VaultStatus;
    currentId: string;
    vaultItems: VaultItem[];
    error: any;
}

const initialState: State = {
    status: VaultStatus.LOADING,
    currentId: "",
    vaultItems: [],
    error: null,
};

const vaultReducer = createReducer(
    initialState,
    on(VaultActions.loadVault, (state) => ({ ...state, status: VaultStatus.LOADING })),
    on(VaultActions.addVaultItem, (state, { vaultItem }) => ({ ...state, currentVaultItem: vaultItem })),
    on(VaultApiActions.loadVaultSuccess, (state, { vaultItems }) => ({ ...state, status: VaultStatus.LOADED, vaultItems })),
    on(VaultApiActions.loadVaultFailure, (state, { error }) => ({ ...state, status: VaultStatus.FAILED_LOADING, error })),
    on(VaultApiActions.addVaultItemSuccess, (state, { vaultItem }) => ({ ...state, vaultItems: [...state.vaultItems, vaultItem] })),
    on(VaultApiActions.encryptVaultFailure, (state, { error }) => ({ ...state, error })),
    on(VaultApiActions.addVaultItemFailure, (state, { error }) => ({ ...state, error }))
);

export const reducer = (state: State, action: Action) => vaultReducer(state, action);

export const getVaultItems = (state: State) => state.vaultItems;

export const getCurrentId = (state: State) => state.currentId;

export const getVaultStatus = (state: State) => state.status;